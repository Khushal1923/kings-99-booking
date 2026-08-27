-- ==============================================================================
-- KINGS 99 RESTAURANT & VILLA — INITIAL SEED DATA SCRIPT
-- Run this in your Supabase SQL Editor to populate initial CMS, Villas, Menu & Gallery
-- ==============================================================================

-- 1. SEED CMS
INSERT INTO public.cms (id, content) VALUES ('main', '{
  "resortName": "Kings 99 Multicuisine Restaurant & Villa",
  "tagline": "Nashik Premier Multicuisine Garden Restaurant & Celebration Lawn",
  "heroSubtitle": "Relish rich North Indian gravies, Tandoori sizzlers, authentic Maharashtrian dishes, family dinners & grand celebrations in Nashik, featuring luxury private pool staycations.",
  "heroImage": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80",
  "heroVideo": "https://assets.mixkit.co/videos/preview/mixkit-resort-with-a-swimming-pool-near-the-sea-43288-large.mp4",
  "bgMusic": "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-lounge-113583.mp3",
  "bgMusicTitle": "Kings 99 Serene Lounge Music",
  "phone": "+91 99999 99999",
  "whatsappNumber": "919999999999",
  "email": "reservations@kings99official.com",
  "address": "Kings 99 Restaurant & Villa, Trimbak Road, Anjaneri, Nashik, Maharashtra 422213, India",
  "announcementText": "👑 Welcome to Kings 99 Nashik! Reserve Family Dinners, Celebration Lawns & Private Pool Villas Now!",
  "aboutStory": "Kings 99 Restaurant and Villa is Nashik premier culinary & celebration destination in Maharashtra, India. Nestled near the scenic Sahyadri hills along Trimbakeshwar highway, Kings 99 features an exceptional open-air garden multicuisine dining experience, lush celebration lawns, and opulent private pool villas for weekend staycations, birthdays, and anniversaries.",
  "instagramLink": "https://www.instagram.com/kings99official/",
  "googleLink": "https://www.google.com/search?q=kings+99+restaurant+and+villa+nashik",
  "facebookLink": "https://facebook.com/kings99official"
}'::jsonb) ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;

-- 2. SEED VILLAS
INSERT INTO public.villas (id, name, tag, tagline, price, rating, reviews_count, max_guests, bedrooms, bathrooms, sqm, cover_image, gallery, amenities, is_active)
VALUES
(
  'villa-k1',
  'Kings 99 Royal Private Pool Villa',
  'Most Popular',
  'Spacious private villa featuring a personal swimming pool, garden lawn access, and 24/7 room service in Nashik.',
  4500, 4.9, 210, 6, 2, 2, 280,
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  '["Private Swimming Pool", "Lush Private Lawn Area", "Air Conditioned Bedrooms", "Free High-Speed Wi-Fi", "Smart LED TV", "Complimentary Indian Breakfast", "In-Villa Dining Service", "Secure On-site Parking"]'::jsonb,
  true
),
(
  'villa-k2',
  'Kings 99 Executive Family Suite',
  'Family Special',
  'Designed for family get-togethers in Nashik with large private pool, gazebo lounge, and garden views.',
  6500, 4.95, 175, 8, 3, 3, 350,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  '["Large Private Swimming Pool", "3 King Bedrooms with En-suite Baths", "Private Outdoor Seating Deck", "BBQ Grill Available", "24/7 Security & Caretaker Service", "Full Power Backup Generator"]'::jsonb,
  true
),
(
  'villa-k3',
  'Kings 99 Honeymoon Couple Pool Villa',
  'Romantic Getaway',
  'Cozy & romantic private villa with private plunge pool, candle-light dinner setup, and serene valley views.',
  3800, 4.98, 145, 2, 1, 1, 180,
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"]'::jsonb,
  '["Private Heated Plunge Pool", "Candle-Light Dinner Arrangement", "Flower Bath Setup", "Complimentary Welcome Drinks", "Tea/Coffee Maker"]'::jsonb,
  true
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED RESTAURANT
INSERT INTO public.restaurant (id, name, description, cover_image, categories, ambiance_gallery)
VALUES (
  'main',
  'Kings 99 Multicuisine Restaurant & Lawn',
  'Relish rich North Indian gravies, sizzlers, authentic Tandoori kebabs, Chinese starters, and local Maharashtrian specialties in our royal open-air garden & air-conditioned dining area in Nashik.',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  '[{"id":"cat-starters","title":"Kings Tandoor & Starters","dishes":[{"id":"kd1","name":"Paneer Tikka Angara","price":340,"description":"Fresh cottage cheese marinated in spicy Indian masalas and grilled in charcoal tandoor.","image":"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80","tag":"Chef Special"},{"id":"kd2","name":"Chicken Rozali Kebab","price":420,"description":"Stuffed minced chicken rolls marinated in cashew gravy and aromatic Indian spices.","image":"https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80","tag":"Must Try"}]},{"id":"cat-mains","title":"Royal Indian & Maharashtrian Main Course","dishes":[{"id":"kd3","name":"Kings Special Kaju Butter Masala","price":380,"description":"Whole roasted cashews cooked in rich creamy tomato and butter gravy.","image":"https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80","tag":"Pure Veg"},{"id":"kd4","name":"Nashik Style Handi Chicken / Mutton","price":520,"description":"Slow-cooked tender meat in earthen handi with authentic Maharashtrian whole spices.","image":"https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80","tag":"Authentic Nashik"}]},{"id":"cat-beverages","title":"Mocktails & Coolers","dishes":[{"id":"kd5","name":"Kings Sunset Passion Cooler","price":180,"description":"Refreshing blend of passion fruit, mint, lime juice, and soda.","image":"https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80","tag":"Cooler"}]}]'::jsonb,
  '["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"]'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- 4. SEED GALLERY
INSERT INTO public.gallery (id, title, category, url) VALUES
('g1', 'Kings 99 Swimming Pool & Lawn Nashik', 'Experiences', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'),
('g2', 'Private Pool Villa Exterior', 'Villas', 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'),
('g3', 'Garden Restaurant Evening Lights', 'Dining', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'),
('g4', 'Royal Suite Bedroom Interiors', 'Villas', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'),
('g5', 'Party & Celebration Lawn Nashik', 'Experiences', 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80')
ON CONFLICT (id) DO NOTHING;
