# Think360 Media: Monochrome Agency Design System (`DESIGN.md`)

Reading this as: 360° Creative, Media & Technology Transformation Partner homepage for brand leaders and CMOs, in a high-contrast Monochrome Black & White editorial agency language inspired by Schbang, dial `ENERGY 3 / RHYTHM 3 / MOTION 2`.

## 1. Liveliness Dials (Part 3)

- **ENERGY 3 (Bold Creative Agency):** High-contrast pure black (`#000000`) and pure white (`#FFFFFF`) monochrome architecture with bold geometric sans typography, an outlined stroke marquee with spinning starbursts, a scroll-expanding black showreel stage, a full-bleed split work showcase, a 5-column interactive solutions accordion strip, a 3D tilted `@magicui-pro/call-to-action-1` audit stage, and a rounded bottom sheet that reveals the pure-black ASCII character-field footer.
- **RHYTHM 3 (Varied Section Compositions):**
  1. **Announcement Bar + Sticky White Header:** Dismissible black CRO audit bar + sticky white header with a live morphing brand descriptor (`Think360. .Brands / .Tech / .Media / .Production`), interactive `Solutions` mega-dropdown, and a black pill `"Contact Us →"` CTA.
  2. **Hero + Outlined Marquee + Scroll-Expanding Showreel (`#home`):** Large bold `<h1>` (`"Your Creative, Media & Technology Transformation Partner"`), full-width outlined stroke marquee (`"IT'S TIME TO CREATE A THINK360 IMPACT ✺"`), and a scroll-expanding black showreel container with kinetic 3D geometric art.
  3. **Manifesto (`#about`):** `"What defines us"` asymmetric split section over an animated SVG infinity-loop wireframe background with a rotating directional arrow and `"Dive Into Our Culture →"` pill CTA.
  4. **Featured Work Split Showcase (`#work`):** Full-width split-screen campaign showcase with bold headline, italic serif `"Here's How. ────"` link, `#` watermark, and interactive slide controls.
  5. **5-Column Interactive Solutions Strip (`#services`):** Architectural 5-column vertical hairline grid (`Brand Solution`, `Tech Solution`, `Media Solution`, `SEO & Research`, `Film & Production`) where hovering or selecting any column transitions the title from `#737373` to `#000000`, reveals the full capability list, and fills the circular `→` button in solid black.
  6. **Monochrome Client Partner Grid (`#clients`):** 2x5 grayscale/black logo grid of all 10 client partners on pure white.
  7. **Trending Insights + Tech Partner Carousel (`#insights`):** `"Trending now"` editorial feature card + 2-column horizontal article rows + interactive partner badge carousel with pagination pills.
  8. **3D Tilted Marquee CTA & Growth Audit Intake (`#contact`):** `@magicui-pro/call-to-action-1` monochrome 3D tilted marquee container paired with a working Growth Audit intake form (Idle, Loading, Error, and Success states).
  9. **Rounded Sheet Reveal + Pure-Black Character-Field Footer (`#footer`):** White page wrapper ends with `rounded-b-[3rem]` to reveal the pure-black (`#000000`) `Think360` interactive liquid character-field canvas and monochrome bottom bar.
- **MOTION 2 (Scroll-Driven & Interactive Choreography with Pause Controls):** Scroll-linked showreel expansion, outlined marquee with spinning starbursts, hover-expanding 5-column solutions strip, 3D tilted CTA marquee, and interactive character-field footer, each respecting `prefers-reduced-motion: reduce` and equipped with an accessible Pause/Resume button (`R-39`).

## 2. Monochrome Palette & Verified WCAG Contrast (`R-25`, `R-29`)

- **Core 1: Pure White (`#FFFFFF`)** — Primary page surface.
- **Core 2: Pure Black (`#000000` / `#0A0A0A`)** — Primary ink on white, primary pill buttons, showreel stage, CTA stage, and footer background.
- **Core 3: Neutral Charcoal & Silver (`#262626`, `#525252`, `#D4D4D4`, `#E5E5E5`)** — Secondary body copy and structural 1px hairlines.
- **Accent (1): High-Contrast Inverse (`#000000` on White / `#FFFFFF` on Black)** — Strict monochrome discipline.

### Verified WCAG 2.2 AA/AAA Contrast Ratios
- `#000000` on `#FFFFFF`: **21.00:1** (PASS AAA)
- `#262626` on `#FFFFFF`: **15.13:1** (PASS AAA)
- `#525252` on `#FFFFFF`: **7.81:1** (PASS AAA)
- `#FFFFFF` on `#000000`: **21.00:1** (PASS AAA)
- `#D4D4D4` on `#000000`: **14.09:1** (PASS AAA)
- `#A3A3A3` on `#000000`: **8.32:1** (PASS AAA)

## 3. One-Line Purpose Statements (`R-31` & Group 2 Purpose-Gate)

- **Why this color (`R-01`, `R-29`):** Pure Black (`#000000`) and Pure White (`#FFFFFF`) remove decorative AI color noise and let campaign work, typography, and motion carry the brand identity.
- **Why this layout (`R-05`):** Following Schbang's editorial rhythm, the page alternates between a white typographic hero, a full-bleed black showreel, an SVG-loop manifesto, a split-screen campaign slider, a 5-column vertical accordion, a clean logo grid, and a rounded-sheet footer reveal.
- **Why this typography (`R-06`):** Bold geometric sans (`Manrope` 700/800 with `-0.03em` tracking) delivers punchy agency headlines while `Newsreader` italic serif marks editorial `"Here's How."` callouts.
- **Why this spacing (`R-03`, `R-05`):** Wide white margins (`py-16` to `py-28`) give oversized black headlines room to breathe and collapse cleanly to `py-12` on mobile.
- **Why use cards in CTA & Insights (`R-14`):** The 3D tilted cards in the CTA preview the 10 audit deliverables while the `"Trending now"` layout pairs one featured graphic edition with two compact horizontal rows.
- **Why use icons (`R-04`):** Custom stroke SVGs represent the 10 marketing disciplines and directional `→` arrows indicate interactive slide, column, and CTA actions.
- **Why use button arrows (`R-08`):** Horizontal `→` arrows inside solid black pill buttons (`"Contact Us →"`, `"Dive Into Our Culture →"`, `"Read the edition →"`) nudge right on hover to indicate forward navigation.
- **Why use glassmorphism on the CTA center tile (`R-10`):** `backdrop-blur` is used only on the single centered `HeartHandshake` icon tile inside `@magicui-pro/call-to-action-1` so it separates from the 3D tilted marquee behind it.
- **Why use motion (`R-19`):** Scroll-driven showreel expansion, morphing header discipline suffixes (`.Brands`, `.Tech`, `.Media`), `@aceternity/macbook-scroll` continuous-scroll lid unfolding, `@aceternity/3d-marquee` delivered-company showcase, `@aceternity/globe` worldwide delivery arcs, and the interactive character-field footer demonstrate creative and technical capability directly in the interface.
