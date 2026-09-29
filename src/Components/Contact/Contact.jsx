import { useState } from "react";
import emailjs from "emailjs-com";
import Notiflix from "notiflix";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { FaGithub, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

import { profile, socials } from "../../data/profile";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

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

const FIELD_CLASSES =
  "w-full rounded-card border border-ink/15 bg-cream px-4 py-3 text-sm text-ink outline-none transition-all duration-300 ease-soft placeholder:text-inkMute/70 focus:border-clay focus:ring-2 focus:ring-clay/25";

const ROW_CLASSES =
  "group flex items-center gap-4 rounded-panel border border-cream/10 bg-cream/5 p-4 backdrop-blur-sm transition-all duration-300 ease-soft hover:border-gold/40 hover:bg-cream/10";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          Notiflix.Notify.success(
            "Message sent successfully! I'll get back to you soon."
          );
          e.target.reset();
        },
        (error) => {
          console.error("Error:", error.text);
          Notiflix.Notify.failure("Oops! Something went wrong. Please try again.");
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

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
          eyebrow="Get in touch"
          title="Let's"
          accent="Connect"
          description="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ---------- Message form ---------- */}
          <Reveal direction="right" distance={34}>
            <div className="rounded-panel border border-ink/10 bg-paper p-7 shadow-warm-xl md:p-9">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
                <HiOutlineSparkles className="text-clay" size={20} aria-hidden="true" />
                Send a message
              </h3>
              <p className="mt-1.5 text-sm text-inkMute">
                Fill in the form and I&rsquo;ll reply by email.
              </p>

              <form onSubmit={sendEmail} className="mt-7 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="from_name"
                      className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-inkSoft"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      autoComplete="name"
                      className={FIELD_CLASSES}
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="from_email"
                      className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-inkSoft"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      required
                      autoComplete="email"
                      className={FIELD_CLASSES}
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-inkSoft"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    className={`${FIELD_CLASSES} resize-none`}
                    placeholder="Tell me a little about your project..."
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
                  <span>{isSubmitting ? "Sending..." : "Send message"}</span>
                  <FaPaperPlane
                    size={14}
                    aria-hidden="true"
                    className={isSubmitting ? "animate-pulse" : ""}
                  />
                </button>
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
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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

              {/* Résumé call-to-action */}
              <div className="rounded-panel border border-gold/25 bg-gold/10 p-6 backdrop-blur-sm">
                <p className="font-display text-lg font-semibold text-cream">
                  Prefer a r&eacute;sum&eacute;?
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">
                  Email me and I&rsquo;ll send the latest copy, along with any
                  code samples or references you need.
                </p>
                {profile.resumeUrl ? (
                  <a href={profile.resumeUrl} download className="btn btn-light mt-5 w-full">
                    Download r&eacute;sum&eacute;
                  </a>
                ) : (
                  <a href={`mailto:${profile.email}`} className="btn btn-light mt-5 w-full">
                    <MdOutlineEmail size={16} aria-hidden="true" />
                    Request by email
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
