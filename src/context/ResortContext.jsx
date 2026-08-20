import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialCMS,
  initialVillas,
  initialBookings,
  initialBlockedDates,
  initialRestaurant,
  initialGallery
} from '../data/initialData';

const ResortContext = createContext();

const STORAGE_KEYS = {
  CMS: 'kings_99_cms_v4',
  VILLAS: 'kings_99_villas_v4',
  BOOKINGS: 'kings_99_bookings_v4',
  BLOCKED_DATES: 'kings_99_blocked_dates_v4',
  RESTAURANT: 'kings_99_restaurant_v4',
  GALLERY: 'kings_99_gallery_v4',
  CREDENTIALS: 'kings_99_credentials_v4',
  SESSION: 'kings_99_session_v4',
  DINING_BOOKINGS: 'kings_99_dining_bookings_v4'
};

const initialCredentials = {
  staff: { username: 'staff', password: 'staff123' },
  admin: { username: 'admin', password: 'admin123' }
};

const initialDiningBookings = [
  {
    id: "TBL-2026-501",
    customerName: "Vikram Malhotra",
    phone: "+91 98900 11223",
    date: "2026-08-25",
    time: "19:30",
    guests: 4,
    notes: "Outdoor Garden Table preferred for family dinner.",
    status: "CONFIRMED",
    createdAt: "2026-08-19T18:00:00Z"
  },
  {
    id: "TBL-2026-502",
    customerName: "Priya Kulkarni",
    phone: "+91 97654 32109",
    date: "2026-08-26",
    time: "20:00",
    guests: 2,
    notes: "Anniversary dinner table setup.",
    status: "PENDING",
    createdAt: "2026-08-20T08:30:00Z"
  }
];

