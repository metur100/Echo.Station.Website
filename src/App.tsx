import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { About } from './components/sections/About';
import { CrewResearch } from './components/sections/CrewResearch';
import { EchoMemory } from './components/sections/EchoMemory';
import { Faq } from './components/sections/Faq';
import { Frontier } from './components/sections/Frontier';
import { Gallery } from './components/sections/Gallery';
import { Gameplay } from './components/sections/Gameplay';
import { GetTheGame } from './components/sections/GetTheGame';
import { Hero } from './components/sections/Hero';
import { ShipSystems } from './components/sections/ShipSystems';
import { Support } from './components/sections/Support';
import { Trailer } from './components/sections/Trailer';
import { SkipLink } from './components/SkipLink';

export function App() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Gameplay />
        <ShipSystems />
        <EchoMemory />
        <CrewResearch />
        <Frontier />
        <Gallery />
        <Trailer />
        <GetTheGame />
        <Faq />
        <Support />
      </main>
      <Footer />
    </>
  );
}
