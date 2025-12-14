// Home.js
import { lazy, Suspense } from 'react';
import SEO from './SEO/SEO';

const Header = lazy(() => import('./Header/Header'));
const CollectionsNavbar = lazy(() => import('./Collections/CollectionsNavbar'));
const CollectionsItems = lazy(() => import('./CollectionsItems/CollectionsItems'));
const Footer = lazy(() => import('./Footer/Footer'));

const Home = () => {
  const siteUrl = "https://wannacry.shop";
  const businessName = "WANNACRY | 3D печать и моделирование";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessName,
    "url": siteUrl,
    "sameAs": [
      "https://vk.com/wannacrygroup?from=groups",
      "https://t.me/wannacryportfolio",
      "https://yandex.ru/maps/org/wannacry/..."
    ],
    "logo": `${siteUrl}/logo.png`,
    "image": `${siteUrl}/og-image.jpg`,
    "description": "Профессиональная 3D печать и моделирование в Воронеже. Быстрая доставка. Расчет стоимости онлайн.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Воронеж",
      "addressRegion": "Воронежская область",
      "postalCode": "394000",
      "addressCountry": "RU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "51.660781",
      "longitude": "39.200296"
    },
    "email": "mailto:wannacryme@yandex.ru",
    "areaServed": "Воронеж и область",
    "serviceType": "Печать на 3D принтере, 3D моделирование",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      }
    ],
    "paymentAccepted": "Наличные, банковская карта, перевод",
    "priceRange": "₽–₽₽₽",
    "availableChannel": {
      "@type": "ServiceChannel",
      "servicePhone": {
        "@type": "ContactPoint"
      }
    }
  };

  return (
    <>
      <SEO
        description="Профессиональная 3D печать в Воронеже. Создание прототипов, деталей, сувениров любой сложности. Быстрая доставка. Технологии FDM, SLA. Расчет стоимости онлайн."
        keywords="3d печать воронеж, 3д печать на заказ, создание прототипов, 3d моделирование, печать деталей, fdm печать, срочная 3d печать"
        canonical="/"
        ogImage={`${siteUrl}/og-image.jpg`}
        structuredData={structuredData}
      />
      
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-[#9FF820] font-pressStart text-sm animate-pulse">Loading...</div>
        </div>
      }>
        <Header />
        <CollectionsNavbar />
        <CollectionsItems />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;