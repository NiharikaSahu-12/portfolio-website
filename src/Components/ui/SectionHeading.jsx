import Reveal from "./Reveal";

/**
 * Editorial masthead shared by every section.
 *
 * v2 layout: a hairline rule carrying the folio number + eyebrow (and optional
 * right-hand meta), then a two-column headline row where the description sits
 * beside the title instead of beneath it. That single change is what gives the
 * page its magazine rhythm and stops every section from opening identically.
 *
 * @param {string}  eyebrow            Small mono label above the title.
 * @param {string}  title              Main display heading.
 * @param {React.ReactNode} [accent]   Rendered in clay italic after the title.
 * @param {string}  [description]      Supporting paragraph.
 * @param {string}  [index]            Folio number, e.g. "01".
 * @param {string}  [meta]             Right-aligned note on the rule (md and up).
 * @param {"left"|"center"} [align]
 * @param {"dark"|"light"}  [tone]     "dark" = for forest backgrounds.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  index,
  meta,
  align = "left",
  tone = "light",
  className = "",
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  const ruleColor = dark ? "border-cream/15" : "border-ink/15";
  const accentText = dark ? "text-gold" : "text-clay";
  const metaText = dark ? "text-cream/40" : "text-inkMute";

  return (
    <Reveal className={`mb-9 md:mb-12 ${className}`}>
      {/* ---------- Folio rule ---------- */}
      <div className={`flex items-center gap-3.5 border-t pt-5 ${ruleColor}`}>
        {index && (
          <span className={`font-mono text-[0.7rem] font-medium ${accentText}`}>
            {index}
          </span>
        )}
        {index && (
          <span
            aria-hidden="true"
            className={`h-px w-7 ${dark ? "bg-gold/40" : "bg-clay/35"}`}
          />
        )}
        {eyebrow && (
          <span
            className={`font-mono text-[0.66rem] uppercase tracking-[0.22em] ${accentText}`}
          >
            {eyebrow}
          </span>
        )}
        {meta && (
          <span
            className={`ml-auto hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] md:block ${metaText}`}
          >
            {meta}
          </span>
        )}
      </div>

      {/* ---------- Headline row ---------- */}
      <div
        className={`mt-5 ${
          centered
            ? "text-center"
            : "grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] md:items-end md:gap-8"
        }`}
      >
        <h2 className={`text-display-sm font-bold ${dark ? "text-cream" : "text-ink"}`}>
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
            className={`max-w-prose text-[0.98rem] leading-relaxed md:text-[1.02rem] ${
              dark ? "text-cream/65" : "text-inkSoft"
            } ${centered ? "mx-auto mt-5" : "md:pb-1"}`}
          >
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
