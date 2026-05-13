import project1 from "../assets/images/hero/hero-1.webp";
import project2 from "../assets/images/hero/hero-2.webp";
import project3 from "../assets/images/hero/hero-3.webp";

export const projects = [
  {
    id: 1,
    slug: "ikram-heights",
    title: "Ikram Heights",
    location: "Barisal Sadar, Barisal",
    type: "Residential Apartment",
    status: "ongoing",
    statusText: "Ongoing",
    price: "Starting from ৳68 Lac",
    size: "1,250 - 1,650 sq ft",
    beds: "3",
    baths: "3",
    parking: "Available",
    completion: "2026",
    image: project1,
    gallery: [project1, project2, project3],
    description:
      "A modern residential project designed for families who want comfort, security, and premium living in a prime location.",
    overview:
      "Ikram Heights is planned for families who want a comfortable and secure living experience in Barisal. The project focuses on practical apartment layouts, natural light, modern facilities, and long-term value.",
    features: [
      "Prime residential location",
      "Modern apartment layouts",
      "Secure building access",
      "Parking facility",
      "Quality construction materials",
      "Family-friendly environment",
    ],
    amenities: [
      "Lift",
      "Generator backup",
      "Security monitoring",
      "Parking",
      "Community space",
      "Modern lobby",
    ],
    isFeatured: true,
  },
  {
    id: 2,
    slug: "ikram-garden-view",
    title: "Ikram Garden View",
    location: "Nathullabad, Barisal",
    type: "Family Apartment",
    status: "upcoming",
    statusText: "Upcoming",
    price: "Starting from ৳58 Lac",
    size: "1,100 - 1,450 sq ft",
    beds: "3",
    baths: "2",
    parking: "Available",
    completion: "2027",
    image: project2,
    gallery: [project2, project1, project3],
    description:
      "A thoughtfully planned apartment project with functional layouts, natural light, and easy access to city facilities.",
    overview:
      "Ikram Garden View is designed for families looking for a balanced lifestyle with practical apartment sizes, convenient city access, and a calm residential feel.",
    features: [
      "Functional apartment planning",
      "Good ventilation and daylight",
      "Easy city connectivity",
      "Reliable construction planning",
      "Family-focused design",
      "Value-focused investment option",
    ],
    amenities: [
      "Lift",
      "Security",
      "Parking",
      "Water supply",
      "Generator support",
      "Open circulation space",
    ],
    isFeatured: true,
  },
  {
    id: 3,
    slug: "ikram-commercial-square",
    title: "Ikram Commercial Square",
    location: "C&B Road, Barisal",
    type: "Commercial Space",
    status: "available",
    statusText: "Available",
    price: "Contact for Price",
    size: "450 - 1,200 sq ft",
    beds: "N/A",
    baths: "Shared",
    parking: "Limited",
    completion: "Ready",
    image: project3,
    gallery: [project3, project1, project2],
    description:
      "Premium commercial spaces for businesses looking for visibility, accessibility, and long-term value.",
    overview:
      "Ikram Commercial Square offers practical commercial spaces for offices, showrooms, and service businesses that need visibility and accessibility in a growing location.",
    features: [
      "High-visibility commercial location",
      "Flexible unit sizes",
      "Suitable for office or showroom",
      "Practical floor planning",
      "Good accessibility",
      "Business-focused environment",
    ],
    amenities: [
      "Lift",
      "Security",
      "Common washroom",
      "Utility support",
      "Road access",
      "Commercial frontage",
    ],
    isFeatured: true,
  },
];

export const featuredProjects = projects.filter(
  (project) => project.isFeatured,
);

export const projectFilters = [
  { label: "All Projects", value: "all" },
  { label: "Ongoing", value: "ongoing" },
  { label: "Available", value: "available" },
  { label: "Upcoming", value: "upcoming" },
];

export const homeServices = [
  {
    title: "Verified Properties",
    description:
      "Every listed property is carefully reviewed so clients can make confident and safe investment decisions.",
  },
  {
    title: "Prime Locations",
    description:
      "We focus on practical, high-demand locations with strong connectivity and long-term value.",
  },
  {
    title: "Transparent Pricing",
    description:
      "Clear project information, honest communication, and no unnecessary confusion during the buying process.",
  },
  {
    title: "Client Support",
    description:
      "From first inquiry to final handover, our team supports clients with care and professionalism.",
  },
];