export const ResortProvider = ({ children }) => {
  const [cms, setCms] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CMS);
    return saved ? JSON.parse(saved) : initialCMS;
  });

  const [villas, setVillas] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VILLAS);
    return saved ? JSON.parse(saved) : initialVillas;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : initialBookings;
  });

  const [diningBookings, setDiningBookings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DINING_BOOKINGS);
    return saved ? JSON.parse(saved) : initialDiningBookings;
  });

  const [blockedDates, setBlockedDates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BLOCKED_DATES);
    return saved ? JSON.parse(saved) : initialBlockedDates;
  });

  const [restaurant, setRestaurant] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESTAURANT);
    return saved ? JSON.parse(saved) : initialRestaurant;
  });

  const [gallery, setGallery] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [credentials, setCredentials] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    return saved ? JSON.parse(saved) : initialCredentials;
  });

  const [userSession, setUserSession] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
    return saved ? JSON.parse(saved) : null;
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [targetRole, setTargetRole] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VILLAS, JSON.stringify(villas));
  }, [villas]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DINING_BOOKINGS, JSON.stringify(diningBookings));
  }, [diningBookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify(blockedDates));
  }, [blockedDates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESTAURANT, JSON.stringify(restaurant));
  }, [restaurant]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    if (userSession) {
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  }, [userSession]);

  // Authentication login function
  const login = (usernameInput, passwordInput) => {
    const u = usernameInput.trim();
    const p = passwordInput.trim();

    if (u === credentials.admin.username && p === credentials.admin.password) {
      const session = { role: 'ADMIN', username: u };
      setUserSession(session);
      setLoginModalOpen(false);
      return { success: true, role: 'ADMIN' };
    }

    if (u === credentials.staff.username && p === credentials.staff.password) {
      const session = { role: 'STAFF', username: u };
      setUserSession(session);
      setLoginModalOpen(false);
      return { success: true, role: 'STAFF' };
    }

    return { success: false, error: "Invalid username or password. Please check your credentials." };
  };

  const logout = () => {
    setUserSession(null);
    setLoginModalOpen(false);
  };

  const updateCredentials = (role, newUsername, newPassword) => {
    if (role === 'STAFF') {
      setCredentials(prev => ({
        ...prev,
        staff: { username: newUsername.trim(), password: newPassword.trim() }
      }));
    } else if (role === 'ADMIN') {
      setCredentials(prev => ({
        ...prev,
        admin: { username: newUsername.trim(), password: newPassword.trim() }
      }));
    }
  };

  const openLoginModal = (role = 'STAFF') => {
    setTargetRole(role);
    setLoginModalOpen(true);
  };

  // Date Collision Checking Engine
  const checkAvailability = (villaId, checkInStr, checkOutStr, excludeBookingId = null) => {
    if (!checkInStr || !checkOutStr) return { available: false, reason: "Please select valid check-in and check-out dates." };
    const checkIn = new Date(checkInStr);
    const checkOut = new Date(checkOutStr);

    if (checkIn >= checkOut) {
      return { available: false, reason: "Check-out date must be after check-in date." };
    }

    for (const b of bookings) {
      if (b.villaId === villaId && b.id !== excludeBookingId && b.status !== 'REJECTED' && b.status !== 'CANCELLED') {
        const bIn = new Date(b.checkIn);
        const bOut = new Date(b.checkOut);
        if (checkIn < bOut && checkOut > bIn) {
          return {
            available: false,
            reason: `Villa is already booked from ${b.checkIn} to ${b.checkOut} (Ref: ${b.id}).`
          };
        }
      }
    }

    for (const blk of blockedDates) {
      if (blk.villaId === villaId) {
        const blkIn = new Date(blk.startDate);
        const blkOut = new Date(blk.endDate);
        if (checkIn < blkOut && checkOut > blkIn) {
          return {
            available: false,
            reason: `Dates blocked by owner: ${blk.reason || 'Maintenance'} (${blk.startDate} to ${blk.endDate}).`
          };
        }
      }
    }

    return { available: true };
  };

  // Add Villa Booking
  const addBooking = (bookingData) => {
    const availability = checkAvailability(bookingData.villaId, bookingData.checkIn, bookingData.checkOut);
    if (!availability.available) {
      throw new Error(availability.reason);
    }

    const villa = villas.find(v => v.id === bookingData.villaId);
    const codeNumber = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: `K99-2026-${codeNumber}`,
      villaId: bookingData.villaId,
      villaName: villa ? villa.name : "Kings 99 Villa",
      customerName: bookingData.customerName,
      phone: bookingData.phone,
      email: bookingData.email || "",
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: Number(bookingData.guests) || 1,
      totalPrice: Number(bookingData.totalPrice) || 0,
      status: "PENDING",
      specialRequests: bookingData.specialRequests || "",
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  // Add Dining Table Reservation
  const addDiningBooking = (tableData) => {
    const codeNumber = Math.floor(100 + Math.random() * 900);
    const newTableBooking = {
      id: `TBL-2026-${codeNumber}`,
      customerName: tableData.customerName,
      phone: tableData.phone,
      date: tableData.date,
      time: tableData.time,
      guests: Number(tableData.guests) || 2,
      notes: tableData.notes || "",
      status: "PENDING",
      createdAt: new Date().toISOString()
    };

    setDiningBookings(prev => [newTableBooking, ...prev]);
    return newTableBooking;
  };

  const updateDiningStatus = (id, newStatus) => {
    setDiningBookings(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  // Update Website CMS Text
  const updateCMS = (newCms) => {
    setCms(prev => ({ ...prev, ...newCms }));
  };

  // Villa Management (CRUD)
  const saveVilla = (villaData) => {
    if (villaData.id) {
      setVillas(prev => prev.map(v => v.id === villaData.id ? { ...v, ...villaData } : v));
    } else {
      const newVilla = {
        ...villaData,
        id: `villa-${Date.now()}`,
        isActive: true,
        rating: 5.0,
        reviewsCount: 1
      };
      setVillas(prev => [...prev, newVilla]);
    }
  };

  const deleteVilla = (villaId) => {
    setVillas(prev => prev.filter(v => v.id !== villaId));
  };

  // Date Blocker Management
  const addBlockedDate = (block) => {
    const newBlock = { ...block, id: `blk-${Date.now()}` };
    setBlockedDates(prev => [...prev, newBlock]);
  };

  const removeBlockedDate = (blockId) => {
    setBlockedDates(prev => prev.filter(b => b.id !== blockId));
  };

  // Restaurant & Menu Management
  const saveRestaurantData = (newRestaurant) => {
    setRestaurant(newRestaurant);
  };

  // Gallery Management
  const addGalleryImage = (item) => {
    setGallery(prev => [{ ...item, id: `g-${Date.now()}` }, ...prev]);
  };

  const deleteGalleryImage = (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Export JSON Backup
  const exportDataJSON = () => {
    const data = { cms, villas, bookings, diningBookings, blockedDates, restaurant, gallery, credentials };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kings_99_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Import JSON Backup
  const importDataJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.cms) setCms(parsed.cms);
      if (parsed.villas) setVillas(parsed.villas);
      if (parsed.bookings) setBookings(parsed.bookings);
      if (parsed.diningBookings) setDiningBookings(parsed.diningBookings);
      if (parsed.blockedDates) setBlockedDates(parsed.blockedDates);
      if (parsed.restaurant) setRestaurant(parsed.restaurant);
      if (parsed.gallery) setGallery(parsed.gallery);
      if (parsed.credentials) setCredentials(parsed.credentials);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setCms(initialCMS);
    setVillas(initialVillas);
    setBookings(initialBookings);
    setDiningBookings(initialDiningBookings);
    setBlockedDates(initialBlockedDates);
    setRestaurant(initialRestaurant);
    setGallery(initialGallery);
    setCredentials(initialCredentials);
    setUserSession(null);
    localStorage.clear();
  };

  return (
    <ResortContext.Provider value={{
      cms,
      villas,
      bookings,
      diningBookings,
      blockedDates,
      restaurant,
      gallery,
      credentials,
      userSession,
      loginModalOpen,
      targetRole,
      setLoginModalOpen,
      openLoginModal,
      login,
      logout,
      updateCredentials,
      checkAvailability,
      addBooking,
      updateBookingStatus,
      addDiningBooking,
      updateDiningStatus,
      updateCMS,
      saveVilla,
      deleteVilla,
      addBlockedDate,
      removeBlockedDate,
      saveRestaurantData,
      addGalleryImage,
      deleteGalleryImage,
      exportDataJSON,
      importDataJSON,
      resetToDefaults
    }}>
      {children}
    </ResortContext.Provider>
  );
};

export const useResort = () => {
  const context = useContext(ResortContext);
  if (!context) {
    throw new Error('useResort must be used within a ResortProvider');
  }
  return context;
};
