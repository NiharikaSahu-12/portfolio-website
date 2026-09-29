import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Experience from "./Components/Experience/Experience";
import Footer from "./Components/Footer/Footer";
import Highlights from "./Components/Highlights/Highlights";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Projects from "./Components/Projects/Projects";
import Skills from "./Components/Skills/Skills";

function App() {
  return (
    // `overflow-x-clip` (rather than overflow-hidden) keeps decorative blobs from
    // causing horizontal scroll without breaking position:sticky descendants.
    // `grain-overlay` lays a fine paper texture over the whole page.
    <div className="grain-overlay relative min-h-screen overflow-x-clip bg-cream font-body text-ink">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-clay focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Home />
        <Highlights />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
