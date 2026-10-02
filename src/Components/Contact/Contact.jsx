import { useState } from "react";
import emailjs from "emailjs-com";
import Notiflix from "notiflix";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import { LuCheck, LuClock, LuInfo } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";

import { profile, socials } from "../../data/profile";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/**
 * EmailJS keys come from `.env` (see `.env.example`). When they are missing the
 * form falls back to a prefilled `mailto:` instead of failing silently — the
 * previous version threw into the console and told the visitor nothing.
 */
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const EMAILJS_READY = Boolean(
  EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey
);

const EMPTY_FORM = { from_name: "", from_email: "", subject: "", message: "" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Field-level rules. Each returns an empty string when the value is fine. */
const RULES = {
  from_name: (value) =>
    value.trim().length >= 2 ? "" : "Please add your name.",
  from_email: (value) => {
    if (!value.trim()) return "An email address is required.";
    return EMAIL_PATTERN.test(value.trim())
      ? ""
      : "That address looks incomplete.";
  },
  message: (value) =>
    value.trim().length >= 20
      ? ""
      : "A sentence or two helps me reply usefully.",
};

const CONTACT_ROWS = [
  {
    Icon: MdOutlineEmail,
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    Icon: CiLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/niharikasahu12",
    href: socials.linkedin,
    external: true,
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    value: "github.com/NiharikaSahu-12",
    href: socials.github,
    external: true,
  },
  {
    Icon: FaMapMarkerAlt,
    label: "Location",
    value: profile.location,
  },
];

const ROW_CLASSES =
  "group flex items-center gap-4 rounded-panel border border-cream/10 bg-cream/5 p-4 backdrop-blur-sm transition-all duration-300 ease-soft hover:border-gold/40 hover:bg-cream/10";

/** Label + control + inline error, so the field set stays readable in JSX. */
function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-inkSoft"
        >
          {label}
        </label>
        {error ? (
          <span
            id={`${id}-error`}
            className="font-mono text-[0.56rem] uppercase tracking-[0.1em] text-clayDark"
          >
            {error}
          </span>
        ) : (
          hint && (
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.1em] text-inkMute">
              {hint}
            </span>
          )
        )}
      </div>
      {children}
    </div>
  );
}

