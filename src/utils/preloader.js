import { preloadDirectusData } from '../hooks/useDirectusData';

// Улучшенная функция предзагрузки для киберпрелоадера
export const preloadAllAssets = async () => {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
      return;
    }

    const preloadResources = async () => {
      try {
        // Предзагрузка критических изображений
        const criticalImages = [
          '/assets/images/borderCard2.svg',
        ];

        const imagePromises = criticalImages
          .filter(src => src) // Фильтруем пустые значения
          .map(src => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = resolve; // Продолжаем даже при ошибках
              img.src = src;
            });
          });

        // Предзагрузка шрифтов
        const fontPromises = document.fonts ? [document.fonts.ready] : [Promise.resolve()];

        // Предзагрузка данных из Directus
        const dataPromise = preloadDirectusData();
        
        // Ждем DOM
        const domPromise = new Promise(resolve => {
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
          } else {
            resolve();
          }
        });

        // Ожидаем все критические ресурсы параллельно
        await Promise.all([
          ...imagePromises,
          ...fontPromises,
          dataPromise,
          domPromise
        ]);

        // Минимальное время для анимации прелоадера
        setTimeout(resolve, 800);
        
      } catch (error) {
        console.error('Preload error:', error);
        // В случае ошибок все равно продолжаем
        setTimeout(resolve, 800);
      }
    };

    // Запускаем предзагрузку с таймаутом
    const timeoutPromise = new Promise(resolve => {
      setTimeout(resolve, 4000); // Максимум 4 секунды
    });

    Promise.race([preloadResources(), timeoutPromise]).then(resolve);
  });
};

// Для разработки - сброс прелоадера
export const resetPreloader = () => {
  localStorage.removeItem('cyber_preloader_complete');
};