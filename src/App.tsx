import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import ModulePlayground from './components/sections/ModulePlayground';
import PluginArchitecture from './components/sections/PluginArchitecture';
import AudienceSection from './components/sections/AudienceSection';
import CapabilitiesBento from './components/sections/CapabilitiesBento';
import FinalCTA from './components/sections/FinalCTA';
import Footer from './components/layout/Footer';
import BookingModal from './components/ui/BookingModal';

function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<'Demo' | 'Session'>('Demo');

  const openBookingModal = (context: 'Demo' | 'Session' = 'Demo') => {
    setBookingContext(context);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-accent-lavender/30 selection:text-white">
      <Navbar onBookDemo={() => openBookingModal('Demo')} />
      
      <main>
        <Hero onBookDemo={() => openBookingModal('Demo')} />
        <ModulePlayground />
        <PluginArchitecture />
        <AudienceSection />
        <CapabilitiesBento />
        <FinalCTA onBookDemo={() => openBookingModal('Demo')} onExplore={() => {
          document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
        }} />
      </main>

      <Footer />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        context={bookingContext}
      />
    </div>
  );
}

export default App;
