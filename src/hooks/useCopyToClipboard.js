import { useCallback, useEffect, useRef, useState } from "react";

/** Legacy path for browsers without the async clipboard API (or insecure origins). */
function legacyCopy(value) {
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(area);
  return ok;
}

/**
 * Copy-to-clipboard with a self-resetting `copied` flag for UI feedback.
 *
 * @param {number} [resetAfter]  Milliseconds the flag stays true.
 * @returns {{ copied: boolean, copy: (value: string) => Promise<boolean> }}
 */
export function useCopyToClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (value) => {
      let ok = false;
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
          ok = true;
        } else {
          ok = legacyCopy(value);
        }
      } catch {
        ok = legacyCopy(value);
      }

      if (!ok) return false;

      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetAfter);
      return true;
    },
    [resetAfter]
  );

  return { copied, copy };
}
