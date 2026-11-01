---
title: Contributing
description: "How to contribute to Rajutara: the clean-room rule, the gates a change must pass, the code rules, translations and licensing."
---

Rajutara is a clean-room Rust rewrite of an apparel CAD suite. Bug reports, sample files, tests, translations, documentation and code are all welcome. For anything that changes behaviour, a file format or a dependency, open an issue first, so the design is settled before you write code.

## Read these first

| File | What it settles |
|---|---|
| `CONTRIBUTING.md` | Repository rules for contributors. This page follows it. |
| `GLOSSARY.md` | The vocabulary. Its words are the Rust type and module names, and a new term goes there before you use it. The [glossary](../glossary/) page is generated from it. |
| `docs/adr/` | Settled decisions. A decision record is never edited; a new one supersedes it. |
| `docs/spec/` | What each workspace does, with its public sources. |

## The clean-room rule

This rule is absolute. It is the first decision record of the project, and the licence decision rests on it.

- Never open, read, decompile, mount or copy an Optitex binary, installer, disc image, sample pattern, icon, help file or string table.
- Optitex behaviour comes from public documentation only. Cite the URL in the `Sources` section of the specification you change.
- Never port GPL code. Seamly2D and Valentina are GPL, so they are behaviour references only. FreeSewing is MIT, and is a behaviour and format reference.
- Icons, help text, sample patterns and test fixtures are original work made for this project.
- If you are unsure whether a source is public, ask in the issue before you use it.

Rajutara keeps the module split, tool names and screen layout of Optitex 15 so that a trained Operator knows where to look. It is not affiliated with Optitex, and it reads and writes none of its file formats.

## Gates

Every one of these must pass before a pull request is ready.

```sh
cargo fmt --all --check
cargo clippy --workspace --all-targets -- -D warnings
LIBGL_ALWAYS_SOFTWARE=1 xvfb-run -a -s "-screen 0 1280x800x24" cargo test --workspace
cargo deny check
scripts/test-scripts.sh          # when you touch scripts/ or the budgets
```

`cargo test --workspace` drives the real window in the UI tests, so it needs a display. The `xvfb-run` form above is what CI runs. The budgets are tests, not aspirations. After `cargo build --release`:

```sh
scripts/check-budgets.sh size target/release/rajutara
scripts/check-budgets.sh linux target/release/rajutara
```

Windows builds are cross-built and checked under Wine by the maintainer's tools, not in this repository. Say in the pull request when your change touches windowing, dialogs, the file system or dependencies, and the maintainer runs the check.

## Code rules

Reviewers check these first:

- Library crates (`rajutara-core`, `rajutara-io`, `rajutara-nest` and the rest) have no `unwrap`, `expect` or `panic!` outside tests. Errors are `thiserror` enums, and `rajutara-core` has no UI or I/O dependency.
- Geometry is millimetres as `f64`. Display units are never stored. Tolerances are named constants.
- No async runtime. Long work runs on `std::thread` with `std::sync::mpsc`, and the UI polls.
- Every public type in `rajutara-core` derives `Debug`, `Clone`, `PartialEq` and the serde traits.
- A new dependency needs one line of justification, a licence from the allow-list in `deny.toml` (MIT, Apache-2.0, BSD, Zlib, MPL-2.0 and the like), and a preference for crates already in `Cargo.lock`.
- Tests pin behaviour, boundaries and invariants. Snapshots with `insta` cover DXF and HPGL output. Do not pin incidental formatting.
- UI strings go through Fluent. English is the source, and the Indonesian file is updated in the same change.
- Comments explain why, not what. No TODO or FIXME in committed code.

## Translations

Each crate keeps its strings in `i18n/en/` and `i18n/id/`. Corrections to the Indonesian wording are welcome: no Indonesian-speaking Operator has confirmed the current strings yet. A test checks that every English message has an Indonesian one, with the same placeholders.

## Pull requests

- One concern per pull request. Fill in the template. "Not verified" is an acceptable answer if you say what you did not run.
- Update the changelog, and the specification or plan the change touches.
- UI changes come with a screenshot, in the light and the dark theme.

## Licence of contributions

Rajutara is licensed `MIT OR Apache-2.0`. Unless you explicitly state otherwise, a contribution you submit for inclusion is dual licensed the same way, without further terms. There is no DCO and no CLA.

## What it stands on

`THIRD-PARTY.html` is the authoritative list of third-party software, with every licence text. It ships in every release package. The main parts:

| Component | Used for |
|---|---|
| `egui`, `eframe`, `egui_dock` | The immediate-mode interface, the native window drawn through OpenGL, and dockable panes |
| `kurbo` | Bezier and arc evaluation |
| `i_overlay` | Polygon booleans: seam clean-up, nesting buffers, no-fit polygon unions |
| `lyon_tessellation` | Triangulating concave pieces for drawing and nesting |
| `dxf`, `pdf-writer`, `zip`, `csv` | ASTM DXF, vector PDF, the native container, reports |
| `serde`, `serde_json` | Document JSON |
| `i18n-embed` | Fluent translations with compile-time key checks |
| Mesa 3D | Optional software OpenGL in the Windows packages |

The nesting engine follows published papers on the bottom-left-fill heuristic and no-fit polygon generation. The crab, the woven fabric and the needle are artwork supplied by the project owner, under the project licence. The toolbar icons and the sample patterns are original work for this project.
