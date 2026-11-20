import {
  Header,
  Footer,
  Hero,
  Projects,
  About,
  Experience,
  Technologies,
  Contact,
} from '@components/index';

function App() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
