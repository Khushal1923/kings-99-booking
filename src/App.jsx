import React, { useState, useEffect } from 'react';
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

  // Fail-safe Route & Secret Access Detector (URL Hash, Path Rewrites, Keyboard Shortcuts & Logo Taps)
  useEffect(() => {
    const checkRouteAndParams = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);
      const portalParam = searchParams.get('portal')?.toLowerCase();

      // Check URL Hash, Path, or exact portal query parameter (?portal=admin / ?portal=staff)
      if (
        hash === '#admin' ||
        path.endsWith('/admin') ||
        portalParam === 'admin'
      ) {
        openLoginModal('ADMIN');
      } else if (
        hash === '#staff' ||
        path.endsWith('/staff') ||
        portalParam === 'staff'
      ) {
        openLoginModal('STAFF');
      } else if (
        hash === '#login' ||
        path.endsWith('/login') ||
        portalParam === 'login'
      ) {
        openLoginModal('STAFF');
      }
    };

    checkRouteAndParams();
    window.addEventListener('hashchange', checkRouteAndParams);
    window.addEventListener('popstate', checkRouteAndParams);

    // Keyboard Shortcuts for Staff/Admin (Alt + A = Admin, Alt + S = Staff)
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        openLoginModal('ADMIN');
      } else if (e.altKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        openLoginModal('STAFF');
      }
    };

    // Custom Event for Secret Logo 3x Tap / Footer Secret Link
    const handleCustomPortalEvent = (e) => {
      const role = e.detail?.role || 'STAFF';
      openLoginModal(role);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-portal-login', handleCustomPortalEvent);

    return () => {
      window.removeEventListener('hashchange', checkRouteAndParams);
      window.removeEventListener('popstate', checkRouteAndParams);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-portal-login', handleCustomPortalEvent);
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
      {/* Navbar (Clean Customer Front-End with Restaurant Focus & Secret 3x Logo Tap Access) */}
      <Navbar onOpenBookingModal={handleOpenBookingModal} />

      {/* Main Page Sections (RESTAURANT FIRST, VILLAS SECOND) */}
      <main>
        <HeroSection onOpenBookingModal={handleOpenBookingModal} />
        <RestaurantSection />
        <VillasSection
          onSelectVillaDetail={(villa) => setDetailModalVilla(villa)}
          onOpenBookingModal={handleOpenBookingModal}
        />
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
