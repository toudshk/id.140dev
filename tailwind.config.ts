import type { Config } from "tailwindcss";

/**
 * Tailwind here is a low-level utility runner only.
 * No prebuilt components, no opinionated colors, no rounded-2xl-shadow-xl vibes.
 * The design language lives in CSS variables (see globals.css).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "900px",
      lg: "1200px",
      xl: "1600px"
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      bone: "var(--bone)",
      void: "var(--void)",
      iron: "var(--iron)",
      ash: "var(--ash)",
      blood: "var(--blood)",
      acid: "var(--acid)"
    },
    fontFamily: {
      mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      display: ["var(--font-display)", "Georgia", "serif"],
      grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"]
    },
    extend: {
      letterSpacing: {
        tightest: "-0.06em",
        ultra: "0.4em"
      },
      borderRadius: {
        none: "0px"
      },
      animation: {
        flicker: "flicker 6s steps(8, end) infinite",
        drift: "drift 24s linear infinite"
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "1" },
          "47%": { opacity: "1" },
          "48%": { opacity: "0.4" },
          "49%": { opacity: "1" },
          "73%": { opacity: "0.7" },
          "74%": { opacity: "1" }
        },
        drift: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-2%, -3%, 0)" }
        }
      }
    }
  },
  corePlugins: {
    // forbid the auto-defaults that produce the "Tailwind smell"
    container: false
  },
  plugins: []
};

export default config;
