import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Purest from './components/Purest/Purest';
import Impact from './components/Impact/Impact';
import Projects from './components/Projects/Projects';
import Journey from './components/Journey/Journey';
import About from './components/About/About';
import Footer from './components/Footer/Footer';

export default function V2HomePage() {
  return (
    <>
      <Navigation />
      <Hero />
      <Purest />
      <Impact />
      <Projects />
      <Journey />
      <About />
      <Footer />
    </>
  );
}
