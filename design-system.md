# Visionair Design System

The single source of truth for typography, buttons, color, radius, and motion.
Reuse these primitives instead of hand-rolling styles. If a new pattern appears
more than twice, promote it into a token or component here.

Tokens live in `app/globals.css` (`:root` + `@theme inline`). Fonts are wired in
`app/layout.tsx`. The button is `components/ui/button.tsx`.

---

## Typography

Two typefaces. Discipline over variety.

| Role | Font | Utility | Usage |
|------|------|---------|-------|
| Display | Instrument Serif (400 + italic) | `font-display` | Large editorial moments only: hero words, pull quotes, occasional section titles. Never body copy. Single weight by design. |
| Heading | Inter (600/700) | `font-sans` (default) | Section and card headings. `font-semibold`, `tracking-tight`. |
| Body / UI | Inter (400/500) | `font-sans` (default) | Paragraphs, labels, controls. `text-muted` for secondary text. |

### Rules
- `font-display` is a spice, not a staple. If more than ~10% of a viewport is
  serif, pull back.
- Instrument Serif has **one weight (400)**. Do not apply `font-semibold`/`font-bold`
  to it, it will not render heavier. Use size and leading for emphasis instead.
- Headings: Inter, `font-semibold`, `tracking-tight`, tight leading (`leading-[1.02]`
  to `leading-[1.1]`).
- Body: Inter, `leading-relaxed`, `text-muted` for support copy.

### Type scale (Tailwind)
Display: `text-5xl` → `text-7xl` (hero).
Headings: `text-2xl` → `text-4xl`.
Body: `text-base` (default), `text-sm` (dense UI), `text-xs` (labels/eyebrows).

### Eyebrow / kicker
Small uppercase tracked labels above headings and in the logo lockup. Class
`.eyebrow` (globals.css) = `font-semibold`, `text-xs`, `uppercase`,
`letter-spacing: 0.14em`. It shares the button's exact tracking so labels and
CTAs read as one system. Pair with a color: `<span className="eyebrow text-accent">`.

---

## Buttons

**One component for every CTA: `components/ui/button.tsx`.** Do not hand-roll
buttons or CTA links. For a link that should look like a button, use
`<Button asChild><Link href="...">…</Link></Button>`.

Character: uppercase, `font-semibold`, `0.14em` tracking, 8px corners, 300ms
ease-out color transition.

### Variants
| Variant | Use | Emphasis |
|---------|-----|----------|
| `default` | Primary action (Book a call). Static brand gradient fill. | Highest. Ideally one per view. |
| `outline` | Secondary action (See the work). Outlined, quiet until hover. | Medium |
| `secondary` | Tertiary filled surface. | Low-medium |
| `ghost` | Lowest-emphasis action, no chrome until hover. | Lowest |
| `link` | Inline text link. **Opts out** of uppercase/tracking. | Inline |

### Sizes
| Size | Height | Padding | Use |
|------|--------|---------|-----|
| `sm` | `h-9` | `px-4` | Navbar, dense areas |
| `default` | `h-11` | `px-6` | Standard CTAs |
| `lg` | `h-12` | `px-8` | Hero, forms, pricing cards |
| `icon` | `h-11 w-11` | — | Icon-only |

### Examples
```tsx
<Button asChild><Link href="#contact">Book a call</Link></Button>
<Button asChild variant="outline"><Link href="#work">See the work →</Link></Button>
<Button type="submit" size="lg" className="w-full">Send</Button>
```

---

## Color

| Token | Value | Utility |
|-------|-------|---------|
| Background | `#0a0a0c` | `bg-background` |
| Foreground | `#e9e9ec` | `text-foreground` |
| Muted | `#86868c` | `text-muted` |
| Accent | `#9961C7` | `bg-accent` / `text-accent` |
| Accent (hover) | `#7d50a3` | `bg-accent-soft` |
| Brand indigo | `#312E60` | `bg-brand-indigo` etc. |
| Brand blue | `#4C5F9E` | `bg-brand-blue` etc. |
| Brand purple | `#8E5BB9` | `bg-brand-purple` etc. |
| Brand gradient | `linear-gradient(315deg, indigo 0%, blue 50%, purple 100%)` | `bg-gradient-brand` |
| Border subtle | `rgba(255,255,255,0.14)` | `border-border-subtle` |
| Border strong | `rgba(255,255,255,0.28)` | `border-border-strong` |

