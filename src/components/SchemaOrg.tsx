import { Helmet } from 'react-helmet-async';

/**
 * Schema.org JSON-LD structured data
 * Helps Google understand your content better
 */
export const SchemaOrg = () => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kevin Kantule',
    url: 'https://kevinkantule.com',
    image: 'https://picsum.photos/seed/tech-profile/800/800',
    sameAs: [
      'https://www.linkedin.com/in/kevinkantule/',
      'https://github.com/KevinKantule',
    ],
    jobTitle: 'Software Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Independent Contractor',
    },
    knowsAbout: [
      'Artificial Intelligence',
      'Chatbots',
      'Autonomous Agents',
      'Android Development',
      'Software Architecture',
    ],
    description: 'Software Developer specialized in AI, advanced chatbots, and autonomous agents',
    email: 'kevin.kantule@gmail.com',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Kevin Kantule',
    url: 'https://kevinkantule.com',
    logo: 'https://picsum.photos/seed/tech-profile/800/800',
    description: 'Software development and AI consulting',
    sameAs: [
      'https://www.linkedin.com/in/kevinkantule/',
      'https://github.com/KevinKantule',
    ],
    contact: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'kevin.kantule@gmail.com',
      areaServed: 'PA',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kevin Kantule Portfolio',
    url: 'https://kevinkantule.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kevinkantule.com?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
};
