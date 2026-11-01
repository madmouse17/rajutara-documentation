# Pre-flight

What was checked before the site went out, with the numbers. Screenshots are in [`docs/screens/`](screens/): the landing page, the docs home and the gallery at 1280 and 390 px wide, plus the dark theme, the open dropdown and the reduced-motion state.

## Design read and dials

Reading this as: a product landing page and docs site for an open-source apparel CAD suite, for garment-workshop pattern makers, graders and marker makers (many on modest Windows PCs, many Indonesian-speaking) and for people who script it, in a product-marketing language after clo3d.com (slim top bar with simple dropdowns, an oversized two-line headline over a clip of the real app, a five-word workflow strip, alternating media and text sections with a row of emblems, a library grid, one strip of renders, a closing banner), executed light-first in blueprint navy and Rust orange, with Astro, Tailwind CSS 4 and native CSS scroll-driven animation, set in Geist.

`DESIGN_VARIANCE 7`, `MOTION_INTENSITY 6`, `VISUAL_DENSITY 4`. Variance 7 because the four workflow sections each use a different composition (split, mirrored split, stacked, offset pair) and the sequence pins the page. Motion 6 because three things move on their own terms (the hero text rising once, the pinned sequence, the strip of renders) and one is a real recording; every one is off under `prefers-reduced-motion`. Density 4 because real numbers and screenshots need room.

## Measured

| Check                    | Result                                                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing JavaScript       | 2,217 bytes gzipped in all: one module of 1,118 bytes and four inline scripts of 1,099 bytes (theme, dropdowns, clip control). Budget 150 KB.      |
| Largest contentful paint | The hero clip, a 1280x720 poster of 98 KB (budget 250 KB), preloaded with high priority.                                                           |
| Cumulative layout shift  | 0 on the landing page at 1280 px. Every image and the clip reserve their ratio, and the Geist file is preloaded.                                   |
| Horizontal overflow      | None at 1280 and at 390 px on the landing page, the docs home and the gallery.                                                                     |
| Console                  | No script errors. The only failed request is the clip's own fetch, aborted when the tab navigates away.                                            |
| Links                    | 1,148 internal links, images and files checked in the built pages: none broken after the fix below. Every one respects `/rajutara-documentation/`. |
| Dashes                   | No em dash or en dash in the text of any built page.                                                                                               |

## Contrast

Every text pair was run through `contrast-check.py` of the antislop-human skill. Text needs 4.5:1, lines and icons 3:1.

| Theme | Pair                                                          | Ratio                  |
| ----- | ------------------------------------------------------------- | ---------------------- |
| Light | text on page `#0b1b36` on `#f7f9fc`                           | 16.26                  |
| Light | muted `#41536f` on page, on the grey band `#edf1f8`           | 7.40, 6.89             |
| Light | faint `#566987` on page, on the grey band                     | 5.29, 4.92             |
| Light | orange text and focus ring `#b13d0b` on page, on a panel      | 5.62, 5.83             |
| Light | button label `#07152d` on orange `#df5821`, hovered `#e9692f` | 4.81, 5.65             |
| Light | control outline `#5c7090` on page                             | 4.77                   |
| Light | size lines S, M, L, XL on a panel                             | 3.62, 5.83, 5.78, 8.56 |
| Dark  | text `#e9eff9` on page `#07152d`                              | 15.75                  |
| Dark  | muted `#aebfd9` on page, on a panel `#0c1f3f`                 | 9.75, 8.77             |
| Dark  | faint `#8da3c6` on a panel                                    | 6.38                   |
| Dark  | orange text and focus ring `#f2804d` on page, on a panel      | 6.91, 6.21             |
| Dark  | button label on orange                                        | 4.81                   |
| Dark  | control outline `#6585b5` on page                             | 4.83                   |
| Dark  | size lines S, M, L, XL on a panel                             | 9.49, 6.21, 6.29, 4.44 |

The two ratios under 4.5 (size S in light, size XL in dark) are lines in a drawing, not text, and clear the 3:1 bar. The size legend also names every size in text.

## Keyboard, focus and motion

- Tab order on the landing page follows the visual order: skip link, logo, the four dropdown groups, the theme switch, the two Download buttons. Every stop shows a 2 px orange outline, with a 44 px target height (the logo link was 32 px and now has a 44 px minimum).
- A dropdown opens with Enter or Space. Escape closes it and returns focus to its button. A click or focus outside closes it too.
- The hero clip does not start for a visitor who asks for reduced motion, stops when scrolled out of view, and has a pause button of 44 px.
- With `prefers-reduced-motion: reduce`: the headline does not rise, the sequence is a normal block showing the finished marker with the three steps written beside it (748 px tall, nothing pinned), the strip of renders is one scrollable row with a single copy, the clip stays paused with a Play button. Checked by emulating the setting and reading the computed animations.
- The strip of renders has a pause switch, a real checkbox, and also pauses on hover and on focus.
- Light and dark were both viewed (`docs/screens/home-1280-dark.png`, `home-1280-sequence-dark.png`).

