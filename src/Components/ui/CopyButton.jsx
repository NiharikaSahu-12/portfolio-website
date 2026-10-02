import { LuCheck, LuCopy } from "react-icons/lu";

import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

/**
 * Button that copies `value` and confirms it inline instead of firing a toast.
 *
 * @param {string} value
 * @param {string} [label]        Idle label.
 * @param {string} [copiedLabel]  Confirmation label.
 * @param {string} [className]    Defaults to the small ghost button.
 */
export default function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  className = "btn btn-ghost btn-sm",
  ...rest
}) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className={className}
      {...rest}
    >
      {copied ? (
        <LuCheck size={14} aria-hidden="true" className="text-sage" />
      ) : (
        <LuCopy size={14} aria-hidden="true" />
      )}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
