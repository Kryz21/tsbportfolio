# Tanish Singh Bisht — Specimen Portfolio V3

A cinematic, scroll-driven React portfolio built around one continuous visual world rather than disconnected page sections.

## Stack

- React 19 + Vite
- TypeScript
- Tailwind CSS v4
- shadcn-compatible `src/components/ui` structure
- Framer Motion + Motion
- Lenis smooth scrolling
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

Windows users can also double-click `START.bat`. macOS users can run `START.command`.

## Production build

```bash
npm run build
npm run preview
```

## Integrated motion components

The supplied snippets are installed directly in the project rather than loaded from a remote package at runtime:

- `src/components/ui/letter-cascade.tsx`
- `src/components/ui/kinetic-text-reveal.tsx`
- `src/components/ui/decrypted-text.jsx`
- `src/components/ui/terminal.tsx`
- `src/components/ui/ascii-art.tsx`

Supporting motion utilities:

- `src/components/motion/Magnetic.tsx`
- `src/components/motion/Parallax.tsx`
- `src/components/motion/ViewReveal.tsx`

The `@` alias resolves to `src`, so UI components use imports such as:

```tsx
import { LetterCascade } from "@/components/ui/letter-cascade";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
```

## Where each component is used

- **DecryptedText:** full hero name, revealing “Tanish Singh Bisht” from the center.
- **LetterCascade:** project titles and section navigation hover states.
- **KineticTextReveal:** project descriptions and staggered text entrances.
- **ASCII Art:** portrait specimen layer in the profile scene.
- **Terminal:** toolkit scene, showing accurate profile, project, and achievement records.
- **Magnetic motion:** project links, contact links, CV download, and return action.
- **Parallax:** identity typography, artifact objects, portrait, project objects, and toolkit orbit.

## Customizing motion

### Letter Cascade

Edit the props where the component is rendered in `src/App.tsx`:

```tsx
<LetterCascade
  text="NovaLearn AI"
  staggerFrom="center"
  staggerDuration={0.025}
  stiffness={360}
  damping={25}
/>
```

Higher `stiffness` feels quicker. Higher `damping` removes bounce. Smaller `staggerDuration` tightens the wave.

### Kinetic Text Reveal

```tsx
<KineticTextReveal
  text="Interfaces that move with intent"
  splitBy="words"
  direction="up"
  distance={14}
  stagger={0.018}
/>
```

Use `splitBy="characters"` for expressive display copy and `splitBy="words"` for readable paragraphs.

### Decrypted name

The full-name decrypt settings live in the hero scene in `src/App.tsx`:

```tsx
<DecryptedText
  text="Tanish Singh Bisht"
  speed={34}
  sequential
  revealDirection="center"
  animateOn="view"
/>
```

### Smooth scrolling

Lenis tuning is in `src/App.tsx`. The current values are deliberately restrained to feel fluid without creating delayed or floaty input.

### Scene transitions

Scroll smoothing and entry/exit veils are handled by `src/components/ScrollScene.jsx`. Visual treatment is in the `V3 motion refinement layer` near the bottom of `src/styles.css`.

## Content sources

The portfolio includes the complete project names, school names, competition entries, contact details, and contribution wording from the supplied CV. The CV and portrait are bundled locally in `public/assets`.
