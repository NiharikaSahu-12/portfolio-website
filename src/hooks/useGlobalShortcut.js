import { useEffect, useRef } from "react";

/** True when the event comes from an element the user is typing into. */
function isTypingTarget(target) {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    target.isContentEditable
  );
}

/**
 * Binds a single keyboard shortcut to the document.
 *
 * @param {string}   key                  Value compared against `event.key` (case-insensitive).
 * @param {Function} onTrigger            Must be stable (`useCallback`) — it is a dependency.
 * @param {boolean}  [withMod]            Require ⌘/Ctrl. When false, ⌘/Ctrl must NOT be held.
 * @param {boolean}  [enabled]
 * @param {boolean}  [ignoreWhileTyping]  Skip when focus sits inside a form control.
 */
export function useGlobalShortcut({
  key,
  onTrigger,
  withMod = false,
  enabled = true,
  ignoreWhileTyping = false,
}) {
  useEffect(() => {
    if (!enabled || !key) return;

    const onKeyDown = (event) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return;

      const mod = event.metaKey || event.ctrlKey;
      if (withMod && !mod) return;
      if (!withMod && mod) return;
      if (ignoreWhileTyping && isTypingTarget(event.target)) return;

      // Stop the browser's own binding (⌘K focuses the URL bar in Chrome).
      event.preventDefault();
      onTrigger(event);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, onTrigger, withMod, enabled, ignoreWhileTyping]);
}

/** Convenience wrapper for closing overlays. */
export function useEscapeKey(onTrigger, enabled = true) {
  useGlobalShortcut({ key: "Escape", onTrigger, enabled });
}

/**
 * Traps Tab inside `ref.current` while `active`, focuses the first control on
 * open, and returns focus to whatever was focused before closing.
 */
export function useFocusTrap(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previous = document.activeElement;
    // tabindex="-1" elements (click-outside backdrops) are focusable but must
    // never be part of the Tab cycle.
    const selector =
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusable = () =>
      Array.from(node.querySelectorAll(selector)).filter(
        (el) => el.getClientRects().length > 0
      );

    focusable()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [active]);

  return ref;
}
