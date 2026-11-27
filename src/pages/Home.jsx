import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import Bento from '../components/Bento.jsx';
import Projects from '../components/Projects.jsx';
import About from '../components/About.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <div className="container">
      <Nav />
      <main>
        <Hero />
        <Bento />
        <Projects />
        <About />
        <Contact />
      </main>
    </div>
  );
}
