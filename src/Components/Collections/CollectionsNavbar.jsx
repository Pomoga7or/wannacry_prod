// src/components/CollectionsNavbar.jsx
import { useState, useRef, useEffect } from 'react';
import { useDirectusData } from '../../hooks/useDirectusData';
import { collections as fallbackCollections } from '../../Data/collectionsData'; // Fallback данные

const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

function CollectionItem({ collection, activeCollection, setActiveCollection }) {
  const itemRef = useRef(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const handleMouseMove = (event) => {
      const mousePosition = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };

      if (itemRef.current) {
        const rotateY = mousePosition.x * 3;
        const rotateX = mousePosition.y * 2;
        const translateX = mousePosition.x * 5;
        const translateY = mousePosition.y * 3;

        itemRef.current.style.transform = `
          perspective(1000px)
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
        `;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={itemRef}
      className="group relative overflow-hidden rounded-md transition-all duration-500 hover:scale-105 hover:z-10 h-20 md:h-32 lg:h-40"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={() => !isTouchDevice() && setActiveCollection(collection.id)}
      onMouseLeave={() => !isTouchDevice() && setActiveCollection(null)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `url(${collection.image || collection.imageUrl})`,
          filter: 'blur(4px) brightness(0.7)',
        }}
      />
      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity duration-300" />
      <div className="relative h-full flex items-center justify-center p-4">
        <div
          className={`${collection.fontFamily} text-[#F0F0F0] text-center z-10 transform transition-all duration-500 group-hover:scale-105 group-hover:opacity-0`}
          style={{
            fontSize: 'clamp(2rem, 2.2vw, 4rem)',
            lineHeight: '1.1'
          }}
        >
          {collection.title}
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 bg-[#D4E6B3] bg-opacity-70 text-[#333333] p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500`}
      >
        <p className="text-sm md:text-base">{collection.description}</p>
      </div>
    </div>
  );
}

export default function CollectionsNavbar() {
  const [activeCollection, setActiveCollection] = useState(null);
  const titleRef = useRef(null);
  const navRef = useRef(null);
  
  // Получаем данные из Directus
  const { collections: directusCollections, loading, error } = useDirectusData();

  // Формируем коллекции из Directus или используем fallback
  const getCollections = () => {
    if (loading) {
      return []; // Пустой массив во время загрузки
    }

    if (error) {
      console.error('Error loading collections:', error);
      return fallbackCollections; // Используем fallback при ошибке
    }

    // Если есть данные из Directus, используем их
    if (directusCollections && Array.isArray(directusCollections) && directusCollections.length > 0) {
      // Маппим данные из Directus в нужный формат
      return directusCollections.map((item, index) => ({
        id: item.id || index + 1,
        title: item.title || 'Без названия',
        fontFamily: item.fontFamily || item.font_family || 'font-sans',
        image: item.image ? `https://directus.wannacry.shop/assets/${item.image}` : null,
        imageUrl: item.image ? `https://directus.wannacry.shop/assets/${item.image}` : fallbackCollections[index]?.imageUrl,
        description: item.description || 'Описание отсутствует',
      }));
    }

    // Используем fallback если нет данных
    return fallbackCollections;
  };

  const collections = getCollections();

  // Эффект для анимации заголовка и сетки (только на десктопе)
  useEffect(() => {
    if (isTouchDevice()) return;

    const handleMouseMove = (event) => {
      const mousePosition = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };

      if (titleRef.current) {
        const rotateY = mousePosition.x * 3;
        const rotateX = mousePosition.y * 2;
        const translateX = mousePosition.x * 10;
        const translateY = mousePosition.y * 5;

        titleRef.current.style.transform = `
          perspective(1000px)
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
        `;
      }

      if (navRef.current) {
        const rotateY = mousePosition.x * 3;
        const rotateX = mousePosition.y * 2;
        const translateX = mousePosition.x * 10;
        const translateY = mousePosition.y * 5;

        navRef.current.style.transform = `
          perspective(1000px)
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
          translateX(${translateX}px)
          translateY(${translateY}px)
        `;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full p-4 md:p-6 lg:p-8 my-40 relative">
      <div className="text-center mb-8 md:mb-12 lg:mb-16">
        <h1
          ref={titleRef}
          className="font-sans text-[#9ff820] text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl transition-transform duration-300 ease-out"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Коллекции
        </h1>
      </div>

      <div
        ref={navRef}
        style={{ transformStyle: 'preserve-3d' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-6 max-w-7xl mx-auto"
      >
        {loading ? (
          <div className="col-span-full text-center text-[#9FF820] font-pressStart text-sm py-20">
            Загрузка коллекций...
          </div>
        ) : collections.length > 0 ? (
          collections.map((collection) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              activeCollection={activeCollection}
              setActiveCollection={setActiveCollection}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-[#9FF820] font-pressStart text-sm py-20">
            Коллекции не найдены
          </div>
        )}
      </div>
    </div>
  );
}