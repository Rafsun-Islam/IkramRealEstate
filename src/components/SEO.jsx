import { Helmet } from "react-helmet-async";

const SITE_NAME = "Ikram Real Estate";
const SITE_URL = "https://ikramrealestate.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULT_DESCRIPTION =
  "Ikram Real Estate provides reliable residential and commercial property solutions with trusted guidance, project information, and client-first support.";

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  structuredData,
}) => {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Reliable Property Solutions`;

  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
