
// Debounce функция для оптимизации событий
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle функция для ограничения частоты вызовов
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Проверка производительности устройства
export const getDevicePerformance = () => {
  const nav = navigator;
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 4;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  let score = 0;
  
  // CPU
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;
  
  // RAM
  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 2;
  else score += 1;
  
  // Connection
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '4g') score += 2;
    else if (effectiveType === '3g') score += 1;
  }
  
  return {
    level: score >= 6 ? 'high' : score >= 4 ? 'medium' : 'low',
    cores,
    memory,
    connection: connection?.effectiveType || 'unknown'
  };
};

// Lazy load изображений
export const lazyLoadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Измерение Web Vitals
export const measureWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};