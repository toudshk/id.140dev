import { JetBrains_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";

/**
 * Шрифтовая троица:
 * - JetBrains Mono — служебный/архивный голос (теги, метки, индексы)
 * - Instrument Serif — медленный, итальянский, дисплейный (заголовки-фрагменты)
 * - Inter Tight — нейтральный гротеск как «бетонный пол» интерфейса
 *
 * Ничего тёплого, ничего «подружелюбленного».
 */
export const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap"
});

export const display = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap"
});

export const grotesk = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-grotesk",
  display: "swap"
});
