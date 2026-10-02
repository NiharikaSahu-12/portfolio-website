import { useCallback, useState } from "react";

import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Experience from "./Components/Experience/Experience";
import Footer from "./Components/Footer/Footer";
import Highlights from "./Components/Highlights/Highlights";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Process from "./Components/Process/Process";
import Projects from "./Components/Projects/Projects";
import Services from "./Components/Services/Services";
import Skills from "./Components/Skills/Skills";
import CommandPalette from "./Components/ui/CommandPalette";
import ScrollToTop from "./Components/ui/ScrollToTop";
import SectionRail from "./Components/ui/SectionRail";
import { useGlobalShortcut } from "./hooks/useGlobalShortcut";

function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Stable identities: these are effect dependencies inside the hooks below.
  const closePalette = useCallback(() => setPaletteOpen(false), []);
  const togglePalette = useCallback(() => setPaletteOpen((open) => !open), []);

  // ⌘K / Ctrl+K from anywhere toggles the palette.
  useGlobalShortcut({ key: "k", withMod: true, onTrigger: togglePalette });

  return (
    // `overflow-x-clip` (rather than overflow-hidden) keeps decorative blobs from
    // causing horizontal scroll without breaking position:sticky descendants.
    // `grain-overlay` lays a fine paper texture over the whole page.
    <div className="grain-overlay relative min-h-screen overflow-x-clip bg-canvas font-body text-text">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-clay focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>

      <Navbar />
      <SectionRail />

      <main>
        <Home />
        <Highlights />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Skills />
        <Process />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
    </div>
  );
}

export default App;
