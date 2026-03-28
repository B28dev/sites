import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DiscourseSection from './components/DiscourseSection';
import ScaleSection from './components/ScaleSection';
import ReflectionsSection from './components/ReflectionsSection';
import TimelineSection from './components/TimelineSection';
import CardsSection from './components/CardsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

// Pages
import JourneyIndex from './pages/JourneyIndex';
import TopicView from './pages/TopicView';
import SobrePage from './pages/SobrePage';

gsap.registerPlugin(ScrollTrigger);

const Separator = ({ direction = 'down' }) => (
  <div
    className="w-full h-20 pointer-events-none relative z-10"
    style={{
      background: direction === 'down'
        ? 'linear-gradient(to bottom, transparent, #03030A)'
        : 'linear-gradient(to bottom, #03030A, transparent)',
    }}
  />
);

function Home() {

  return (
    <div className="w-full min-h-screen bg-background text-textMain selection:bg-accent/30 selection:text-white relative overflow-x-hidden">
      <Starfield />
      <Navbar />
      <main className="w-full flex flex-col items-center">
        {/* Hero — no top separator */}
        <Hero />
        <Separator direction="down" />

        {/* Discourse */}
        <div className="w-full">
          <Separator direction="up" />
          <DiscourseSection />
          <Separator direction="down" />
        </div>

        {/* Scale */}
        <div className="w-full">
          <Separator direction="up" />
          <ScaleSection />
          <Separator direction="down" />
        </div>

        {/* Reflections */}
        <div className="w-full">
          <Separator direction="up" />
          <ReflectionsSection />
          <Separator direction="down" />
        </div>

        {/* Timeline */}
        <div className="w-full">
          <Separator direction="up" />
          <TimelineSection />
          <Separator direction="down" />
        </div>

        {/* Cards */}
        <div className="w-full">
          <Separator direction="up" />
          <CardsSection />
          <Separator direction="down" />
        </div>

        {/* CTA */}
        <div className="w-full">
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jornada" element={<JourneyIndex />} />
        <Route path="/jornada/:id" element={<TopicView />} />
        <Route path="/sobre" element={<SobrePage />} />
      </Routes>
    </Router>
  );
}

export default App;
