import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { LuArrowUp } from "react-icons/lu";

/**
 * Floating "back to top" button with a scroll-progress ring.
 *
 * Appears once the visitor is a screen into the page, mirroring the progress
 * bar in the navbar so position is readable from either corner.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          data-print="hide"
          initial={{ opacity: 0, scale: 0.85, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          className="group fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-shell text-inkSoft shadow-warm-lg transition-colors duration-300 hover:border-clay/40 hover:text-clay md:bottom-8 md:right-8"
        >
          <svg
            viewBox="0 0 48 48"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full -rotate-90"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              strokeWidth="2"
              className="fill-none stroke-ink/10"
            />
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              strokeWidth="2"
              strokeLinecap="round"
              className="fill-none stroke-clay"
              style={{ pathLength: progress }}
            />
          </svg>
          <LuArrowUp
            size={16}
            aria-hidden="true"
            className="relative transition-transform duration-300 ease-soft group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
