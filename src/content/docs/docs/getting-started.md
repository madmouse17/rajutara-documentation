---
title: Getting started
description: Install Rajutara on Linux or Windows, open the sample tee and learn the few keys that carry most of the work.
---

This page takes you from a download to the sample tee on screen. The Indonesian version is [Memulai](../../id/docs/getting-started/).

## Install

Every release is on the [releases page](https://github.com/madmouse17/rajutara/releases) with its checksums. The current release is 2.1.0. Pick the file for your machine.

| File | For |
|---|---|
| `rajutara-2.1.0-x86_64.AppImage` | Linux, x86_64. Run `chmod +x` on it, then start it. Without FUSE 2, start it with `APPIMAGE_EXTRACT_AND_RUN=1` set. |
| `rajutara-2.1.0-windows-x64.msi` | Windows 7 SP1 through Windows 11, 64-bit. The installer. |
| `rajutara-2.1.0-windows-x64.zip` | The same, portable: unzip it and run `rajutara.exe`. |
| `rajutara-2.1.0-windows-x86.msi` | Windows 7 SP1 through Windows 11, 32-bit. The installer. |
| `rajutara-2.1.0-windows-x86.zip` | The same, portable. |

Other releases use the same names with their own version number. Once a day at start-up Rajutara checks for a newer release and offers to install it; Help, Check for Updates… asks on request.

The same page has the optional `rajutara-voice` helper for spoken goals in the [assistant](../assistant/voice/). The program runs without it.

:::caution[Files saved by 2.0 do not open in 1.5]
Rajutara 2.0.0 saves every Style, Marker and Cut Plan in native format 3. Rajutara 1.5.x and older refuse such a file with "made by a newer rajutara (format version 3; this build reads up to 2)", so no data is lost, but the file does not open there. Files from 1.5.x and older open in 2.0.0 as before, and an older Cut Plan opens as one Purchase Order. If several PCs share files, update them all at the same time.
:::

Every package carries the licences and `THIRD-PARTY.html`, the list of third-party software. If the program says on Windows that it cannot create an OpenGL context, read [Windows 7](../windows-7/).

## Open the sample tee

The [gallery](/rajutara-documentation/gallery/) offers the sample tee as a set of files: a style, a marker, an ASTM DXF with its RUL, a plot, two PDFs and a report. Download the style and the marker, then open them from the File menu, or start the program with the files:

```sh
rajutara [--lang en|id] [FILE...]
```

`rajutara` opens styles, markers, cut plans and DXF files, and opening a file switches to the workspace that fits it. `--lang id` starts the interface in Indonesian. The earlier native extensions `.optx`, `.optm` and `.optc` still open; new files are saved as `.rjx`, `.rjm` and `.rjc`.

The style has four pieces, front, back, sleeve and neck rib, graded S, M, L and XL. The marker nests all 20 pieces on 180 cm fabric: 253.03 cm long, 84.10 % efficiency.

## The window

Four workspaces sit in tabs under the menu: PDS, Grading, Marker and Cut Plan. Panes dock and undock, and each workspace remembers its own layout. The Work Area takes the middle of the window. In PDS the Toolbox is on the left, Properties on the right and the Pieces Window is the first tab of the bottom panel; Grading has its Pieces Window and Marker its Piece Bar in the same place. The theme follows the operating system by default; the control at the far right of the menu bar, Tools, Theme Settings, and View, Theme, switch it to Dark or Light.

| Keys | What they do |
|---|---|
| `Ctrl+Shift+1` to `Ctrl+Shift+4` | Switch to PDS, Grading, Marker or Cut Plan. `Ctrl+Tab` cycles them. |
| `Ctrl+Shift+P` | The command palette. It finds any action by name. |
| `F1` | The list of keyboard shortcuts. |
| `Ctrl+Z`, `Ctrl+Y` | Undo and redo. One undo history serves all four workspaces. |
| Mouse wheel, `Home` | Zoom at the cursor, and zoom to fit everything. |
| Middle drag, or `Shift` and left drag | Pan. |
| `Ctrl+L` | Plot. |
| `Esc` | Cancel the current step. |

Autosave runs every five minutes. If an autosave file is newer than its document at the next start, Rajutara offers to restore it. Every save also keeps the previous file as a `.bak`; in PDS, File, Open Backup opens the backup of a Style as a new, unsaved document.

Tools, Preferences… has a search field above its page list. Type part of a setting's name, in the interface language or in English; case and accents are ignored, and each result reads "Page › Field".

## Build from source

Linux is the reference platform, Xubuntu or Ubuntu 24.04.

```sh
sudo apt install build-essential pkg-config xvfb mesa-utils libgl1 libgl1-mesa-dri \
  libegl1 libxkbcommon-x11-0 libxcursor1 libxi6 libxrandr2
mise install            # rustup and the stable toolchain pinned in rust-toolchain.toml
cargo run -p rajutara --release -- --version
```

The test suite drives real windows, so it runs under a virtual display: `LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a -s "-screen 0 1280x800x24" cargo test --workspace`. [Contributing](../contributing/) lists every gate.

## Next

- [Workflows](../workflows/): five paths through the program.
- [PDS](../workspaces/pds/), [Grading](../workspaces/grading/), [Marker](../workspaces/marker/) and [Cut Plan](../workspaces/cut-plan/): one guide per workspace.
- [Headless and scripting](../headless/): run it from a script, with `rajutara batch`, `rajutara mcp`, playbooks and the knowledge index.
- [The Rajutara assistant](../assistant/): type a goal and let a model of your choice work through the same tools.