Two-tier brand color system, drawn from the Visionaire logo. The gradient
stops are muted slightly (darker, less saturated) from the raw logo colors so
large fills sit back into the dark UI; the flat accent keeps the unmuted logo
purple for legibility at small sizes:

- **Flat accent** (`--accent`): small decorative elements
  only. Checkmarks, the footer dot, focus rings, input focus borders, the
  switch, thin borders/outlines, and small text highlights.
- **Brand gradient** (`bg-gradient-brand`): purple used as a *fill* on a
  spacious component. CTA buttons (the `default` Button variant), the pricing
  "Most popular" badge, and the sliding billing-toggle pill. Always static on
  fills. Text on a gradient fill is `text-foreground` (never `text-background`,
  which fails contrast on the dark indigo end).
- **Animated gradient text** (`.gradient-text-brand`): one treatment, the
  "Here's what we do for you" headline. The gradient drifts slowly (GSAP, 8s
  ease-in-out yoyo, driven by `ScrollReveal.tsx` which also keeps the gradient
  continuous across word spans). Freezes to the static gradient under
  `prefers-reduced-motion`.

### Surfaces
`--surface` is the one opaque elevated section background. The translucent tints
are the elevation/interaction scale, layered over any background (cards, inputs,
hover fills). **Never hardcode `#0d0d10` or `bg-white/[0.0x]` — use these.**

| Token | Value | Utility | Use |
|-------|-------|---------|-----|
| Surface | `#0d0d10` | `bg-surface` | Opaque elevated section background |
| Surface faint | `rgba(255,255,255,0.02)` | `bg-surface-faint` | Faintest card fill |
| Surface raised | `rgba(255,255,255,0.03)` | `bg-surface-raised` | Card / input fill |
| Surface hover | `rgba(255,255,255,0.06)` | `bg-surface-hover` | Hover fill |
| Surface active | `rgba(255,255,255,0.12)` | `bg-surface-active` | Strongest (e.g. switch track) |

### No hardcoded colors
All color comes from tokens in `app/globals.css`. Opacity modifiers on tokens
(`text-foreground/40`, `border-accent/60`) are fine. The only literal color
exceptions: `themeColor` in `app/layout.tsx` (Next metadata can't read CSS vars,
mirrors `--background`), semantic state colors like `border-red-500/70` on
invalid inputs, the WebGL shine `baseColor` hexes in `components/ui/button.tsx`
(the shader can't read CSS vars; the default variant mirrors `--brand-blue`),
and the gradient stop hexes defining the tokens themselves in
`app/globals.css`. Add a token before reaching for any other literal.

---

## Radius

`--radius: 8px`, applied globally to every element via the reset in
`globals.css`. Full-bleed structural wrappers (`html, body, main, section,
header, footer, nav`) stay square so stacked dividers don't notch. The only
fully round element is `.dot` (the parallax marker), which opts into `9999px`.

---

## Motion

Slow, smooth, staggered. Entrances glide and settle, they do not pop.

- **Duration**: entrances ~1.0–1.4s. Micro-interactions (button hover) ~300ms.
- **Easing**: quint-out `cubic-bezier(0.22, 1, 0.36, 1)` (exported as `ease` in
  motion components). Ease-out for entrances, never front-loaded expo curves.
- **Travel**: short (12–20px) + soft fade. Long travel reads sluggish.
- **Stagger**: 0.12–0.16s between items, in visual-hierarchy order (most
  prominent element first).
- **Reduced motion**: collapse to instant, no-travel reveals
  (`prefers-reduced-motion` / `useReducedMotion`).

---

## Adding new components

1. Reach for existing tokens/utilities first (`font-display`, `.eyebrow`,
   `<Button>`, color + radius tokens).
2. Headings = Inter semibold tight. Body = Inter muted. CTAs = `<Button>`.
3. New motion follows the timing/easing above via the shared `ease` constant.
4. A pattern used 3+ times becomes a token or component here.
