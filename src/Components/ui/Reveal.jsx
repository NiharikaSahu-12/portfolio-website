import { motion, useReducedMotion } from "framer-motion";

const OFFSETS = {
  up: (d) => ({ y: d }),
  down: (d) => ({ y: -d }),
  left: (d) => ({ x: d }),
  right: (d) => ({ x: -d }),
  none: () => ({}),
};

/**
 * Scroll-triggered reveal. Replaces the `data-aos` attributes that were left in
 * the markup — AOS was never installed, so those animations silently did nothing.
 *
 * Honours `prefers-reduced-motion` by rendering the content with no animation.
 *
 * @param {"up"|"down"|"left"|"right"|"none"} direction  Side the element enters from.
 * @param {number} delay        Seconds before the animation starts.
 * @param {string} as           Element to render ("div", "li", "section", ...).
 */
export default function Reveal({
  children,
  as = "div",
  direction = "up",
  distance = 26,
  delay = 0,
  duration = 0.7,
  once = true,
  className,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const offset = (OFFSETS[direction] || OFFSETS.up)(distance);

  if (reduceMotion) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
