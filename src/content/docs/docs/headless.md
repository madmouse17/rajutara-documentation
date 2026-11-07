---
title: Headless and scripting
description: Check a build with one command, run batch scripts, serve the MCP command layer, run playbooks, keep a local knowledge index and read documents with a zip library, from scripts, CI and batch jobs.
---

Scripts, CI jobs and batch runs can check a build and produce every output of the workflow without a person at the screen. This page covers the smoke check, batch scripts, the MCP server, playbooks, the knowledge index, the headless example and the documents themselves.

## The command line

```text
rajutara [--lang en|id] [FILE...]   open the window, then the files
rajutara --version                  print the version, the git hash and the target, exit 0
rajutara --smoke [FILE]             open the real window, render 60 frames, print one JSON line, exit 0
rajutara batch SCRIPT [--log FILE] [--json]
rajutara mcp [--tier basic|standard|advanced]
rajutara playbook list | show NAME|FILE
rajutara playbook start NAME|FILE [--param NAME=VALUE]... [--out DIR] [--profile FILE] [--model ID]
rajutara playbook step|resume RUN_DIR [--approve | --choose ID]
rajutara playbook replay RUN_DIR [--force]
rajutara playbook quick [ID [--param NAME=VALUE]...]
rajutara playbook compare NAME|FILE STAGE --scenarios FILE.json [--time-s N] [--open FILE]...
rajutara kb add FILE [--tag WORD]... | search WORDS... | list | remove ID
```

