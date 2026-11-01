---
title: Headless and agents
description: Check a build with one command, produce every output of the workflow with no window, read documents with a zip library, and give a coding agent the facts.
---

A script or a coding agent can check a build and produce every output of the workflow without a person at the screen. This page covers the three ways in: the smoke check, the headless examples and the documents themselves, then the agent kit that goes with them.

## The command line

```text
rajutara [--lang en|id] [FILE...]   open the window, then the files
rajutara --version                  print the version, the git hash and the target, exit 0
rajutara --smoke [FILE]             open the real window, render 60 frames, print one JSON line, exit 0
```

An unknown flag prints the usage and exits 1.

## The smoke check

`--smoke` opens the main window (with the file, if you give one), renders 60 frames after the first painted one, prints one JSON line to stdout and closes the window. It exits 0, or 2 with a message on stderr on any window or OpenGL failure. On a machine without a display, run it under a virtual one with Mesa software rendering:

```sh
LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a -s "-screen 0 1280x800x24" target/release/rajutara --smoke
```

```json
{"frames":60,"first_frame_ms":56.5,"max_frame_cpu_ms":0.328,"warmup_ms":0.000,"peak_rss_kb":122392,"gl_renderer":"llvmpipe (LLVM 21.1.8, 256 bits)","gl_version":"4.5 (Core Profile) Mesa 26.0.8-1ubuntu0.3"}
```

| Field | Meaning |
|---|---|
| `frames` | Frames counted after the first painted one. |
| `first_frame_ms` | Time from start to the first frame. |
| `max_frame_cpu_ms` | The slowest frame's CPU time. |
| `warmup_ms` | Time spent before frames were counted. |
| `peak_rss_kb` | Peak resident memory, from `/proc/self/status` on Linux. Omitted elsewhere. |
| `gl_renderer`, `gl_version` | The OpenGL context the window got. |

The values vary by machine, the keys do not. CI reads this line for its budgets: the release binary, the first frame, the idle memory and the paint time of a 1000-piece marker are tests, not hopes (`scripts/check-budgets.sh`). The same line decides whether a Windows 7 build passes under Wine. `--smoke` with a file also loads and validates that file.

## The headless examples

The workflow has no window of its own: the library crates that the program is made of run without one. The example that ships with the repository drafts the sample tee, grades it to S, M, L and XL, nests a marker and writes every output of the workflow:

```sh
cargo run --release -p rajutara --example tshirt_sample -- out/
```

It writes the style, the nested marker, the graded DXF with its RUL, an A0 marker PDF, an HPGL/2 plot, a CSV report and an A4-tiled PDF of the pieces. They are the files in the [gallery](/rajutara-documentation/gallery/). Two more examples live in the agent kit below: one imports a DXF with its RUL and plots every size of every piece to one A0 PDF, and one loads a style, builds a marker with one bundle per size, nests it and writes the marker and an HPGL/2 plot.

Same input and same settings give byte-identical files. Export headers carry a UTC timestamp, so only that line differs between two exports. The nesting engine takes an explicit seed, so a test can pin its output. A run that stops on a time limit also depends on the speed of the machine.

## Documents are zip and JSON

A native file is a zip archive of `manifest.json` and `document.json`. Any zip library reads it:

```python
import json
import zipfile

with zipfile.ZipFile("kaos-lengan-pendek.rjx") as z:
    style = json.loads(z.read("document.json"))

print(style["name"], [p["name"] for p in style["pieces"]])
print([size["name"] for size in style["size_table"]["sizes"]])
```

For the sample tee this prints the style name and its four pieces, FRONT, BACK, SLEEVE and NECK RIB, then the sizes S, M, L and XL. Lengths are millimetres. Treat unknown keys as data to keep, and write a file back only through Rajutara's own writers.

## The agent kit

An agent that has never seen Rajutara guesses at the model: millimetres, derived grading, a time limit against an iteration limit. **rajutara-boost** gives it the facts, in the shape Laravel Boost does for Laravel. It lives in its own repository, [rajutara-boost](https://github.com/madmouse17/rajutara-boost).

| Part | What it is |
|---|---|
| Guidelines | What Rajutara is, the crate map and the invariants, then one file each for the core model, file I/O, nesting, grading, cut planning, adding a workspace, testing and style. Short enough to load on demand. |
| API reference | Real signatures in fenced blocks, checked against a checkout by a script, so the reference cannot drift unnoticed. |
| Examples | The three headless programs, compiled against the release. |
| MCP server | A small server over stdio that links the Rajutara crates directly, with tools to check that a file opens, import a DXF, nest a marker and plot it. Errors come back as tool errors, and the input file is never changed. |
| Skill | The guidelines packaged for agents that load skills. |

The invariants an agent must hold are the ones in [Contributing](../contributing/): millimetres as `f64`, no panic on user data, no async runtime, deterministic output and the clean-room rule.
