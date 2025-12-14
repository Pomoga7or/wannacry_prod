import { useState, useEffect } from 'react';

const PRELOADER_KEY = 'cyber_preloader_complete';

export const usePreloader = () => {
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const wasPreloaded = localStorage.getItem(PRELOADER_KEY) === 'true';
    
    if (wasPreloaded) {
      // Если уже загружались ранее - пропускаем прелоадер
      setIsPreloaded(true);
      setIsLoading(false);
    } else {
      // Первый вход - показываем прелоадер
      setIsLoading(true);
    }
  }, []);

  const completePreloading = () => {
    setIsLoading(false);
    setIsPreloaded(true);
    localStorage.setItem(PRELOADER_KEY, 'true');
  };

  // Функция для сброса (для разработки)
  const resetPreloader = () => {
    localStorage.removeItem(PRELOADER_KEY);
    setIsPreloaded(false);
    setIsLoading(true);
  };

  return {
    isLoading,
    isPreloaded,
    completePreloading,
    resetPreloader
  };
};