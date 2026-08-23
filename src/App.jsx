import React, { useState } from 'react';
import { ResortProvider, useResort } from './context/ResortContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VillaDetailModal } from './components/VillaDetailModal';
import { LoginModal } from './components/LoginModal';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';
import { HeroSection } from './sections/HeroSection';
import { VillasSection } from './sections/VillasSection';
import { RestaurantSection } from './sections/RestaurantSection';
import { GallerySection } from './sections/GallerySection';
import { AboutSection } from './sections/AboutSection';
import { ContactSection } from './sections/ContactSection';
import { AdminDashboard } from './admin/AdminDashboard';

const MainApp = () => {
  const { userSession, loginModalOpen, setLoginModalOpen, openLoginModal } = useResort();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedBookingVilla, setSelectedBookingVilla] = useState(null);
  const [detailModalVilla, setDetailModalVilla] = useState(null);

  // Dedicated route listener for hidden staff and admin login
  useEffect(() => {
    const checkRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash === '#admin' || path.endsWith('/admin')) {
        openLoginModal('ADMIN');
      } else if (hash === '#staff' || path.endsWith('/staff')) {
        openLoginModal('STAFF');
      } else if (hash === '#login' || path.endsWith('/login')) {
        openLoginModal('STAFF');
      }
    };

    checkRoute();
    window.addEventListener('hashchange', checkRoute);
    window.addEventListener('popstate', checkRoute);

    return () => {
      window.removeEventListener('hashchange', checkRoute);
      window.removeEventListener('popstate', checkRoute);
    };
  }, [openLoginModal]);

  const handleOpenBookingModal = (villa = null) => {
    setSelectedBookingVilla(villa);
    setBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setBookingModalOpen(false);
    setSelectedBookingVilla(null);
  };

  if (userSession) {
    return <AdminDashboard />;
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Navbar */}
      <Navbar onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Page Sections */}
      <main>
        <HeroSection onOpenBookingModal={handleOpenBookingModal} />
        <VillasSection
          onSelectVillaDetail={(villa) => setDetailModalVilla(villa)}
          onOpenBookingModal={handleOpenBookingModal}
        />
        <RestaurantSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Background Music Widget */}
      <AudioPlayerWidget />

      {/* Login Authentication Modal */}
      {loginModalOpen && (
        <LoginModal onClose={() => setLoginModalOpen(false)} />
      )}

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          selectedVilla={selectedBookingVilla}
          onClose={handleCloseBookingModal}
        />
      )}

      {/* Villa Detail Specs Modal */}
      {detailModalVilla && (
        <VillaDetailModal
          villa={detailModalVilla}
          onClose={() => setDetailModalVilla(null)}
          onBookNow={(villa) => handleOpenBookingModal(villa)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <ResortProvider>
      <MainApp />
    </ResortProvider>
  );
}
