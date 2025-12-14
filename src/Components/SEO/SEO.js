import { Helmet } from 'react-helmet';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage,
  ogType = 'website',
  structuredData 
}) => {
  const siteTitle = "WANNACRY | 3D печать на заказ в Воронеже";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = "https://wannacry.shop";
  
  return (
    <Helmet>
      {/* Базовые мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Каноническая ссылка */}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={`${siteUrl}${canonical || '/'}`} />
      <meta property="og:image" content={ogImage || `${siteUrl}/og-image.jpg`} />
      <meta property="og:site_name" content="WANNACRY" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || `${siteUrl}/og-image.jpg`} />
      
      {/* Schema.org структурированные данные */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;