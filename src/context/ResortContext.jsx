import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  initialCMS,
  initialVillas,
  initialBookings,
  initialBlockedDates,
  initialRestaurant,
  initialGallery
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

const ResortContext = createContext();

const STORAGE_KEYS = {
  CMS: 'kings_99_cms_v4',
  VILLAS: 'kings_99_villas_v4',
  BOOKINGS: 'kings_99_bookings_v4',
  BLOCKED_DATES: 'kings_99_blocked_dates_v4',
  RESTAURANT: 'kings_99_restaurant_v4',
  GALLERY: 'kings_99_gallery_v4',
  SESSION: 'kings_99_session_v4',
  DINING_BOOKINGS: 'kings_99_dining_bookings_v4'
};

// Safe LocalStorage setItem helper
const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error(`Storage error for ${key}:`, e);
  }
};

// Mapper helpers for snake_case (Supabase) <-> camelCase (React UI)
const mapVillaFromDB = (v) => ({
  id: v.id,
  name: v.name,
  title: v.name,
  tag: v.tag,
  tagline: v.tagline,
  price: Number(v.price),
  rating: Number(v.rating),
  reviewsCount: v.reviews_count,
  maxGuests: v.max_guests,
  bedrooms: v.bedrooms,
  bathrooms: v.bathrooms,
  sqm: v.sqm,
  coverImage: v.cover_image,
  gallery: v.gallery || [],
  amenities: v.amenities || [],
  isActive: v.is_active
});

const mapVillaToDB = (v) => ({
  id: v.id || `villa-${Date.now()}`,
  name: v.name || v.title || 'Kings 99 Villa',
  tag: v.tag || '',
  tagline: v.tagline || '',
  price: Number(v.price) || 0,
  rating: Number(v.rating) || 5.0,
  reviews_count: Number(v.reviewsCount) || 1,
  max_guests: Number(v.maxGuests) || 2,
  bedrooms: Number(v.bedrooms) || 1,
  bathrooms: Number(v.bathrooms) || 1,
  sqm: Number(v.sqm) || 100,
  cover_image: v.coverImage || v.cover_image || '',
  gallery: v.gallery || [],
  amenities: v.amenities || [],
  is_active: v.isActive !== undefined ? v.isActive : true
});

const mapBookingFromDB = (b) => ({
  id: b.id,
  villaId: b.villa_id,
  villaName: b.villa_name,
  customerName: b.customer_name,
  phone: b.phone,
  email: b.email || '',
  checkIn: b.check_in,
  checkOut: b.check_out,
  guests: b.guests,
  totalPrice: Number(b.total_price),
  status: b.status,
  bookingType: b.booking_type || 'ONLINE',
  paymentMode: b.payment_mode || 'Online',
  paymentStatus: b.payment_status || 'Pending',
  specialRequests: b.special_requests || '',
  createdAt: b.created_at
});

const mapBookingToDB = (b) => ({
  id: b.id,
  villa_id: b.villaId,
  villa_name: b.villaName,
  customer_name: b.customerName,
  phone: b.phone,
  email: b.email || '',
  check_in: b.checkIn,
  check_out: b.checkOut,
  guests: Number(b.guests) || 1,
  total_price: Number(b.totalPrice) || 0,
  status: b.status || 'PENDING',
  booking_type: b.bookingType || 'ONLINE',
  payment_mode: b.paymentMode || '',
  payment_status: b.paymentStatus || '',
  special_requests: b.specialRequests || '',
  created_at: b.createdAt || new Date().toISOString()
});

const mapDiningFromDB = (d) => ({
  id: d.id,
  customerName: d.customer_name,
  phone: d.phone,
  date: d.date,
  time: d.time,
  guests: d.guests,
  notes: d.notes || '',
  status: d.status,
  createdAt: d.created_at
});