`batch`, `mcp`, `playbook` and `kb` also take `--yes` (or `--yolo`), `--role ROLE` and `--root DIR`; [Safety](#safety-root-roles-approvals-and-backups) below explains them. These four run with no window. They print JSON or result lines on stdout and everything else on stderr, so a caller can read stdout line by line. They use the preferences of the user who runs them.

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

The values vary by machine, the keys do not. CI reads this line and tests its budgets for the release binary, the first frame, the idle memory and the paint time of a 1000-piece marker (`scripts/check-budgets.sh`). The same line decides whether a Windows 7 build passes under Wine. `--smoke` with a file also loads and validates that file.

## The headless examples

The workflow has no window of its own: the library crates that the program is made of run without one. The example that ships with the repository drafts the sample tee, grades it to S, M, L and XL, nests a marker and writes every output of the workflow:

```sh
cargo run --release -p rajutara --example tshirt_sample -- out/
```

It writes the style, the nested marker, the graded DXF with its RUL, an A0 marker PDF, an HPGL/2 plot, an Excel (`.xlsx`) report and an A4-tiled PDF of the pieces. They are the files in the [gallery](/rajutara-documentation/gallery/).

Same input and same settings give byte-identical files. Export headers carry a UTC timestamp, so only that line differs between two exports. The nesting engine takes an explicit seed, so a test can pin its output. A run that stops on a time limit also depends on the speed of the machine.

## Batch scripts

`rajutara batch SCRIPT` runs a text script with no window. Each line is one command, `@NAME /KEY=VALUE`. Where the public Optitex Marker batch list has a command, Rajutara uses its name. Style and Cut Plan commands, which Optitex has no batch name for, use the menu item's name. There are no variables, loops or conditions.

```text
; one order: two shirts in M and two in L on 150 cm fabric
@NEW /NA="Order 114"
@MARKER /HE=150 /LE=1000
@DESIGN /FI=shirt.rjx /SI=M /QU=2 /SI=L /QU=2
@NEST /AL=QUA /TI=1 /SEED=1
@SAVE /FI=order-114.rjm
@REPORT /FI=order-114.xlsx
@PLOTTER /FI=order-114.pdf /FO=PDF
```

- A line that starts with `;` is a comment. A value with spaces goes in double quotes. A key without `=` means yes. Keys may be shortened as the Optitex form allows: `/FI` for `/FILE`.
- Relative paths start from the script's folder. Lengths use the unit of `@UNIT` (`/CM`, `/MM`, `/METER`, `/INCH`, `/FEET` or `/YARD`; centimetres by default). `/TIME` is in minutes.
- `@!`, `@EOF`, `@EXIT` and `@XEXIT` end the script.

| Group | Commands |
|---|---|
| Marker | `@NEW`, `@OPEN`, `@SAVE`, `@DESIGN`, `@IMPORT`, `@MARKER`, `@GLOBAL`, `@FLAW`, `@BUMPLINE`, `@PLACE`, `@NEST`, `@OPTIMIZEORDER`, `@CLEAR`, `@REPORT`, `@PLOTTER`, `@EXPORT`, `@DISPLAY` |
| Style | `@OPENSTYLE`, `@SAVESTYLE`, `@EXPORTGRADEDNEST`, `@PRODUCTIONSHEET`, `@MEASUREMENTREPORT` |
| Cut Plan | `@OPENCUTPLAN`, `@SAVECUTPLAN`, `@SOLVE`, `@NESTMARKERS`, `@CUTPLANREPORT`, `@SAVEMARKERS` |
| Script control | `@UNIT`, `@XOE`, `@?`, `@PAUSE` (refused: a script has nobody to wait for) |

`@NEST` takes the Algorithm (`/AL=QUI`, `QUA` or `ADV` for Standard Quick, Standard and Advanced), the grouping and block options of Auto Nesting Setup, a `/SEED`, and `/SM` for Auto Save Of Markers. `@SOLVE` and `@NESTMARKERS` take `/PO` to name one Purchase Order.

The whole script is checked before anything runs. An unknown command, an unknown key or a value of the wrong type stops it with exit 1. Each line then prints `line N @CMD ok: …` on stdout or `line N @CMD error: {…}` on stderr; `--log FILE` keeps a copy, and `--json` prints each result as JSON instead. A failed line does not stop the script unless `@XOE` came before it; `@?` turns that off again. Exit codes: 0 when every line succeeded, 1 for a refused script, 2 when a line failed. Without `--yes`, every save, overwrite and delete fails with `confirmation_required`.

The result lines are printed when the script ends; the `--log` file is written line by line, so follow that file to watch a long script.

Scripts written for Rajutara are not guaranteed to run unchanged in Optitex, and the reverse: the names overlap, but the behaviour is Rajutara's ([ADR-0016](https://github.com/madmouse17/rajutara/blob/main/docs/adr/0016-headless-batch.md)).

## The MCP server

`rajutara mcp` serves Rajutara's command layer to an MCP client over stdin and stdout: newline-delimited JSON-RPC 2.0, protocol revisions 2026-07-28, 2025-11-25 and 2025-06-18. Logs go to stderr only. A tool that fails answers with a result marked `isError`, not with a JSON-RPC error.

```sh
rajutara mcp --root ~/orders --tier standard
```

The command layer has 85 typed tools, each with a JSON schema for its input and output. They cover documents, PDS, grading, Marker, Cut Plan, costing (fabric consumption, cost per garment), QC checks, playbooks, the knowledge index and the assistant memory. `--tier basic|standard|advanced` limits the tools the server lists; advanced, the default, lists them all. Every change goes through the document's Undo, and one tool call is one undo step per document.

The client gets no confirmation question of its own. Outside an approved playbook checkpoint, a save, overwrite, delete or discard answers `confirmation_required` unless the server was started with `--yes`.

The server itself makes no network call. The MCP client sends the tool results to its own model provider, so what a tool returns, piece names and order quantities included, leaves the PC if the client's model runs elsewhere. Rajutara 2.0.0 makes no model call of its own.

## Playbooks

A playbook is a TOML recipe of stages. Each stage names the tools it may call, the steps it runs and the checks it reports. Playbooks run through the command layer, with no model.

| Playbook | What it does |
|---|---|
| `impor-periksa` | Import a DXF pattern and check it. |
| `qc-pola` | Pattern QC. |
| `pesanan-siap-potong` | From an order to a ready-to-cut plan. |
| `optimasi-marker` | Lay out and nest a marker, compare it with the efficiency target, save it, then plot and cut. |

```sh
rajutara playbook show optimasi-marker
rajutara playbook start optimasi-marker --param marker=order-114.rjm --param width_mm=1500
rajutara playbook resume ~/.config/rajutara/assistant/runs/<run> --approve
```

`start` prints the run folder on stderr and one JSON line per stage on stdout. The run saves its state after every stage in `runs/` of the assistant folder (`~/.config/rajutara/assistant/` on Linux, `%APPDATA%\rajutara\config\assistant\` on Windows), or in `--out DIR`. It stops with exit 3 at an approval checkpoint or a question. `resume` goes on: `--approve` passes a checkpoint, `--choose ID` answers a question, and `step` runs only the next stage. Exit codes: 0 done, 1 a refused playbook or parameter, 2 a failed stage, 3 waiting for the Operator.

Every run keeps a record: the app version, the playbook version and hash, the workshop profile hash, the prompt versions, the model id and the nesting seeds. `replay` repeats a run with the recorded parameters and seeds. `quick` lists the quick actions, a playbook with its parameters filled in (`impor-dxf`, `qc-standar`, `siap-potong`, `optimasi-cepat`), and `quick ID` starts one. `compare` runs one stage over several parameter sets from a JSON file and changes no document.

A replay gives the same nesting result only when the nesting stops by iterations and runs on one thread; a time limit depends on the speed of the machine.

**Workshop profile.** `profil-bengkel.toml` in the assistant folder holds the shop's standards, labelled in Indonesian: seam allowances, shrinkage, ply limits, piece buffer, efficiency target, nesting time and QC tolerances. Playbooks take their defaults from it, as `${profil.marker.target_efisiensi}` does. Without the file, a shipped template is used; `--profile FILE` names another. A value without a source is reported as "perlu konfirmasi operator" (needs operator confirmation). In 2.0.0 none of the 13 shipped values has a source yet.

**Memory.** A finished run remembers what it taught, such as failed checks and the Operator's choices, and says on stderr how many lessons it kept. Lessons, preferences, facts and corrections stay on this PC, in `memory/` of the assistant folder or in a project's `.rajutara/memory/`. Document and tool results come first, the workshop profile second and memory last: a memory that contradicts either is marked stale.

## The knowledge index

`rajutara kb` keeps a local search index of the shop's SOPs and buyer manuals: PDF with a text layer, DOCX, TXT and MD.

```sh
rajutara kb add sop-potong.pdf --tag potong
rajutara kb search lebar kampuh
rajutara kb list
rajutara kb remove <id> --yes
```

The search ranks words with BM25; there is no embedding model. The index lives in `kb/` of the assistant folder. Your files are read and never changed; `remove` moves only the extracted copy to `.rajutara-trash/`. A file over 50 MB is refused, a PDF with no text layer fails with "scanned PDF: no text layer", and an encrypted PDF is refused. A scanned manual needs OCR outside Rajutara first.

Each call loads the whole index, and two `kb add` runs at the same moment can lose one of the two documents. Add documents one after another.

## Safety: root, roles, approvals and backups

- **Root.** `batch`, `mcp`, `playbook` and `kb` reach only files inside `--root DIR`, the current folder by default. A network share or device path (`\\server\share`, `\\?\UNC\…`, `\\.\…`) is refused before the file system is touched.
- **Roles.** `--role` is `designer`, `grader`, `marker-maker`, `cutter` or `supervisor`. Each tool lists the roles that may run it. Supervisor, the default, runs everything.
- **Approvals.** By default a save, overwrite, delete or discard answers `confirmation_required`. The approval covers one operation on one target and is spent by the call. `--yes` (or `--yolo`) runs these operations in their backup-safe forms instead. Plans and playbooks refuse undo and redo steps.
- **Backups and trash.** Every overwrite first writes `<file>.<YYYYmmdd-HHMMSS>.bak`. A backup younger than 24 hours is never removed; of the older ones, the newest 10 are kept. A delete moves the file to `.rajutara-trash/` beside it. Each document gets an append-only action log, `<stem>.agent-log.jsonl`, beside it.
- **File text is untrusted.** Piece names, DXF text, spreadsheet cells, buyer and PO names, and memory and knowledge snippets come back in a separate `untrusted` field. They are data, never instructions. A guarded target that came from file text is flagged in the question and in the safety note.
- **Spreadsheets have fixed limits.** A sheet file over 20 MB, a workbook that unpacks to more than 256 MB and a cell beyond row 100 000 or column 1 000 are refused. Old `.xls` workbooks are not read.
- **MCP.** A tool that panics answers with an internal error, and the server then refuses every write tool until it is restarted.

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
