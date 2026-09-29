import Reveal from "./Reveal";

/**
 * Shared section header so the eyebrow / title / intro rhythm is identical
 * across About, Experience, Skills, Projects and Contact.
 *
 * @param {string}  eyebrow     Small mono label above the title.
 * @param {string}  title       Main display heading.
 * @param {React.ReactNode} [accent]   Rendered in clay italic inside the title.
 * @param {string}  [description]      Supporting paragraph.
 * @param {"center"|"left"} [align]
 * @param {"dark"|"light"}  [tone]      "dark" = for forest backgrounds.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  tone = "light",
  className = "",
}) {
  const isCenter = align === "center";
  const dark = tone === "dark";

  return (
    <Reveal
      className={`mb-14 md:mb-20 ${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <span
          className={`section-label mb-4 inline-flex items-center gap-2.5 ${
            dark ? "text-gold" : "text-clay"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-px w-8 ${dark ? "bg-gold/50" : "bg-clay/40"}`}
          />
          {eyebrow}
          {isCenter && (
            <span
              aria-hidden="true"
              className={`h-px w-8 ${dark ? "bg-gold/50" : "bg-clay/40"}`}
            />
          )}
        </span>
      )}

      <h2
        className={`text-display-sm font-bold ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        {title}
        {accent && (
          <>
            {" "}
            <em className="text-clay">{accent}</em>
          </>
        )}
      </h2>

      {description && (
        <p
          className={`mt-5 max-w-prose text-base leading-relaxed md:text-lg ${
            dark ? "text-cream/65" : "text-inkSoft"
          } ${isCenter ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
