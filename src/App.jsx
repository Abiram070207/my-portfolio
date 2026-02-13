import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Explorations from './sections/Explorations';
import Timeline from './sections/Timeline';
import Contact from './sections/Contact';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 selection:bg-accent-cyan selection:text-black">
        <Navbar />

        <main className="flex flex-col">
          <Hero />
          <About />
          <Skills />
          <Explorations />
          <Timeline />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
