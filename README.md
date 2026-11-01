# Rajutara documentation

The site and docs of [Rajutara](https://github.com/madmouse17/rajutara), open-source apparel CAD for garment workshops: pattern design, grading, marker making and cut planning.

Live at <https://madmouse17.github.io/rajutara-documentation/>.

| Page        | What it is                                                                                                                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`         | The landing page: a clip of the real app, the pattern-to-marker sequence drawn from the sample files, the four workspaces with real screenshots, the sample files and examples, real renders, the numbers, the formats, scripting, downloads and the honest status. |
| `/docs/`    | The documentation, with Starlight: getting started (English and Indonesian), workflows, one guide per workspace, file formats, headless and scripting, Windows 7, glossary, roadmap, parity checklist and contributing.                                                |
| `/gallery/` | The renders at full size and every file of the sample tee to download.                                                                                                                                                                                              |

Astro, Starlight and Tailwind CSS 4. The landing page ships about 2 KB of JavaScript: the dropdowns of the top bar and the pause button of the clip. The sequence, the strip of renders and the entrance of the headline are CSS.

## Work on it

Needs Node 22.12 or newer.

```sh
npm ci
npm run dev          # http://localhost:4321/rajutara-documentation/
npm run build        # dist/
npm run preview      # serve dist/ the way Pages will
npm run format       # Prettier
```

`site` and `base` are set in `astro.config.mjs`, for GitHub Pages under `/rajutara-documentation`. Components build links with `withBase()` from `src/lib/site.ts`, and the Markdown content uses relative links. The three links from the docs to the gallery spell out `/rajutara-documentation/` instead, because a relative path changes depth on the Indonesian copies of English pages; search for it if the base ever changes.

## Where things come from

Nothing on the site is a stand-in. The figures, the files and the pictures come from the application repository.

| On the site                                    | Source                                                                   | Refreshed by                       |
| ---------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------- |
| Sample tee files                               | `samples/kaos-lengan-pendek/`                                            | `scripts/sync-samples.sh`          |
| The outlines of the pattern-to-marker sequence | the marker plot of that sample (`.plt`)                                  | `scripts/extract-tee.py`           |
| The marker render in the gallery               | the sample's marker PDF, tiles stitched                                  | `scripts/render-marker.py`         |
| Glossary and parity checklist                  | `GLOSSARY.md`, `docs/parity-checklist.md`                                | `scripts/import-docs.py`           |
| Screenshots                                    | `docs/images/full-*.jpg`, real captures of the release build under Xvfb  | `scripts/sync-samples.sh`          |
| The banner and the social card                 | `assets/logo/rajutara-banner-wide.jpg` with the loader strip painted out | `scripts/clean-banner.py`          |
| The clip in the hero                           | the release build, driven by a scripted pointer                          | `scripts/record-demo.sh`           |
| Numbers (58 s, 21 MB, 53 ms ...)               | the README and the budget tests of the application                       | by hand, in `src/components/home/` |

After the application repository changes, run `scripts/sync-samples.sh /path/to/rajutara`, then record the clip again with `scripts/record-demo.sh /path/to/rajutara-binary /path/to/marker-file`, rebuild and commit.

## Design

Light is the default theme and dark is one click away, both in the navy and Rust orange of the logo. Geist and Geist Mono are self-hosted. The orange is the only accent, and it means "drawn by hand": the base size, the primary action, the focus ring. The tokens are in `src/styles/tokens.css` and every text pair was run through the contrast checker; the results, the screenshots and the pre-flight checklists are in [`docs/preflight.md`](docs/preflight.md).

Motion is CSS only and every bit of it is switched off by `prefers-reduced-motion`: the headline rising once, the pinned pattern-to-marker sequence, the drift of the closing banner and the strip of renders. The video starts only for visitors who allow motion, stops when scrolled away, and has a pause button.

## Deploy

`.github/workflows/pages.yml` builds on every push to `main` and publishes `dist/` to GitHub Pages. Pages is enabled once with:

```sh
gh api -X POST repos/madmouse17/rajutara-documentation/pages -f build_type=workflow
```

## Licence

Code and text are `MIT OR Apache-2.0`, at your option ([`LICENSE-MIT`](LICENSE-MIT), [`LICENSE-APACHE`](LICENSE-APACHE)). The crab, the banner and the social card are artwork supplied by the project owner, under the project licence. Rajutara is independent of Optitex and uses none of its files or formats.
