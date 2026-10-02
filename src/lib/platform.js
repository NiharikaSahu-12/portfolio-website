/**
 * Platform-aware modifier key label.
 *
 * Read once at module scope: `navigator` never changes during a session, and
 * this avoids a re-render just to swap "Ctrl" for "⌘".
 */
const isMac =
  typeof navigator !== "undefined" &&
  /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);

/** e.g. "⌘K" on Apple hardware, "Ctrl K" everywhere else. */
export const shortcutLabel = isMac ? "⌘K" : "Ctrl K";

/** Just the modifier glyph, for inline usage. */
export const modKeyLabel = isMac ? "⌘" : "Ctrl";
