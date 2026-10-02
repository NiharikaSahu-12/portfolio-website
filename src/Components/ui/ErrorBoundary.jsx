import { Component } from "react";
import { LuRefreshCw, LuMail } from "react-icons/lu";

/**
 * Last line of defence: if a render throws, the visitor gets a usable page
 * instead of a blank screen.
 *
 * Must be a class — `componentDidCatch` has no hook equivalent.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Wire this to a real reporter (Sentry, etc.) when one is added.
    console.error("Unhandled UI error:", error, info?.componentStack);
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-gutter py-24">
        <div className="w-full max-w-lg rounded-panel border border-ink/10 bg-shell p-8 shadow-warm-lg">
          <p className="font-mono text-[0.63rem] uppercase tracking-[0.2em] text-clay">
            Unexpected error
          </p>
          <h1 className="mt-3 font-display text-display-xs font-bold text-ink">
            Something broke while rendering this page
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-inkSoft">
            The rest of my portfolio is still online — try reloading, or reach me
            directly and I&rsquo;ll fix whatever is broken.
          </p>

          <pre className="mt-5 overflow-x-auto rounded-card border border-ink/10 bg-cream p-4 font-mono text-[0.7rem] leading-relaxed text-inkMute">
            {error.message}
          </pre>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-primary btn-sm"
            >
              <LuRefreshCw size={14} aria-hidden="true" />
              Reload page
            </button>
            <a
              href="mailto:niharikasahu1299@gmail.com"
              className="btn btn-ghost btn-sm"
            >
              <LuMail size={14} aria-hidden="true" />
              Email me
            </a>
          </div>
        </div>
      </div>
    );
  }
}
