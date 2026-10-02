/**
 * Infinite horizontal ticker.
 *
 * The track is duplicated once and translated -50%, so the loop is seamless
 * regardless of how many items are passed in. Decorative for sighted users and
 * announced once via an `sr-only` sentence.
 *
 * @param {string[]} items
 * @param {"light"|"dark"} [tone]
 * @param {"slow"|"normal"|"fast"} [speed]
 * @param {boolean} [reverse]
 */
export default function Marquee({
  items,
  tone = "light",
  speed = "normal",
  reverse = false,
  className = "",
}) {
  const animation = reverse
    ? "animate-marquee-reverse"
    : speed === "fast"
      ? "animate-marquee-fast"
      : "animate-marquee";

  const textColor = tone === "dark" ? "text-cream/50" : "text-inkMute";
  const dotColor = tone === "dark" ? "text-gold/60" : "text-clay/50";

  return (
    <div className={`mask-fade-x overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`flex w-max ${animation} items-center gap-8 will-change-transform hover:[animation-play-state:paused]`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className={`flex items-center gap-8 font-mono text-[0.72rem] uppercase tracking-[0.22em] ${textColor}`}
              >
                {item}
                <span className={dotColor}>&#9670;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">{items.join(", ")}.</p>
    </div>
  );
}
