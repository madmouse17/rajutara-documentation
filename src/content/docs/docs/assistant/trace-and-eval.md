---
title: Trace from photo and eval
description: Turn a photo of a piece on a reference sheet into a draft piece, and measure a model on your own test cases with rajutara eval.
---

## Trace from photo

Trace from photo is experimental. It turns a photo of a piece lying on a sheet of known size into a new draft piece of the open Style. The result is a draft to check, not a piece to cut as it is.

### Take the photo

Lay the piece flat on a reference sheet of known size, such as A4 or A3 paper. The piece's colour must differ clearly from the sheet and the surface around it. Photograph it from straight above, with all four corners of the sheet in view. The sheet gives the scale and corrects the perspective. There is no lens model, so any distortion of the lens stays in the outline.

### Calibrate and trace

**Trace From Photo…** (Designer role, in the command palette) opens the window **Trace from photo (experimental)**.

1. **Choose a photo…** and pick a PNG or JPEG file.
2. Click the four corners of the reference sheet, top-left first, then clockwise. Drag a corner to move it, or select it with Tab and move it with the arrow keys: 1 px per press, 10 px with Shift.
3. Click inside the piece.
4. Pick the **Reference sheet**: **A4 portrait**, **A4 landscape**, **A3** or **Custom** with **Width (mm)** and **Height (mm)**.
5. Set the **Colour tolerance** (40 by default), **Simplify (mm)** (1 mm by default) and the **Piece name**.
6. Press **Trace**.

While you move the inside point or the tolerance, a preview shows how far the region reaches. The result appears as a Step card in the thread: "Piece TRACED-1 added and marked TRACED. Check every line before cutting." **Show in PDS** switches to the piece. The new piece goes to the right of the existing pieces, and one undo takes it back.

### Warnings and limits

The card warns when:

- the region reaches the photo's edge: the piece may be cut off, or the click was on the background;
- the piece and the background differ little in colour: change the colour tolerance;
- the sheet is seen at a steep angle: take the photo from straight above.

Rajutara refuses corners outside the photo or not clockwise around a convex shape, an inside point off the sheet, a region smaller than 1 % of the sheet and a photo it cannot read. It reads the photo's size first and refuses more than 50 million pixels before decoding anything, then scales the longer side to at most 3,000 px. It does not apply the photo's EXIF rotation, so turn the photo upright first if your camera stores it sideways. A 50-megapixel photo can take about 450 MB of memory on a 32-bit PC.

Every traced piece carries the code `TRACED`. Check every line against the paper pattern before you grade or cut it.

The same work is the tool `trace_from_photo` (Advanced tier, Designer), which the assistant and MCP clients can call with an attached photo.

## Eval runner

`rajutara eval DIR` measures a model profile on your own test cases. Each case gives a goal, the files to open and checks on the result, so you can compare models, or a model before and after a change to its settings, on the work your shop does.

```text
rajutara eval DIR [--model ID] [--out DIR] [--case ID] [--allow-remote] [--role ROLE]
```

| Option | Meaning | Default |
|---|---|---|
| `--model ID` | The model profile, by its name in Preferences › Assistant | The default model |
| `--out DIR` | Where the results go. It may not be inside `DIR` | `evals/` in the assistant folder |
| `--case ID` | Run that case alone | Every case |
| `--allow-remote` | Allow a model on another computer | Off |
| `--role ROLE` | Run every case with this role instead of its own | The case's role |

`eval` refuses `--yes`, `--yolo` and `--root`: each case names its own approval and runs on copies.

### The case folder

Each subfolder of `DIR` that holds a `case.toml` is a case. Its other files are the documents and attachments the case uses.

```toml
[case]
id = "kampuh-1cm"             # 1 to 64 letters, digits, - and _
goal = "Tambah kampuh 1 cm di semua piece lalu simpan"
role = "designer"             # optional, supervisor by default
skill = "pattern-making"      # optional, picked from the goal by default
open = ["kaos.rjx"]           # files of the case folder, opened from the copy
attach = []                   # files of the case folder, attached from the copy
max_turns = 12                # 1 to 40
approve = "all"               # "all": approve every guard, plan and checkpoint and take the first choice
                              # "none": the first of them fails the case

[[check]]                     # a read tool run after the goal; every check must hold
tool = "piece_detail"
args = { piece = "Back" }     # optional
path = "/height_mm"           # JSON pointer into the result
op = "=="                     # == != >= <= > < contains
value = 420
```

Rajutara checks every case folder before any case runs. It copies each case's files (not `case.toml`, and no links) to a temporary folder, runs the goal in a session of its own, then runs the checks as Supervisor. Numbers compare with a tolerance of 0.000001. A request the provider refused is retried once after the provider's wait, at most 30 s. Nothing inside `DIR` is written.

### Results

Each case prints one JSON line on stdout, and the summary goes to stderr: "rajutara: 5 cases, 4 passed, 1 failed; results in …". The exit code is 0 when every case passed, 2 when one failed and 1 for a refused command line or case folder.

The results file is `eval-<stamp>.jsonl` in the output folder. It has one line per case with `case`, `passed`, the checks with their expected and actual values, `turns`, `invalid_actions`, `model_calls`, `prompt_tokens`, `completion_tokens`, `millis`, `error` and `adaptations`, and a summary line.

### A model on another computer

A remote profile runs only with `--allow-remote`. That flag is your consent for every request of the run, since nobody is at the window to press **Send**. Before each request leaves, Rajutara saves its body to `eval-<stamp>/<case>/request-<n>.json` in the output folder, so you can read afterwards exactly what was sent.
