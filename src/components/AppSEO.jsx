import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { projects } from "../data/projectsData";
import { siteData } from "../data/siteData";

const BASE_URL = "https://ikram-real-estate.vercel.app";

const seoByPath = {
  "/": {
    title: "Ikram Real Estate | Reliable Property Solutions in Bangladesh",
    description:
      "Ikram Real Estate helps families, investors, and businesses find reliable residential and commercial properties in Bangladesh.",
  },
  "/about": {
    title: "About Ikram Real Estate | Trusted Real Estate Company",
    description:
      "Learn about Ikram Real Estate, our story, values, mission, and commitment to reliable property services in Bangladesh.",
  },
  "/projects": {
    title: "Property Projects | Ikram Real Estate",
    description:
      "Explore selected residential and commercial property projects by Ikram Real Estate.",
  },
  "/gallery": {
    title: "Gallery | Ikram Real Estate",
    description:
      "View selected project visuals, property interiors, commercial spaces, and development images from Ikram Real Estate.",
  },
  "/contact": {
    title: "Contact Ikram Real Estate | Schedule a Visit",
    description:
      "Contact Ikram Real Estate for project details, property guidance, pricing information, or scheduled visits.",
  },
};

const setMetaTag = (name, content, attribute = "name") => {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const setCanonicalUrl = (url) => {
  let element = document.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
};

const AppSEO = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let seo = seoByPath[path];

    if (path.startsWith("/projects/")) {
      const slug = path.replace("/projects/", "");
      const project = projects.find((item) => item.slug === slug);

      if (project) {
        seo = {
          title: `${project.title} | Ikram Real Estate`,
          description: project.description,
        };
      }
    }

    if (!seo) {
      seo = {
        title: "Page Not Found | Ikram Real Estate",
        description:
          "The page you are looking for could not be found. Explore Ikram Real Estate projects or contact our team.",
      };
    }

    const canonicalUrl = `${BASE_URL}${path}`;

    document.title = seo.title;

    setMetaTag("description", seo.description);
    setMetaTag("og:title", seo.title, "property");
    setMetaTag("og:description", seo.description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:url", canonicalUrl, "property");
    setMetaTag("og:site_name", siteData.name, "property");

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", seo.title);
    setMetaTag("twitter:description", seo.description);

    setCanonicalUrl(canonicalUrl);
  }, [location.pathname]);

  return null;
};

export default AppSEO;
