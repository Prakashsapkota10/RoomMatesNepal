import type { RoomListingRow, RoommateRequestRow } from "./types";

/**
 * Mock room listing rows for /admin/listings — Rooms tab.
 * TODO: Replace with: await db.listing.findMany({ ...pagination, ...filters })
 */
export const MOCK_ROOM_LISTINGS: RoomListingRow[] = [
  {
    kind: "room",
    id: "l1",
    title: "Modern Studio with Balcony in New Baneshwor",
    image: "https://images.unsplash.com/photo-1522771739289-72998db70261?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1522771739289-72998db70261?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    listedAgo: "Listed 2h ago",
    ownerName: "Priya Sharma",
    ownerVerified: true,
    ownerVerifiedDate: "Dec 12, 2023",
    location: "New Baneshwor, KTM",
    city: "Kathmandu",
    rent: 18500,
    status: "pending",
    amenities: ["High-speed WiFi", "Air Conditioning", "Bike Parking", "Kitchen Access"],
    description:
      "Bright and spacious studio apartment located in the heart of New Baneshwor. Features a private balcony with mountain views, attached bathroom, and shared laundry facilities. Perfect for students or working professionals. Utilities are excluded from the rent.",
  },
  {
    kind: "room",
    id: "l2",
    title: "Shared Apartment near Lakeside",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    ],
    listedAgo: "Listed 5h ago",
    ownerName: "Anish Gurung",
    ownerVerified: false,
    ownerVerifiedDate: "",
    location: "Lakeside, Pokhara",
    city: "Pokhara",
    rent: 12000,
    status: "reported",
    amenities: ["High-speed WiFi", "Bike Parking"],
    description:
      "Shared apartment a short walk from Lakeside with two other tenants. Common kitchen and living room, private bedroom with lock. Reported by a user for listing photos that don't match the actual unit — pending review.",
  },
  {
    kind: "room",
    id: "l3",
    title: "Luxury Two-Bedroom Flat in Jhamsikhel",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    ],
    listedAgo: "Listed 1d ago",
    ownerName: "Rajesh Hamal",
    ownerVerified: true,
    ownerVerifiedDate: "Nov 28, 2023",
    location: "Jhamsikhel, Lalitpur",
    city: "Lalitpur",
    rent: 25000,
    status: "approved",
    amenities: ["High-speed WiFi", "Air Conditioning", "Bike Parking", "Kitchen Access"],
    description:
      "Fully furnished two-bedroom flat in the trendy Jhamsikhel neighborhood. Modern kitchen, dedicated parking, and 24/7 water supply. Close to cafes, gyms, and the international school.",
  },
  {
    kind: "room",
    id: "l4",
    title: "Cozy Single Room in Kirtipur",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80"],
    listedAgo: "Listed 3d ago",
    ownerName: "Sunita Thapa",
    ownerVerified: true,
    ownerVerifiedDate: "Oct 3, 2023",
    location: "Kirtipur, KTM",
    city: "Kathmandu",
    rent: 6500,
    status: "expired",
    amenities: ["High-speed WiFi"],
    description:
      "Budget-friendly single room close to Kirtipur campus. Shared bathroom and kitchen. Listing has expired and needs the owner to renew before it goes live again.",
  },
  {
    kind: "room",
    id: "l5",
    title: "Furnished Room in Maharajgunj",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    listedAgo: "Listed 4d ago",
    ownerName: "Bikash Shrestha",
    ownerVerified: false,
    ownerVerifiedDate: "",
    location: "Maharajgunj, KTM",
    city: "Kathmandu",
    rent: 14000,
    status: "rejected",
    amenities: ["High-speed WiFi", "Kitchen Access"],
    description:
      "Rejected — submitted photos were inconsistent with the listed address and the owner could not be verified. Awaiting resubmission with valid documents.",
  },
];

/**
 * Mock roommate request rows for /admin/listings — Roommate Requests tab.
 * TODO: Replace with: await db.roommatePost.findMany({ ...pagination, ...filters })
 */
export const MOCK_ROOMMATE_REQUESTS: RoommateRequestRow[] = [
  {
    kind: "roommate",
    id: "rm1",
    title: "Looking for a quiet non-smoker roommate near Baneshwor",
    image: "https://images.unsplash.com/photo-1522771739289-72998db70261?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1522771739289-72998db70261?w=800&q=80"],
    listedAgo: "Listed 1h ago",
    requesterName: "Sabina Rai",
    requesterVerified: true,
    requesterVerifiedDate: "Jan 5, 2024",
    location: "Baneshwor, KTM",
    city: "Kathmandu",
    budget: 10000,
    status: "pending",
    preferences: ["Non-smoker", "Early Bird", "Vegetarian"],
    description:
      "Software engineer looking for a clean, quiet roommate to share a 2BHK near New Baneshwor. Move-in ready from next month. Prefers someone with a similar schedule.",
  },
  {
    kind: "roommate",
    id: "rm2",
    title: "Student seeking roommate in Pulchowk",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
    listedAgo: "Listed 6h ago",
    requesterName: "Bikash Maharjan",
    requesterVerified: false,
    requesterVerifiedDate: "",
    location: "Pulchowk, Lalitpur",
    city: "Lalitpur",
    budget: 8000,
    status: "reported",
    preferences: ["Student Friendly", "Pet Friendly"],
    description:
      "Reported for posting duplicate content across multiple listings. Pending moderator review before this request is visible again.",
  },
  {
    kind: "roommate",
    id: "rm3",
    title: "Working professional looking for shared flat, Lakeside",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"],
    listedAgo: "Listed 1d ago",
    requesterName: "Anita Gurung",
    requesterVerified: true,
    requesterVerifiedDate: "Sep 20, 2023",
    location: "Lakeside, Pokhara",
    city: "Pokhara",
    budget: 12000,
    status: "approved",
    preferences: ["Non-smoker", "Gym Enthusiast"],
    description:
      "Marketing professional relocating to Pokhara, looking for a tidy roommate in a shared 2BHK near Lakeside. Flexible on move-in date.",
  },
];
