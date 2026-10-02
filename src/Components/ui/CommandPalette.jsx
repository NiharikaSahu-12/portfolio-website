import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LuArrowDown,
  LuCheck,
  LuCopy,
  LuCornerDownLeft,
  LuDownload,
  LuExternalLink,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuSearch,
} from "react-icons/lu";

import { navLinks, profile, socials } from "../../data/profile";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { useEscapeKey, useFocusTrap } from "../../hooks/useGlobalShortcut";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { modKeyLabel } from "../../lib/platform";
import { goToSection } from "../../lib/scroll";

/** Anything focusable in the result list, whether it is a button or a link. */
const COMMAND_SELECTOR = "[data-command]";

/**
 * ⌘K / Ctrl+K command palette.
 *
 * Results are plain `<button>` and `<a>` elements rather than a custom listbox,
 * so Enter, Tab and screen-reader semantics come free from the platform; the
 * arrow keys only move focus. Commands with `keepOpen` stay open to show their
 * confirmation (copying the email), everything else closes on activation.
 *
 * @param {boolean}  open
 * @param {Function} onClose
 */
export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const listRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const dialogRef = useFocusTrap(open);
  const { copy } = useCopyToClipboard();

  useLockBodyScroll(open);
  useEscapeKey(onClose, open);

  // Fresh query every time it opens — a stale filter is confusing.
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const commands = useMemo(() => {
    const navigation = navLinks.map((link, i) => ({
      id: `nav-${link.id}`,
      group: "Go to",
      index: String(i + 1).padStart(2, "0"),
      label: link.label,
      hint: link.href,
      run: () => goToSection(link.href),
    }));

    const actions = [
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        Icon: LuCopy,
        keepOpen: true,
        run: async () => {
          const ok = await copy(profile.email);
          if (ok) setCopiedId("copy-email");
        },
      },
      {
        id: "write-email",
        group: "Actions",
        label: "Write an email",
        hint: "Opens your mail client",
        Icon: LuMail,
        href: `mailto:${profile.email}`,
      },
      profile.resumeUrl && {
        id: "resume",
        group: "Actions",
        label: "Download résumé",
        hint: "PDF",
        Icon: LuDownload,
        href: profile.resumeUrl,
        download: true,
      },
      {
        id: "github",
        group: "Elsewhere",
        label: "GitHub profile",
        hint: "github.com/NiharikaSahu-12",
        Icon: LuGithub,
        href: socials.github,
        external: true,
      },
      {
        id: "linkedin",
        group: "Elsewhere",
        label: "LinkedIn profile",
        hint: "linkedin.com/in/niharikasahu12",
        Icon: LuLinkedin,
        href: socials.linkedin,
        external: true,
      },
    ];

    return [...navigation, ...actions.filter(Boolean)];
  }, [copy]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.hint ?? ""} ${command.group}`
        .toLowerCase()
        .includes(needle)
    );
  }, [commands, query]);

  /** Preserves the authored group order while skipping empty groups. */
  const groups = useMemo(() => {
    const buckets = new Map();
    results.forEach((command) => {
      if (!buckets.has(command.group)) buckets.set(command.group, []);
      buckets.get(command.group).push(command);
    });
    return Array.from(buckets, ([name, items]) => ({ name, items }));
  }, [results]);

  /** Moves focus through the rendered commands, wrapping at both ends. */
  const moveFocus = (delta) => {
    const items = Array.from(listRef.current?.querySelectorAll(COMMAND_SELECTOR) ?? []);
    if (!items.length) return;

    const current = items.indexOf(document.activeElement);
    const next =
      current === -1
        ? delta > 0
          ? 0
          : items.length - 1
        : (current + delta + items.length) % items.length;

    items[next].focus();
  };

  const onArrowKeys = (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    moveFocus(event.key === "ArrowDown" ? 1 : -1);
  };

  const activate = (command) => {
    command.run?.();
    if (!command.keepOpen) onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]" data-print="hide">
          {/* Click-outside target. tabIndex -1 keeps it out of the Tab cycle. */}
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close command palette"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 h-full w-full cursor-default bg-forestDeep/45 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-[10vh] w-[min(34rem,calc(100vw-1.25rem))] -translate-x-1/2 overflow-hidden rounded-panel border border-ink/[0.12] bg-shell/95 shadow-warm-2xl backdrop-blur-xl"
          >
            {/* ---------- Search ---------- */}
            <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-3.5">
              <LuSearch size={17} aria-hidden="true" className="shrink-0 text-clay" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onArrowKeys}
                placeholder="Search sections, actions and links…"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck="false"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-inkMute/80"
              />
              <kbd className="hidden shrink-0 rounded border border-ink/15 bg-cream px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-wider text-inkMute sm:block">
                esc
              </kbd>
            </div>

            <p aria-live="polite" className="sr-only">
              {results.length} result{results.length === 1 ? "" : "s"} available.
            </p>

            {/* ---------- Results ---------- */}
            <div
              ref={listRef}
              onKeyDown={onArrowKeys}
              className="max-h-[min(26rem,58vh)] overflow-y-auto p-2"
            >
              {groups.length === 0 && (
                <p className="px-3 py-10 text-center text-sm text-inkMute">
                  No matches for &ldquo;{query}&rdquo;.
                </p>
              )}

              {groups.map((group) => (
                <div key={group.name} className="mb-1 last:mb-0">
                  <p className="px-3 pb-1.5 pt-3 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-inkMute">
                    {group.name}
                  </p>
                  <ul>
                    {group.items.map((command) => (
                      <li key={command.id}>
                        <CommandRow
                          command={command}
                          copied={copiedId === command.id}
                          onActivate={activate}
                          onClose={onClose}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ---------- Legend ---------- */}
            <div className="flex items-center justify-between gap-4 border-t border-ink/10 bg-cream/60 px-4 py-2.5">
              <div className="flex items-center gap-3.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-inkMute">
                <span className="flex items-center gap-1.5">
                  <LuArrowDown size={11} aria-hidden="true" />
                  navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <LuCornerDownLeft size={11} aria-hidden="true" />
                  select
                </span>
              </div>
              <span className="hidden font-mono text-[0.56rem] uppercase tracking-[0.16em] text-inkMute sm:block">
                {modKeyLabel}+K to toggle
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * One palette row. Renders an anchor when the command is a link (so the
 * platform handles new tabs, downloads and mailto) and a button otherwise.
 */
function CommandRow({ command, copied, onActivate, onClose }) {
  const { Icon, index, label, hint, href, external, download } = command;

  const body = (
    <>
      <span
        aria-hidden="true"
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-cream text-inkMute transition-colors duration-200 group-hover:border-clay/30 group-hover:text-clay"
      >
        {index ? (
          <span className="font-mono text-[0.58rem]">{index}</span>
        ) : (
          <Icon size={13} />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-ink">
          {copied ? "Email copied to clipboard" : label}
        </span>
        {hint && (
          <span className="mt-0.5 block truncate font-mono text-[0.62rem] text-inkMute">
            {copied ? "" : hint}
          </span>
        )}
      </span>

      {copied ? (
        <LuCheck size={14} aria-hidden="true" className="shrink-0 text-sage" />
      ) : (
        external && (
          <LuExternalLink
            size={13}
            aria-hidden="true"
            className="shrink-0 text-inkMute opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
        )
      )}
    </>
  );

  const rowClass =
    "group flex w-full items-center gap-3 rounded-card px-3 py-2.5 text-left text-sm text-inkSoft outline-none transition-colors duration-200 hover:bg-cream focus-visible:bg-cream focus-visible:ring-2 focus-visible:ring-clay/30";

  if (href) {
    return (
      <a
        data-command
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: "" } : {})}
        onClick={onClose}
        className={rowClass}
      >
        {body}
      </a>
    );
  }

  return (
    <button
      data-command
      type="button"
      onClick={() => onActivate(command)}
      className={rowClass}
    >
      {body}
    </button>
  );
}
