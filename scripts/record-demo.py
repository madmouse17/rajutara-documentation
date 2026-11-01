#!/usr/bin/env python3
"""Record the real Rajutara window under Xvfb while a scripted pointer zooms and pans the sample marker.

Runs inside `xvfb-run` (see record-demo.sh). It starts Rajutara with a marker, waits until the window has
settled, starts ffmpeg's x11grab, then replays a fixed timeline with XTest events (the same technique as the
Rajutara end-to-end drivers): wheel zoom at the cursor, middle-button drag to pan, `Home` to fit the marker.
The timeline starts and ends on the fitted marker, so the clip loops without a jump.

    xvfb-run -a -s "-screen 0 1280x720x24" python3 scripts/record-demo.py BINARY FILE RAW.mkv [--probe PNG]

`--probe PNG` only opens the file and saves one screenshot, to pick the pointer positions below.
"""

import argparse
import ctypes
import os
import signal
import subprocess
import sys
import time

WIDTH, HEIGHT = 1280, 720
FPS = 30

# Pointer positions on the Marker Table, found with --probe. With the two side panes closed the fitted marker
# fills the table (x 408 to 1153, y 133 to 662); the pointer waits in the empty cloth to its right.
ZOOM_AT = (520, 230)
PAN_FROM = (900, 520)
PARK = (1225, 420)  # empty cloth right of the marker
PAN_BY = (-520, -260)
# The close buttons of the panes the clip does not need: the Piece Bar, then the Piece List.
CLOSE_PANES = [(1268, 87), (1268, 465)]

x11 = ctypes.CDLL("libX11.so.6")
xtst = ctypes.CDLL("libXtst.so.6")
x11.XOpenDisplay.restype = ctypes.c_void_p
x11.XOpenDisplay.argtypes = [ctypes.c_char_p]
x11.XStringToKeysym.restype = ctypes.c_ulong
x11.XStringToKeysym.argtypes = [ctypes.c_char_p]
x11.XKeysymToKeycode.restype = ctypes.c_ubyte
x11.XKeysymToKeycode.argtypes = [ctypes.c_void_p, ctypes.c_ulong]
x11.XSync.argtypes = [ctypes.c_void_p, ctypes.c_int]
x11.XSetInputFocus.argtypes = [ctypes.c_void_p, ctypes.c_ulong, ctypes.c_int, ctypes.c_ulong]
xtst.XTestFakeKeyEvent.argtypes = [ctypes.c_void_p, ctypes.c_uint, ctypes.c_int, ctypes.c_ulong]
xtst.XTestFakeMotionEvent.argtypes = [ctypes.c_void_p, ctypes.c_int, ctypes.c_int, ctypes.c_int, ctypes.c_ulong]
xtst.XTestFakeButtonEvent.argtypes = [ctypes.c_void_p, ctypes.c_uint, ctypes.c_int, ctypes.c_ulong]
display = x11.XOpenDisplay(None)
assert display, "cannot open the X display"


def sync():
    x11.XSync(display, 0)


def move(x, y):
    xtst.XTestFakeMotionEvent(display, 0, int(x), int(y), 0)
    sync()


def key(name):
    code = x11.XKeysymToKeycode(display, x11.XStringToKeysym(name.encode()))
    assert code, f"no keycode for {name}"
    xtst.XTestFakeKeyEvent(display, code, 1, 0)
    xtst.XTestFakeKeyEvent(display, code, 0, 0)
    sync()


def button(n, down):
    xtst.XTestFakeButtonEvent(display, n, 1 if down else 0, 0)
    sync()


def wheel(up):
    button(4 if up else 5, True)
    button(4 if up else 5, False)


def window_id():
    tree = subprocess.run(["xwininfo", "-root", "-tree"], capture_output=True, text=True).stdout
    for line in tree.splitlines():
        # Builds from before the rename called the window and the binary optirust.
        if "rajutara" in line.lower() or "optirust" in line.lower():
            return int(line.split()[0], 16)
    return None


def screenshot(png):
    xwd = png + ".xwd"
    subprocess.run(["xwd", "-root", "-silent", "-out", xwd], check=True)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", xwd, png], check=True)
    os.remove(xwd)


def zoom(notches, at, interval):
    # A pixel of jitter per notch keeps the pointer from resting, so egui shows no hover tooltip while zooming.
    for i in range(abs(notches)):
        move(at[0] + i % 2, at[1])
        wheel(notches > 0)
        time.sleep(interval)


