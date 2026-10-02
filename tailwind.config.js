/**
 * Design tokens.
 *
 * Every colour below resolves to a raw RGB channel triple declared once in
 * `src/index.css` (e.g. `--c-clay: 193 80 46`). Tailwind's `<alpha-value>`
 * placeholder keeps the full opacity syntax working (`bg-clay/10`,
 * `border-ink/[0.08]`) while the palette stays replaceable from one place —
 * which is what turns a future dark theme into a one-file change.
 *
 * The second colour block holds *semantic* aliases (canvas / surface / text).
 * New components use those names so intent survives a palette swap; the legacy
 * brand names stay so existing markup keeps working.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        body: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },

      colors: {
        /* ---- Warm neutrals ---- */
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        shell: "rgb(var(--c-shell) / <alpha-value>)",
        paper: "rgb(var(--c-paper) / <alpha-value>)",
        linen: "rgb(var(--c-linen) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        inkSoft: "rgb(var(--c-ink-soft) / <alpha-value>)",
        inkMute: "rgb(var(--c-ink-mute) / <alpha-value>)",

        /* ---- Accents ---- */
        clay: "rgb(var(--c-clay) / <alpha-value>)",
        clayDark: "rgb(var(--c-clay-dark) / <alpha-value>)",
        claySoft: "rgb(var(--c-clay-soft) / <alpha-value>)",
        forest: "rgb(var(--c-forest) / <alpha-value>)",
        forestDeep: "rgb(var(--c-forest-deep) / <alpha-value>)",
        sage: "rgb(var(--c-sage) / <alpha-value>)",
        gold: "rgb(var(--c-gold) / <alpha-value>)",
        goldDeep: "rgb(var(--c-gold-deep) / <alpha-value>)",

        /* ---- Semantic aliases ---- */
        canvas: "rgb(var(--c-cream) / <alpha-value>)",
        surface: "rgb(var(--c-shell) / <alpha-value>)",
        surfaceMuted: "rgb(var(--c-paper) / <alpha-value>)",
        surfaceSunken: "rgb(var(--c-linen) / <alpha-value>)",
        text: "rgb(var(--c-ink) / <alpha-value>)",
        textMuted: "rgb(var(--c-ink-soft) / <alpha-value>)",
        textFaint: "rgb(var(--c-ink-mute) / <alpha-value>)",
        onDark: "rgb(var(--c-cream) / <alpha-value>)",
        accent: "rgb(var(--c-clay) / <alpha-value>)",
      },


      /* Fluid display type scale */
      fontSize: {
        "display-2xs": [
          "clamp(1.4rem, 1.2rem + 0.9vw, 1.85rem)",
          { lineHeight: "1.2", letterSpacing: "-0.015em" },
        ],
        "display-xs": [
          "clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "clamp(2.1rem, 1.6rem + 2.2vw, 3.4rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        "display-md": [
          "clamp(2.6rem, 1.8rem + 3.4vw, 4.6rem)",
          { lineHeight: "1.04", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(3rem, 1.9rem + 5vw, 6.2rem)",
          { lineHeight: "0.98", letterSpacing: "-0.035em" },
        ],
        "display-xl": [
          "clamp(3.4rem, 1.8rem + 7vw, 8.5rem)",
          { lineHeight: "0.92", letterSpacing: "-0.04em" },
        ],
      },

      // Warm-tinted elevation (never pure black)
      boxShadow: {
        warm: "0 1px 2px rgba(43,38,32,0.04), 0 4px 12px rgba(43,38,32,0.05)",
        "warm-md": "0 2px 4px rgba(43,38,32,0.04), 0 10px 28px rgba(43,38,32,0.08)",
        "warm-lg": "0 4px 8px rgba(43,38,32,0.05), 0 20px 48px rgba(43,38,32,0.12)",
        "warm-xl": "0 8px 16px rgba(43,38,32,0.06), 0 32px 72px rgba(43,38,32,0.16)",
        "warm-2xl": "0 16px 28px rgba(43,38,32,0.07), 0 48px 96px rgba(43,38,32,0.20)",
        clay: "0 8px 24px rgba(193,80,46,0.28)",
        "clay-lg": "0 14px 40px rgba(193,80,46,0.34)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
        hair: "inset 0 0 0 1px rgba(43,38,32,0.07)",
      },

      borderRadius: {
        card: "1.25rem",
        panel: "1.75rem",
        blob: "2.5rem",
      },

      spacing: {
        section: "clamp(3.5rem, 2.5rem + 4.5vw, 6.5rem)",
        gutter: "clamp(1rem, 3vw, 2.5rem)",
      },

      maxWidth: {
        content: "78rem",
        wide: "90rem",
        prose: "46rem",
      },

      transitionTimingFunction: {
        // Gentle, editorial easing
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(1.5deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(24px,-18px) scale(1.06)" },
          "66%": { transform: "translate(-18px,14px) scale(0.96)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "caret-blink": {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "draw-line": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },

      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "marquee-fast": "marquee 24s linear infinite",
        "marquee-reverse": "marquee-reverse 44s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        "caret-blink": "caret-blink 1.1s step-end infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        shimmer: "shimmer 3.4s linear infinite",
        "draw-line": "draw-line 0.9s cubic-bezier(0.22,1,0.36,1) both",
        bob: "bob 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