const Contact = () => {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((previous) => ({ ...previous, [field]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((previous) => (previous[field] ? { ...previous, [field]: "" } : previous));
  };

  const validate = () => {
    const found = {};
    Object.entries(RULES).forEach(([field, rule]) => {
      const message = rule(values[field] ?? "");
      if (message) found[field] = message;
    });
    return found;
  };

  /** Same content, handed to the visitor's own mail client. */
  const buildMailto = () => {
    const subject =
      values.subject.trim() || `Portfolio enquiry from ${values.from_name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.from_name.trim()} (${
      values.from_email.trim()
    })`;
    return `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const sendEmail = async (event) => {
    event.preventDefault();

    // Honeypot: bots fill hidden inputs in, humans never see them.
    if (event.target.elements.company?.value) return;

    const found = validate();
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      event.target.elements[firstInvalid]?.focus();
      return;
    }

    setStatus("sending");

    if (!EMAILJS_READY) {
      window.location.href = buildMailto();
      setStatus("mailto");
      return;
    }

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: values.from_name,
          from_email: values.from_email,
          reply_to: values.from_email,
          subject:
            values.subject.trim() ||
            `Portfolio enquiry from ${values.from_name.trim()}`,
          message: values.message,
        },
        EMAILJS.publicKey
      );

      Notiflix.Notify.success("Message sent — I'll get back to you soon.");
      setValues(EMPTY_FORM);
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS error:", error);
      Notiflix.Notify.failure("That didn't send. Try the email link instead?");
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-forest py-section text-cream"
    >
      {/* ---------- Backdrop ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid-forest absolute inset-0" />
        <div className="animate-drift absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-radial-clay blur-2xl" />
        <div className="absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-radial-gold opacity-70 blur-2xl" />
      </div>

      <div className="section-shell relative">
        <SectionHeading
          tone="dark"
          index="07"
          eyebrow="Get in touch"
          title="Let's"
          accent="talk"
          meta={profile.responsePromise}
          description="Have a project in mind, or just want to say hi? Either is fine — I read everything that arrives."
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---------- Message form ---------- */}
          <Reveal direction="right" distance={34}>
            <div className="rounded-panel border border-ink/10 bg-paper p-6 shadow-warm-xl md:p-8">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
                <HiOutlineSparkles
                  className="text-clay"
                  size={20}
                  aria-hidden="true"
                />
                Send a message
              </h3>
              <p className="mt-1.5 text-sm text-inkMute">
                Fields with a hint are optional. Everything else, I need.
              </p>

              {status === "sent" && (
                <p
                  role="status"
                  className="mt-5 flex items-start gap-2.5 rounded-card border border-sage/40 bg-sage/10 px-4 py-3 text-sm leading-relaxed text-ink"
                >
                  <LuCheck
                    size={15}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-sage"
                  />
                  Thanks — your message is on its way. I&rsquo;ll reply by email.
                </p>
              )}

              {status === "mailto" && (
                <p
                  role="status"
                  className="mt-5 flex items-start gap-2.5 rounded-card border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-ink"
                >
                  <LuInfo
                    size={15}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 text-clay"
                  />
                  Your mail app should have opened with the message ready — press
                  send there and it lands with me.
                </p>
              )}

              {status === "error" && (
                <p
                  role="alert"
                  className="mt-5 rounded-card border border-clay/40 bg-clay/10 px-4 py-3 text-sm leading-relaxed text-ink"
                >
                  Something blocked that send. Please try again, or email me
                  directly at{" "}
                  <a href={`mailto:${profile.email}`} className="link-quiet">
                    {profile.email}
                  </a>
                  .
                </p>
              )}

              <form
                onSubmit={sendEmail}
                noValidate
                className="relative mt-7 space-y-5"
              >
                {/* Honeypot — off-screen for humans, tempting for bots */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="from_name" label="Your name" error={errors.from_name}>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      value={values.from_name}
                      onChange={update("from_name")}
                      autoComplete="name"
                      placeholder="Jane Doe"
                      aria-invalid={errors.from_name ? "true" : undefined}
                      aria-describedby={
                        errors.from_name ? "from_name-error" : undefined
                      }
                      className={`field ${errors.from_name ? "field-invalid" : ""}`}
                    />
                  </Field>

                  <Field
                    id="from_email"
                    label="Your email"
                    error={errors.from_email}
                  >
                    <input
                      id="from_email"
                      name="from_email"
                      type="email"
                      value={values.from_email}
                      onChange={update("from_email")}
                      autoComplete="email"
                      placeholder="jane@example.com"
                      aria-invalid={errors.from_email ? "true" : undefined}
                      aria-describedby={
                        errors.from_email ? "from_email-error" : undefined
                      }
                      className={`field ${
                        errors.from_email ? "field-invalid" : ""
                      }`}
                    />
                  </Field>
                </div>

                <Field id="subject" label="Subject" hint="Optional">
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={update("subject")}
                    placeholder="New marketing site"
                    className="field"
                  />
                </Field>

                <Field
                  id="message"
                  label="Message"
                  error={errors.message}
                  hint="20+ characters"
                >
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={values.message}
                    onChange={update("message")}
                    placeholder="Tell me a little about your project…"
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`field resize-none ${
                      errors.message ? "field-invalid" : ""
                    }`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn btn-primary w-full"
                >
                  <span>{sending ? "Sending…" : "Send message"}</span>
                  <FaPaperPlane
                    size={14}
                    aria-hidden="true"
                    className={sending ? "animate-pulse" : ""}
                  />
                </button>

                {!EMAILJS_READY && (
                  <p className="flex items-start gap-2 text-[0.72rem] leading-relaxed text-inkMute">
                    <LuInfo
                      size={13}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-clay"
                    />
                    Form delivery isn&rsquo;t configured yet, so this opens your
                    mail app with the message ready to send.
                  </p>
                )}
              </form>
            </div>
          </Reveal>

          {/* ---------- Direct contact details ---------- */}
          <Reveal direction="left" distance={34} delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-6">
              <ul className="space-y-3">
                {CONTACT_ROWS.map(({ Icon, label, value, href, external }) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card bg-clay/10 text-clay transition-colors duration-300 group-hover:bg-clay group-hover:text-cream">
                        <Icon size={19} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/45">
                          {label}
                        </span>
                        <span className="mt-1 block truncate text-sm font-medium text-cream/90">
                          {value}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={label}>
                      {href ? (
                        <a
                          href={href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className={ROW_CLASSES}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={ROW_CLASSES}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Sets expectations before someone hits send */}
              <div className="rounded-panel border border-cream/10 bg-cream/5 p-6 backdrop-blur-sm">
                <p className="flex items-center gap-2.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                  <LuClock size={13} aria-hidden="true" />
                  What happens next
                </p>
                <ol className="mt-4 space-y-3.5">
                  {[
                    "Your message lands in my inbox.",
                    "I reply with questions, or a first suggestion.",
                    "If it fits, we scope the smallest useful version together.",
                  ].map((step, i) => (
                    <li
                      key={step}
                      className="flex gap-3 text-sm leading-relaxed text-cream/70"
                    >
                      <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/30 font-mono text-[0.55rem] text-gold">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-5 border-t border-cream/10 pt-4 text-xs leading-relaxed text-cream/50">
                  {profile.responsePromise}
                </p>
              </div>              
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