const mapDiningToDB = (d) => ({
  id: d.id,
  customer_name: d.customerName,
  phone: d.phone,
  date: d.date,
  time: d.time,
  guests: Number(d.guests) || 2,
  notes: d.notes || '',
  status: d.status || 'PENDING',
  created_at: d.createdAt || new Date().toISOString()
});

const mapBlockedFromDB = (blk) => ({
  id: blk.id,
  villaId: blk.villa_id,
  startDate: blk.start_date,
  endDate: blk.end_date,
  reason: blk.reason || '',
  createdAt: blk.created_at
});

const mapBlockedToDB = (blk) => ({
  id: blk.id,
  villa_id: blk.villaId,
  start_date: blk.startDate,
  end_date: blk.endDate,
  reason: blk.reason || '',
  created_at: blk.createdAt || new Date().toISOString()
});

const mapRestaurantFromDB = (r) => ({
  id: r.id || 'main',
  name: r.name,
  description: r.description,
  coverImage: r.cover_image,
  categories: r.categories || [],
  ambianceGallery: r.ambiance_gallery || []
});

const mapRestaurantToDB = (r) => ({
  id: 'main',
  name: r.name,
  description: r.description,
  cover_image: r.coverImage || r.cover_image || '',
  categories: r.categories || [],
  ambiance_gallery: r.ambianceGallery || r.ambiance_gallery || [],
  updated_at: new Date().toISOString()
});

const mapGalleryFromDB = (g) => ({
  id: g.id,
  title: g.title,
  category: g.category || 'General',
  url: g.url,
  createdAt: g.created_at
});

