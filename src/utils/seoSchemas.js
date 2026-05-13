const SITE_URL = "https://ikramrealestate.vercel.app/";

export const createLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Ikram Real Estate",
  url: SITE_URL,
  image: `${SITE_URL}/og-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "BD",
    addressLocality: "Barisal",
  },
  areaServed: "Bangladesh",
});

export const createProjectSchema = (project) => ({
  "@context": "https://schema.org",
  "@type": "Residence",
  name: project.title,
  description: project.description || project.overview,
  image: project.coverImage || project.image || project.images?.[0]?.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: project.location,
    addressCountry: "BD",
  },
});
