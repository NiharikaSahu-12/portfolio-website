import { useEffect, useState } from "react";

function formatTime(timeZone, locale) {
  try {
    return new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    }).format(new Date());
  } catch {
    // Unknown time zone (or no Intl support) — fall back to the visitor's clock.
    return new Date().toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

/**
 * Live clock for a given IANA time zone, re-rendered once a minute.
 * Used by the footer so visitors see local working hours.
 *
 * @param {string} timeZone  e.g. "Asia/Kolkata"
 * @param {string} [locale]
 */
export function useLocalTime(timeZone, locale = "en-GB") {
  const [time, setTime] = useState(() => formatTime(timeZone, locale));

  useEffect(() => {
    const tick = () => setTime(formatTime(timeZone, locale));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone, locale]);

  return time;
}