def drag(frm, to, seconds, steps=30, which=1):
    move(*frm)
    time.sleep(0.6)  # egui needs a frame with the pointer over the handle before the press counts
    button(which, True)
    time.sleep(0.25)
    for i in range(1, steps + 1):
        move(frm[0] + (to[0] - frm[0]) * i / steps, frm[1] + (to[1] - frm[1]) * i / steps)
        time.sleep(seconds / steps)
    button(which, False)


def glide(frm, to, seconds):
    steps = 20
    for i in range(1, steps + 1):
        move(frm[0] + (to[0] - frm[0]) * i / steps, frm[1] + (to[1] - frm[1]) * i / steps)
        time.sleep(seconds / steps)


def pan(frm, dx, dy, seconds):
    drag(frm, (frm[0] + dx, frm[1] + dy), seconds, steps=45, which=2)


def click(x, y):
    move(x, y)
    time.sleep(0.5)
    button(1, True)
    time.sleep(0.1)
    button(1, False)
    time.sleep(0.8)


def layout():
    """Give the Marker Table the room: close the two panes it does not need, as an Operator would."""
    for at in CLOSE_PANES:
        click(*at)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("binary")
    ap.add_argument("file")
    ap.add_argument("raw", help="intermediate video written by ffmpeg")
    ap.add_argument("--probe", metavar="PNG")
    ap.add_argument("--poster", metavar="PNG", help="screenshot of the fitted marker, taken without a pointer")
    args = ap.parse_args()

    env = dict(os.environ, LIBGL_ALWAYS_SOFTWARE="1", RUST_LOG="warn")
    app = subprocess.Popen([args.binary, "--lang", "en", args.file], env=env)
    time.sleep(7.0)  # first frames and any start-up splash under llvmpipe
    if app.poll() is not None:
        print(f"Rajutara exited early with status {app.returncode}")
        return 2
    wid = window_id()
    if wid:
        x11.XSetInputFocus(display, wid, 1, 0)  # no window manager to hand out the keyboard focus
    layout()
    move(*PARK)
    key("Home")
    time.sleep(1.5)

    if args.probe:
        screenshot(args.probe)
        app.send_signal(signal.SIGTERM)
        app.wait(timeout=15)
        return 0

    if args.poster:
        screenshot(args.poster)  # xwd draws no pointer

    ffmpeg = subprocess.Popen(
        [
            "ffmpeg", "-loglevel", "error", "-y", "-f", "x11grab", "-draw_mouse", "1",
            "-framerate", str(FPS), "-video_size", f"{WIDTH}x{HEIGHT}", "-i", os.environ["DISPLAY"],
            "-c:v", "libx264", "-preset", "ultrafast", "-crf", "12", "-pix_fmt", "yuv420p", args.raw,
        ],
        stdin=subprocess.PIPE,
    )
    start = time.monotonic()

    def at(t):
        delay = start + t - time.monotonic()
        if delay > 0:
            time.sleep(delay)

    # The timeline, in seconds from the first captured frame, 10 s in all. Every move is undone, so the clip
    # ends on the frame it began with and loops without a jump.
    at(0.5)
    glide(PARK, ZOOM_AT, 0.5)  # the pointer walks onto the marker
    at(1.0)
    zoom(3, ZOOM_AT, 0.4)  # 1.0 to 2.4 s: in on the pieces
    at(2.5)
    glide(ZOOM_AT, PAN_FROM, 0.3)
    at(2.9)
    pan(PAN_FROM, *PAN_BY, 2.5)  # 2.9 to 5.4 s: along the marker
    move(PAN_FROM[0] + PAN_BY[0] + 1, PAN_FROM[1] + PAN_BY[1])
    at(5.8)
    pan((PAN_FROM[0] + PAN_BY[0], PAN_FROM[1] + PAN_BY[1]), -PAN_BY[0], -PAN_BY[1], 1.2)  # back to where it began
    at(7.1)
    glide(PAN_FROM, ZOOM_AT, 0.3)
    at(7.5)
    zoom(-3, ZOOM_AT, 0.4)  # 7.5 to 8.7 s: out again
    at(8.9)
    glide(ZOOM_AT, PARK, 0.6)
    at(10.0)

    ffmpeg.communicate(b"q")
    app.send_signal(signal.SIGTERM)
    try:
        app.wait(timeout=15)
    except subprocess.TimeoutExpired:
        app.kill()
    return 0


if __name__ == "__main__":
    sys.exit(main())
