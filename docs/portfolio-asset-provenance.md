# Portfolio asset provenance

## Scope and reuse caveat

The capability labels remain the source of accessible content; logos are decorative,
local images with empty alt text. Names remain visible when an asset is unavailable.
The brand-image registry uses Vite's `BASE_URL`, not runtime hotlinks. No brand asset
files were recolored. The initial neutral backing has since been removed; dark-mode
CSS inversion applies only to the four existing monochrome marks, not the new symbols.

A project's software license does not automatically license its logo or trademarks.
This inventory is source evidence, not a claim of endorsement or blanket permission.
Unresolved rights should be reviewed before publication; no publication was performed.

## Newly vendored files

| Local file | Exact source and version | License / brand caveat | Modifications and status |
| --- | --- | --- | --- |
| `public/navilens.svg` | [Official header asset](https://www.navilens.com/assets/logo-CFbxiopl.svg), linked by [NaviLens's English homepage](https://www.navilens.com/en/). Hashed filename `logo-CFbxiopl.svg`; `viewBox="0 0 149.62 172.15"`; Illustrator 29.2.1 export metadata. | No permissive artwork license identified. Official trademark mascot, not a wordmark; public availability is not redistribution permission. | Copied unchanged, gradient/colors preserved. Source verified; usage permission unresolved. Existing padded `public/navilens.jpg` is untouched. |
| `public/technology-logos/ktor.svg` | [Devicon `v2.17.0`, `icons/ktor/ktor-original.svg`](https://raw.githubusercontent.com/devicons/devicon/v2.17.0/icons/ktor/ktor-original.svg) | Devicon MIT notice below; Ktor/JetBrains trademark rights remain separate. | Artwork unchanged; source and full MIT notice added in an XML comment. Versioned source verified. |
| `public/technology-logos/php.svg` | [Devicon `v2.17.0`, `icons/php/php-original.svg`](https://raw.githubusercontent.com/devicons/devicon/v2.17.0/icons/php/php-original.svg) | Devicon MIT notice below; PHP branding/trademark rights remain separate. | Artwork unchanged; source and full MIT notice added in an XML comment. Versioned source verified. |
| `public/technology-logos/wordpress.svg` | [Devicon `v2.17.0`, `icons/wordpress/wordpress-plain.svg`](https://raw.githubusercontent.com/devicons/devicon/v2.17.0/icons/wordpress/wordpress-plain.svg) | Devicon MIT notice below; WordPress trademark rights remain separate. | Artwork unchanged; source and full MIT notice added in an XML comment. Icon-only variant avoids a tiny illegible wordmark. Versioned source verified. |

All four new SVGs were parsed before vendoring: no scripts, event handlers, embedded
images, external stylesheets, external render references, or foreign objects.
Gradients reference only definitions inside the same SVG. No external resources
are required to display them.

### Devicon MIT notice

Source: [Devicon LICENSE at `v2.17.0`](https://raw.githubusercontent.com/devicons/devicon/v2.17.0/LICENSE).
The same full notice is embedded in each vendored Devicon SVG, so it survives public-asset builds.

```text
The MIT License (MIT)

Copyright (c) 2015 konpa

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Existing assets reused without modification

Exact original download URLs, upstream versions and artwork licenses were not
recorded in this repository. SVG Repo comments identify a distributor/generator,
not a license. They cannot be upgraded into permission evidence. The table records
Git blob identifiers for the unchanged local versions; source/license remains
unresolved for each entry. Brand recognition is not proof of provenance.
The visual notes below record the initial inventory, before CSS plate removal.

| Local file / capability | Local version (Git blob) | Source URL / license evidence | Visual notes |
| --- | --- | --- | --- |
| `public/android.svg` / Android | `df761c622d182a9526eab450c9424ed3cdc5490e` | Exact URL unknown; [SVG Repo](https://www.svgrepo.com/) header only; license unresolved. | Legacy black robot silhouette; neutral backing retained, not recolored to current Android green. |
| `public/kotlin.svg` / Kotlin | `63b3c42641d62e64acd52713364de7c90cd9a610` | Exact URL unknown; [SVG Repo](https://www.svgrepo.com/) header only; license unresolved. | Legacy gradient mark retained; not reused for Kotlin Multiplatform. |
| `public/jetpackcompose.svg` / Jetpack Compose | `86f77d601aa11bb91b53c883599aad85d211391f` | Source URL/version unknown; no license notice in file; unresolved. | Green/blue cube; not substituted for Compose Multiplatform. |
| `public/react.svg` / React | `74f3c6ec46cb1af94329452f48ea205337ba8772` | Exact URL unknown; [SVG Repo](https://www.svgrepo.com/) header only; license unresolved. | Existing cyan atom retained. |
| `public/angular.svg` / Angular | `3052e0a359ab94c0b7d9598437113a39cebc3cdb` | Exact URL unknown; [SVG Repo](https://www.svgrepo.com/) header only; license unresolved. | Legacy red shield retained. |
| `public/ts.svg` / TypeScript | `9f7b071a54b1f7a0d98f7b74f51a493e12abcef3` | Exact URL unknown; [SVG Repo](https://www.svgrepo.com/) header only; license unresolved. | Existing dark TS monogram includes internal padding; text label remains primary. |
| `public/nodejs.svg` / Node.js | `4d2939c19cd1923afa9fb1cf646ac15e344b0b02` | Exact URL unknown; [SVG Repo](https://www.svgrepo.com/) header only; license unresolved. | Existing black hexagon/JS mark; neutral backing rather than recoloring. |
| `public/firebase.svg` / Firebase | `71d1ee71cedc311459f3234ab6f68910f7211898` | Exact URL unknown; [SVG Repo](https://www.svgrepo.com/) header only; license unresolved. | Legacy yellow flame retained. |

These eight SVGs parse successfully, with no scripts, event handlers or external
render references. Android includes a legacy external W3C SVG 1.1 DOCTYPE URL;
this is a DTD declaration, not an image/style resource. It was not resolved during
validation, and the original file was not rewritten. Kotlin/Firebase gradients,
filters and fragment references remain local. Visual inspection covers their use
at chip size in both themes; it does not resolve the missing licensing history.

## Six conceptual illustrations, not official logos

The exact-name `technologySymbols` registry uses the already-installed
`lucide-react` **0.427.0** exports. These neutral illustrations represent concepts,
not verified product identities or vendor permission. No related Kotlin, Jetpack
Compose or AWS corporate logo is substituted; no SVG files were vendored or downloaded.
Visible ES/EN copy names all six exceptions and distinguishes them from the eleven
registered brand images. Each inline symbol is decorative (`aria-hidden="true"`,
`focusable="false"`), 28px and `currentColor`; readable tool names remain primary.

| Exact capability name | Lucide export | Concept illustrated |
| --- | --- | --- |
| Kotlin Multiplatform | `Layers` | Shared platform layers |
| Compose Multiplatform | `LayoutPanelTop` | Shared UI layout |
| AWS S3 | `Archive` | Storage |
| Home Assistant | `House` | Home automation |
| Shelly | `ToggleRight` | Switching |
| IoT | `Network` | Connected devices |

Source: the installed package's `package.json`, `dist/esm/lucide-react.js`, the six
`dist/esm/icons/*.js` modules and `LICENSE`; upstream project:
[Lucide](https://github.com/lucide-icons/lucide/tree/0.427.0/packages/lucide-react).
Package metadata and each selected module identify the ISC license. The installed
notice includes the Feather portions' MIT attribution; it does not grant brand rights:

```text
ISC License

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## Initial text-only fallbacks / unresolved brand provenance

This earlier inventory remains evidence of why no brand image was registered.
The six capabilities now use the conceptual symbols above; the uncertainties and
untouched old assets below are not resolved by adding illustrations.

| Capability | Why no image was registered |
| --- | --- |
| Kotlin Multiplatform | No exact official asset/version was readily verified in this bounded pass. Kotlin's logo is not treated as its product logo. |
| Compose Multiplatform | No exact official asset/version was readily verified. Jetpack Compose's logo is not substituted. |
| AWS S3 | Existing `public/aws.svg` is AWS branding, not a verified S3 product icon. No correct licensed/versioned S3 source was verified. |
| Home Assistant | Official [logo archive at commit `557331a847ba4d9b91d29a12b2951ea078c896d7`](https://raw.githubusercontent.com/home-assistant/assets/557331a847ba4d9b91d29a12b2951ea078c896d7/logo/home-assistant-logo.zip), member `home-assistant-logomark-color-on-light.svg`, was inspected but **not vendored**. Repository [license](https://raw.githubusercontent.com/home-assistant/assets/557331a847ba4d9b91d29a12b2951ea078c896d7/LICENSE.md) is CC BY-NC-SA 4.0; [current logo terms](https://github.com/home-assistant/assets/blob/master/logo/README.md) identify Open Home Foundation ownership and require express permission for commercial promotion of products/software/services. Portfolio use was not assumed permissible. Devicon `v2.17.0` had no Home Assistant asset at the attempted path. |
| Shelly | No exact official source/version and reuse terms were readily verified. |
| IoT | Generic capability, not a brand; no fabricated logo. |

## Portrait treatment

`public/portfolio-portrait.webp` is unchanged. CSS adds modest image-only rounding
and a hard offset shadow using dedicated muted warm-yellow tokens for light/dark
modes. The figure reserves the shadow offset and additional caption spacing;
there is no person segmentation, photograph edit, new green accent or change to
the existing green action palette. Original aspect ratio and grid are retained.
