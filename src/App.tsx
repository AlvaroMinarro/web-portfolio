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
import { SectionRail } from '@components/ui';

function App() {
  return (
    <>
      <Header />
      <SectionRail />
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
