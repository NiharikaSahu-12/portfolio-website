/** @type {import('tailwindcss').Config} */
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
        // Warm neutrals
        cream: "#FBF6EE",
        shell: "#FEFCF8",
        paper: "#F3EBDC",
        linen: "#EADFCB",
        ink: "#2B2620",
        inkSoft: "#5F5548",
        inkMute: "#8A7E6E",

        // Accents
        clay: "#C1502E",
        clayDark: "#9E3E22",
        claySoft: "#E9A98C",
        forest: "#2F3E46",
        forestDeep: "#212D33",
        sage: "#7C9885",
        gold: "#E3A857",
      },

      // Fluid display type scale
      fontSize: {
        "display-xs": ["clamp(1.75rem, 1.4rem + 1.4vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(2.1rem, 1.6rem + 2.2vw, 3.4rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2.6rem, 1.8rem + 3.4vw, 4.6rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(3rem, 1.9rem + 5vw, 6.2rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },

      // Warm-tinted elevation (never pure black)
      boxShadow: {
        warm: "0 1px 2px rgba(43,38,32,0.04), 0 4px 12px rgba(43,38,32,0.05)",
        "warm-md": "0 2px 4px rgba(43,38,32,0.04), 0 10px 28px rgba(43,38,32,0.08)",
        "warm-lg": "0 4px 8px rgba(43,38,32,0.05), 0 20px 48px rgba(43,38,32,0.12)",
        "warm-xl": "0 8px 16px rgba(43,38,32,0.06), 0 32px 72px rgba(43,38,32,0.16)",
        clay: "0 8px 24px rgba(193,80,46,0.28)",
        "clay-lg": "0 14px 40px rgba(193,80,46,0.34)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },

      borderRadius: {
        card: "1.25rem",
        panel: "1.75rem",
        blob: "2.5rem",
      },

      spacing: {
        section: "clamp(4.5rem, 3rem + 7vw, 9rem)",
        gutter: "clamp(1.25rem, 4vw, 3rem)",
      },

      maxWidth: {
        content: "78rem",
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
      },

      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite",
        "caret-blink": "caret-blink 1.1s step-end infinite",
        "spin-slow": "spin-slow 22s linear infinite",
      },
    },
  },
  plugins: [],
};