const mapGalleryToDB = (g) => ({
  id: g.id,
  title: g.title,
  category: g.category || 'General',
  url: g.url,
  created_at: g.createdAt || new Date().toISOString()
});

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
    return saved ? JSON.parse(saved) : [];
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

  const [userSession, setUserSession] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      if (parsed) {
        if (typeof parsed.email === 'string') {
          parsed.email = parsed.email.replace(/(@kings99official\.com)+$/i, '@kings99official.com');
        }
        if (typeof parsed.username === 'string') {
          parsed.username = parsed.username.replace(/(@kings99official\.com)+$/i, '@kings99official.com');
        }
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [targetRole, setTargetRole] = useState(null);

  // Fetch initial data from Supabase & Subscribe to Realtime Postgres Changes
  const fetchSupabaseData = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      // 1. Fetch CMS
      const { data: cmsData } = await supabase.from('cms').select('*').eq('id', 'main').maybeSingle();
      if (cmsData && cmsData.content) {
        setCms(cmsData.content);
      }

      // 2. Fetch Villas
      const { data: villaData } = await supabase.from('villas').select('*');
      if (villaData && villaData.length > 0) {
        setVillas(villaData.map(mapVillaFromDB));
      }

      // 3. Fetch Bookings
      const { data: bookingData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (bookingData && bookingData.length > 0) {
        const dbBookings = bookingData.map(mapBookingFromDB);
        setBookings(prev => {
          const dbIds = new Set(dbBookings.map(b => b.id));
          const localOnly = prev.filter(b => !dbIds.has(b.id));
          return [...dbBookings, ...localOnly];
        });
      }

      // 4. Fetch Dining Bookings
      const { data: diningData } = await supabase.from('dining_bookings').select('*').order('created_at', { ascending: false });
      if (diningData && diningData.length > 0) {
        const dbDining = diningData.map(mapDiningFromDB);
        setDiningBookings(prev => {
          const dbIds = new Set(dbDining.map(d => d.id));
          const localOnly = prev.filter(d => !dbIds.has(d.id));
          return [...dbDining, ...localOnly];
        });
      }

      // 5. Fetch Blocked Dates
      const { data: blockedData } = await supabase.from('blocked_dates').select('*');
      if (blockedData) {
        setBlockedDates(blockedData.map(mapBlockedFromDB));
      }

      // 6. Fetch Restaurant
      const { data: restData } = await supabase.from('restaurant').select('*').eq('id', 'main').maybeSingle();
      if (restData) {
        setRestaurant(mapRestaurantFromDB(restData));
      }

      // 7. Fetch Gallery
      const { data: galleryData } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (galleryData) {
        setGallery(galleryData.map(mapGalleryFromDB));
      }
    } catch (err) {
      console.error("Supabase initial data fetch error:", err);
    }
  }, []);

  // Supabase Auth Listener & Realtime Subscriptions
  useEffect(() => {
    fetchSupabaseData();

    if (isSupabaseConfigured && supabase) {
      // Supabase Auth listener
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
          // Fetch role from user_metadata, app_metadata, or user_roles table
          let role = session.user.app_metadata?.role || session.user.user_metadata?.role || 'STAFF';

          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();

          if (roleData && roleData.role) {
            role = roleData.role.toUpperCase();
          }

          const activeSession = {
            role: role.toUpperCase(),
            username: session.user.email,
            email: session.user.email,
            user: session.user,
            expiresAt: session.expires_at ? session.expires_at * 1000 : Date.now() + 3600 * 1000
          };

          setUserSession(activeSession);
          safeSetItem(STORAGE_KEYS.SESSION, JSON.stringify(activeSession));
        } else if (event === 'SIGNED_OUT') {
          setUserSession(null);
          localStorage.removeItem(STORAGE_KEYS.SESSION);
        }
      });

      // Realtime Channel for instant sync across browsers & devices
      const channel = supabase
        .channel('resort-realtime-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => fetchSupabaseData())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'dining_bookings' }, () => fetchSupabaseData())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'villas' }, () => fetchSupabaseData())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'blocked_dates' }, () => fetchSupabaseData())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'cms' }, () => fetchSupabaseData())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'restaurant' }, () => fetchSupabaseData())
        .on('postgres_changes', { event: '*', schema: 'public', table: 'gallery' }, () => fetchSupabaseData())
        .subscribe();

      return () => {
        authListener?.subscription?.unsubscribe();
        supabase.removeChannel(channel);
      };
    }
  }, [fetchSupabaseData]);

  // Storage Sync Fallback for Offline / Local Use
  useEffect(() => {
    safeSetItem(STORAGE_KEYS.CMS, JSON.stringify(cms));
  }, [cms]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.VILLAS, JSON.stringify(villas));
  }, [villas]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.DINING_BOOKINGS, JSON.stringify(diningBookings));
  }, [diningBookings]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.BLOCKED_DATES, JSON.stringify(blockedDates));
  }, [blockedDates]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.RESTAURANT, JSON.stringify(restaurant));
  }, [restaurant]);

  useEffect(() => {
    safeSetItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    if (userSession) {
      safeSetItem(STORAGE_KEYS.SESSION, JSON.stringify(userSession));
    } else {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    }
  }, [userSession]);

  const isUsingDefaultCredentials = useCallback(() => false, []);

  // Supabase Auth Login
  const login = async (usernameInput, passwordInput) => {
    const input = usernameInput.trim();
    const password = passwordInput.trim();

    if (isSupabaseConfigured && supabase) {
      const email = input.includes('@') ? input : `${input}@kings99official.com`;
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (!error && data?.user) {
          let role = data.user.app_metadata?.role || data.user.user_metadata?.role || (input.toLowerCase().includes('admin') ? 'ADMIN' : 'STAFF');

          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle();

          if (roleData && roleData.role) {
            role = roleData.role.toUpperCase();
          }

          const activeSession = {
            role: role.toUpperCase(),
            username: data.user.email,
            email: data.user.email,
            user: data.user
          };

          setUserSession(activeSession);
          safeSetItem(STORAGE_KEYS.SESSION, JSON.stringify(activeSession));
          setLoginModalOpen(false);
          return { success: true, role: role.toUpperCase() };
        }

        if (error && !error.message.includes('fetch')) {
          return { success: false, error: error.message || "Invalid credentials." };
        }
      } catch (err) {
        console.warn("Supabase login connection error, enabling local fallback:", err);
      }
    }

    // Local Fallback mode
    const roleUpper = input.toLowerCase().includes('admin') ? 'ADMIN' : 'STAFF';
    const userEmail = input.includes('@') ? input : `${input}@kings99official.com`;
    const activeSession = {
      role: roleUpper,
      username: input,
      email: userEmail
    };
    setUserSession(activeSession);
    safeSetItem(STORAGE_KEYS.SESSION, JSON.stringify(activeSession));
    setLoginModalOpen(false);
    return { success: true, role: roleUpper };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUserSession(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    setLoginModalOpen(false);
  };

  const extendSession = async () => {
    if (userSession) {
      const extended = { ...userSession, expiresAt: Date.now() + 3600 * 1000 };
      setUserSession(extended);
      safeSetItem(STORAGE_KEYS.SESSION, JSON.stringify(extended));
    }
  };

  // Update Credentials via Supabase Auth password update
  const updateCredentials = async (roleStr, newUsername, newPassword) => {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({
        password: newPassword.trim()
      });
      if (error) {
        throw new Error(error.message);
      }
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
  const addBooking = async (bookingData) => {
    const availability = checkAvailability(bookingData.villaId, bookingData.checkIn, bookingData.checkOut);
    if (!availability.available) {
      throw new Error(availability.reason);
    }

    const villa = villas.find(v => v.id === bookingData.villaId);
    const codeNumber = Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      id: bookingData.id || `K99-2026-${codeNumber}`,
      villaId: bookingData.villaId,
      villaName: villa ? villa.name : "Kings 99 Villa",
      customerName: bookingData.customerName,
      phone: bookingData.phone,
      email: bookingData.email || "",
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: Number(bookingData.guests) || 1,
      totalPrice: Number(bookingData.totalPrice) || 0,
      status: bookingData.status || "PENDING",
      bookingType: bookingData.bookingType || "ONLINE",
      paymentMode: bookingData.paymentMode || "",
      paymentStatus: bookingData.paymentStatus || "",
      specialRequests: bookingData.specialRequests || "",
      createdAt: new Date().toISOString()
    };

    setBookings(prev => {
      const updated = [newBooking, ...prev];
      safeSetItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('bookings').insert(mapBookingToDB(newBooking));
      if (error) console.error("Supabase addBooking error:", error);
    }

    return newBooking;
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
      if (error) console.error("Supabase updateBookingStatus error:", error);
    }
  };

  // Add Dining Table Reservation
  const addDiningBooking = async (tableData) => {
    const codeNumber = Math.floor(100 + Math.random() * 900);
    const newTableBooking = {
      id: tableData.id || `TBL-2026-${codeNumber}`,
      customerName: tableData.customerName,
      phone: tableData.phone,
      date: tableData.date,
      time: tableData.time,
      guests: Number(tableData.guests) || 2,
      notes: tableData.notes || "",
      status: tableData.status || "PENDING",
      createdAt: new Date().toISOString()
    };

    setDiningBookings(prev => {
      const updated = [newTableBooking, ...prev];
      safeSetItem(STORAGE_KEYS.DINING_BOOKINGS, JSON.stringify(updated));
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('dining_bookings').insert(mapDiningToDB(newTableBooking));
      if (error) console.error("Supabase addDiningBooking error:", error);
    }

    return newTableBooking;
  };

  const updateDiningStatus = async (id, newStatus) => {
    setDiningBookings(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('dining_bookings').update({ status: newStatus }).eq('id', id);
      if (error) console.error("Supabase updateDiningStatus error:", error);
    }
  };

  // Update Website CMS Text
  const updateCMS = async (newCms) => {
    const updated = { ...cms, ...newCms };
    setCms(updated);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('cms').upsert({ id: 'main', content: updated, updated_at: new Date().toISOString() });
      if (error) console.error("Supabase updateCMS error:", error);
    }
  };

  // Villa Management (CRUD)
  const saveVilla = async (villaData) => {
    let targetVilla;
    if (villaData.id) {
      targetVilla = { ...villaData };
      setVillas(prev => prev.map(v => v.id === villaData.id ? { ...v, ...villaData } : v));
    } else {
      targetVilla = {
        ...villaData,
        id: `villa-${Date.now()}`,
        isActive: true,
        rating: 5.0,
        reviewsCount: 1
      };
      setVillas(prev => [...prev, targetVilla]);
    }

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('villas').upsert(mapVillaToDB(targetVilla));
      if (error) console.error("Supabase saveVilla error:", error);
    }
  };

  const deleteVilla = async (villaId) => {
    setVillas(prev => prev.filter(v => v.id !== villaId));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('villas').delete().eq('id', villaId);
      if (error) console.error("Supabase deleteVilla error:", error);
    }
  };

  // Date Blocker Management
  const addBlockedDate = async (block) => {
    const newBlock = { ...block, id: `blk-${Date.now()}` };
    setBlockedDates(prev => [...prev, newBlock]);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('blocked_dates').insert(mapBlockedToDB(newBlock));
      if (error) console.error("Supabase addBlockedDate error:", error);
    }
  };

  const removeBlockedDate = async (blockId) => {
    setBlockedDates(prev => prev.filter(b => b.id !== blockId));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('blocked_dates').delete().eq('id', blockId);
      if (error) console.error("Supabase removeBlockedDate error:", error);
    }
  };

  // Restaurant & Menu Management
  const saveRestaurantData = async (newRestaurant) => {
    setRestaurant(newRestaurant);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('restaurant').upsert(mapRestaurantToDB(newRestaurant));
      if (error) console.error("Supabase saveRestaurantData error:", error);
    }
  };

  // Gallery Management
  const addGalleryImage = async (item) => {
    const newItem = { ...item, id: `g-${Date.now()}` };
    setGallery(prev => [newItem, ...prev]);

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('gallery').insert(mapGalleryToDB(newItem));
      if (error) console.error("Supabase addGalleryImage error:", error);
    }
  };

  const deleteGalleryImage = async (id) => {
    setGallery(prev => prev.filter(g => g.id !== id));

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) console.error("Supabase deleteGalleryImage error:", error);
    }
  };

  // Export JSON Backup
  const exportDataJSON = () => {
    const data = { cms, villas, bookings, diningBookings, blockedDates, restaurant, gallery };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kings_99_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  // Import JSON Backup
  const importDataJSON = async (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.cms) await updateCMS(parsed.cms);
      if (parsed.villas) {
        for (const v of parsed.villas) await saveVilla(v);
      }
      if (parsed.bookings) {
        for (const b of parsed.bookings) {
          setBookings(prev => [b, ...prev.filter(x => x.id !== b.id)]);
          if (isSupabaseConfigured && supabase) {
            await supabase.from('bookings').upsert(mapBookingToDB(b));
          }
        }
      }
      if (parsed.diningBookings) {
        for (const d of parsed.diningBookings) {
          setDiningBookings(prev => [d, ...prev.filter(x => x.id !== d.id)]);
          if (isSupabaseConfigured && supabase) {
            await supabase.from('dining_bookings').upsert(mapDiningToDB(d));
          }
        }
      }
      if (parsed.blockedDates) {
        for (const blk of parsed.blockedDates) await addBlockedDate(blk);
      }
      if (parsed.restaurant) await saveRestaurantData(parsed.restaurant);
      if (parsed.gallery) {
        for (const g of parsed.gallery) await addGalleryImage(g);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  // Reset to Defaults
  const resetToDefaults = async () => {
    setCms(initialCMS);
    setVillas(initialVillas);
    setBookings([]);
    setDiningBookings([]);
    setBlockedDates(initialBlockedDates);
    setRestaurant(initialRestaurant);
    setGallery(initialGallery);
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
      userSession,
      loginModalOpen,
      targetRole,
      setLoginModalOpen,
      openLoginModal,
      isUsingDefaultCredentials,
      extendSession,
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
