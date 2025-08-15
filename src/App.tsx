import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, Footer, Hero, About, Technologies, Experience, Contact } from '@components/index';

function App() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Header />
        
        <main>
          <Hero />
          <About />
          <Technologies />
          <Experience />
          <Contact />
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
