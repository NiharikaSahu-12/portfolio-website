import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const TYPE_SPEED = 62;
const DELETE_SPEED = 32;
const HOLD = 2100;

/**
 * Typewriter that cycles through a list of roles.
 *
 * The previous version had two bugs: `prev & texts.length` used a bitwise AND
 * instead of a modulo (so the index never advanced correctly), and the array
 * held a single string, meaning it typed and deleted the same phrase forever.
 *
 * Screen readers get the full list once instead of an endless stream of
 * partial words.
 */
export default function TextChange({
  roles = ["Frontend Developer", "UI Craftsperson", "React Developer"],
}) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion || roles.length < 2) {
      setText(roles[0] ?? "");
      return;
    }

    const current = roles[index % roles.length];
    let timer;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), HOLD);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
    } else {
      timer = setTimeout(
        () => setText(current.substring(0, text.length + (deleting ? -1 : 1))),
        deleting ? DELETE_SPEED : TYPE_SPEED
      );
    }

    return () => clearTimeout(timer);
  }, [text, deleting, index, roles, reduceMotion]);

  return (
    <>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        {text}
        <span
          className={`ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.16em] bg-clay ${
            reduceMotion ? "" : "animate-caret-blink"
          }`}
        />
      </span>
    </>
  );
}
