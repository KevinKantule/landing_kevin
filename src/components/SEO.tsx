import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
}

const defaultSEO: Required<SEOProps> = {
  title: 'Kevin Kantule | Software Developer | AI & Autonomous Agents',
  description:
    'Desarrollador de software especializado en IA, chatbots avanzados y agentes autónomos. Radicado en Panamá. Transforma ideas en sistemas inteligentes.',
  image: 'https://picsum.photos/seed/tech-profile/1200/630',
  url: 'https://kevinkantule.com',
  type: 'website',
  author: 'Kevin Kantule',
};

export const SEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  author,
}: SEOProps) => {
  const seoData = {
    title: title || defaultSEO.title,
    description: description || defaultSEO.description,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    type,
    author: author || defaultSEO.author,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="title" content={seoData.title} />
      <meta name="description" content={seoData.description} />
      <meta name="author" content={seoData.author} />
      <meta name="keywords" content="software developer, AI, chatbots, agentes autónomos, Panamá" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoData.type} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Kevin Kantule" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoData.url} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

      {/* Canonical */}
      <link rel="canonical" href={seoData.url} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="revisit-after" content="7 days" />

      {/* Viewport & Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#0c0e11" />

      {/* Language */}
      <meta httpEquiv="content-language" content="es-ES" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};
