export const initialCMS = {
  resortName: "Kings 99 Restaurant & Villa",
  tagline: "Luxury Private Pool Villas & Pure Gourmet Dining in Nashik",
  heroSubtitle: "Experience royal Maharashtrian hospitality, private pool staycations, grand celebration lawns, and delicious multicuisine dining at Kings 99 Nashik, India.",
  heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80",
  heroVideo: "https://assets.mixkit.co/videos/preview/mixkit-resort-with-a-swimming-pool-near-the-sea-43288-large.mp4",
  bgMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=relaxing-lounge-113583.mp3",
  bgMusicTitle: "Kings 99 Serene Lounge Music",
  phone: "+91 99999 99999",
  whatsappNumber: "919999999999",
  email: "reservations@kings99official.com",
  address: "Kings 99 Restaurant & Villa, Trimbak Road, Anjaneri, Nashik, Maharashtra 422213, India",
  announcementText: "👑 Welcome to Kings 99 Nashik, India! Book Private Pool Villas & Celebration Lawns Now!",
  aboutStory: "Kings 99 Restaurant and Villa is Nashik's premier luxury staycation destination in Maharashtra, India. Nestled near the scenic Sahyadri hills along the Trimbakeshwar highway, Kings 99 features opulent private pool villas, lush green celebration lawns, and an exceptional multicuisine dining experience crafted for family weekends, birthdays, and anniversaries.",
  instagramLink: "https://www.instagram.com/kings99official/",
  googleLink: "https://www.google.com/search?q=kings+99+restaurant+and+villa+nashik",
  facebookLink: "https://facebook.com/kings99official",
};

export const initialVillas = [
  {
    id: "villa-k1",
    name: "Kings 99 Royal Private Pool Villa",
    tag: "Most Popular",
    tagline: "Spacious private villa featuring a personal swimming pool, garden lawn access, and 24/7 room service in Nashik.",
    price: 4500,
    rating: 4.9,
    reviewsCount: 210,
    maxGuests: 6,
    bedrooms: 2,
    bathrooms: 2,
    sqm: 280,
    coverImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Swimming Pool",
      "Lush Private Lawn Area",
      "Air Conditioned Bedrooms",
      "Free High-Speed Wi-Fi",
      "Smart LED TV",
      "Complimentary Indian Breakfast",
      "In-Villa Dining Service",
      "Secure On-site Parking"
    ],
    isActive: true
  },
  {
    id: "villa-k2",
    name: "Kings 99 Executive Family Suite",
    tag: "Family Special",
    tagline: "Designed for family get-togethers in Nashik with large private pool, gazebo lounge, and garden views.",
    price: 6500,
    rating: 4.95,
    reviewsCount: 175,
    maxGuests: 8,
    bedrooms: 3,
    bathrooms: 3,
    sqm: 350,
    coverImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Large Private Swimming Pool",
      "3 King Bedrooms with En-suite Baths",
      "Private Outdoor Seating Deck",
      "BBQ Grill Available",
      "24/7 Security & Caretaker Service",
      "Full Power Backup Generator"
    ],
    isActive: true
  },
  {
    id: "villa-k3",
    name: "Kings 99 Honeymoon Couple Pool Villa",
    tag: "Romantic Getaway",
    tagline: "Cozy & romantic private villa with private plunge pool, candle-light dinner setup, and serene valley views.",
    price: 3800,
    rating: 4.98,
    reviewsCount: 145,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    sqm: 180,
    coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: [
      "Private Heated Plunge Pool",
      "Candle-Light Dinner Arrangement",
      "Flower Bath Setup",
      "Complimentary Welcome Drinks",
      "Tea/Coffee Maker"
    ],
    isActive: true
  }
];

export const initialBookings = [];

export const initialBlockedDates = [
  {
    id: "blk-k1",
    villaId: "villa-k1",
    startDate: "2026-09-15",
    endDate: "2026-09-16",
    reason: "Private Event Booking / Maintenance"
  }
];

export const initialRestaurant = {
  name: "Kings 99 Multicuisine Restaurant & Lawn",
  description: "Relish rich North Indian gravies, sizzlers, authentic Tandoori kebabs, Chinese starters, and local Maharashtrian specialties in our royal open-air garden & air-conditioned dining area in Nashik.",
  coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  categories: [
    {
      id: "cat-starters",
      title: "Kings Tandoor & Starters",
      dishes: [
        {
          id: "kd1",
          name: "Paneer Tikka Angara",
          price: 340,
          description: "Fresh cottage cheese marinated in spicy Indian masalas and grilled in charcoal tandoor.",
          image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80",
          tag: "Chef Special"
        },
        {
          id: "kd2",
          name: "Chicken Rozali Kebab",
          price: 420,
          description: "Stuffed minced chicken rolls marinated in cashew gravy and aromatic Indian spices.",
          image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
          tag: "Must Try"
        }
      ]
    },
    {
      id: "cat-mains",
      title: "Royal Indian & Maharashtrian Main Course",
      dishes: [
        {
          id: "kd3",
          name: "Kings Special Kaju Butter Masala",
          price: 380,
          description: "Whole roasted cashews cooked in rich creamy tomato and butter gravy.",
          image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
          tag: "Pure Veg"
        },
        {
          id: "kd4",
          name: "Nashik Style Handi Chicken / Mutton",
          price: 520,
          description: "Slow-cooked tender meat in earthen handi with authentic Maharashtrian whole spices.",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
          tag: "Authentic Nashik"
        }
      ]
    },
    {
      id: "cat-beverages",
      title: "Mocktails & Coolers",
      dishes: [
        {
          id: "kd5",
          name: "Kings Sunset Passion Cooler",
          price: 180,
          description: "Refreshing blend of passion fruit, mint, lime juice, and soda.",
          image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
          tag: "Cooler"
        }
      ]
    }
  ],
  ambianceGallery: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80"
  ]
};

export const initialGallery = [
  { id: "g1", title: "Kings 99 Swimming Pool & Lawn Nashik", category: "Experiences", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80" },
  { id: "g2", title: "Private Pool Villa Exterior", category: "Villas", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80" },
  { id: "g3", title: "Garden Restaurant Evening Lights", category: "Dining", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80" },
  { id: "g4", title: "Royal Suite Bedroom Interiors", category: "Villas", url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80" },
  { id: "g5", title: "Party & Celebration Lawn Nashik", category: "Experiences", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80" }
];