## Pre-flight (design taste)

- [x] Design read declared, dials explicit.
- [x] Real components, no component library: Tailwind only. Icons are Phosphor for interface glyphs and the application's own toolbar icons for the emblems and the workflow strip.
- [x] No em dashes anywhere on a built page.
- [x] One theme at a time, light by default, dark by switch. No section inverts.
- [x] One accent (Rust orange), used the same everywhere: the base size, primary buttons, links, focus ring.
- [x] One radius system: 10 px for buttons, panels and images, 8 px for the emblems, none on full-width art.
- [x] Button contrast and no wrapped button labels at 1280 or 390.
- [x] Hero fits the viewport: a headline of two lines at desktop, a 16-word sub, two buttons visible without scrolling; top padding 3.5 rem. Three text elements in the hero.
- [x] No eyebrows, no split headers, no decorative dots, no scroll cue, no version label in the hero, no fake terminal or fake screenshot: the clip, the screenshots and the renders are real.
- [x] Zigzag capped: split, mirrored split, stacked, split. No three alike in a row.
- [x] One marquee on the page, with a pause switch and a reduced-motion fallback.
- [x] No `scroll` listener: scroll-driven animation and one IntersectionObserver.
- [x] Viewport units: `svh` for the pinned stage, `dvh` for the page; no `h-screen`.
- [x] Empty, loading and error states: there is no data view to load on a static site. The clip has a poster, and the sequence a finished state.
- [x] No invented numbers: every figure is from the README, the marker report or the budget tests.
- [ ] Copy self-audit by a second reader. Done by the author only.
- [ ] Lighthouse. Not run; LCP, CLS and weight were measured by hand as above.

## Human and accessibility (antislop-human, antislop-ui)

- [x] Every text pair verified with the script, in both themes (table above).
- [x] Non-text contrast 3:1 or better for outlines and drawing lines.
- [x] Focus indicator on every control, in both themes (the colour is the orange-text token of each theme).
- [x] Every control reachable by keyboard, Escape closes the dropdowns, no `outline: none` without a replacement.
- [x] Status is never colour only: sizes are named in the legend, over-cut in Cut Plan is described in the docs as a text badge.
- [x] Text resizes: sizes are rem or fluid `clamp()`; the horizontal overflow check holds at 390 px.
- [x] Colours of the sequence follow the theme tokens.
- [ ] Tested with a screen reader. Not done. The SVG has a text alternative and the steps are real text, but nothing was read aloud.
- [ ] 200 % zoom on a phone. Checked by width only (390 px), not by zooming a real device.

## Honest misses and deviations

- The banner and the social card are the owner's art with the baked-in "Loading... please wait" bar painted out (`scripts/clean-banner.py`). A loader on a web page reads as a page that never finished. The unmodified files are in the application repository.
- The clip was recorded from the build that still carries the old name, so its tab shows a file with the earlier extension (`marker.optm`). Record it again after the rename with `scripts/record-demo.sh`.
- The sample files on the site carry the earlier extensions `.optx` and `.optm`. The gallery says so and builds its list from the folder, so refreshing the folder with `scripts/sync-samples.sh` is enough.
- The download links point at `rajutara-<version>-...` file names. At the time of writing the release in the repository still lists `optirust-1.0.0-...` files (and no `.msi`), so those links resolve only after the rename and the Windows files are published. The repository is private until then.
- Only the Getting started page is translated into Indonesian. The other Indonesian URLs show the English page with a notice, as Starlight does by default; the notice says so. The Indonesian wording is unconfirmed by a native-speaking Operator.
- Without JavaScript the docs open in the dark theme (Starlight's own default); the landing page and the gallery open light.
- The Windows 7 claims repeat the project's own status: verified under Wine and by the import-table check, not on real hardware.

## Found and fixed during the check

- The finished marker in the static and reduced-motion state carried the piece names and the hem dimension of the first steps on top of it. They are now hidden unless the animation shows them.
- Two links from the docs to the gallery broke on the Indonesian copies of English pages, because a relative path changes depth under `/id/`. They use the full base path now.
- The logo link was 32 px tall. It is 44 px.
