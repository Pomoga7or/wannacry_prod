import React, { useRef, useEffect } from 'react';
import { useDirectusData } from '../../hooks/useDirectusData';

// Функция для определения сенсорного устройства
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

export default function TextBlockWith3DAnimation() {
  const textRef = useRef(null);
  const { headerText, loading, error } = useDirectusData();

  // Отслеживание движения курсора
  useEffect(() => {
    // Не добавляем анимацию на сенсорных устройствах
    if (isTouchDevice()) return;

    const handleMouseMove = (event) => {
      // Нормализуем координаты от -1 до 1
      const mousePosition = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
      
      // Применяем трансформацию к тексту
      if (textRef.current) {
        const rotateY = mousePosition.x * 5; // градусы
        const rotateX = mousePosition.y * 3; // градусы
        const translateX = mousePosition.x * 5; // пиксели
        const translateY = mousePosition.y * 3; // пиксели
        
        textRef.current.style.transform = `
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

  // Получаем content из headerText
  const getContent = () => {
    if (loading) {
      return 'Загрузка...';
    }
    
    if (error) {
      console.error('Error loading header text:', error);
      return 'ЭЙОУ. МЕНЯ ЗОВУТ САНЯ.<br/> ЗАНИМАЮСЬ 3D ПЕЧАТЬЮ БОЛЕЕ 11 ЛЕТ.';
    }

    // Извлекаем content из структуры headerText
    if (headerText?.props?.global?.content) {
      return headerText.props.global.content;
    }

    // Fallback текст
    return 'ЭЙОУ. МЕНЯ ЗОВУТ САНЯ.<br/> ЗАНИМАЮСЬ 3D ПЕЧАТЬЮ БОЛЕЕ 11 ЛЕТ.';
  };

  const content = getContent();

  return (
    <div className="w-full lg:w-3/5 flex justify-center lg:justify-start relative">
      {/* Текст с 3D анимацией */}
      <p 
        ref={textRef}
        className="text-[#9ff820] font-sans text-3xl md:text-4xl lg:text-4xl xl:text-5xl text-center lg:text-left leading-relaxed max-w-3xl z-10 relative transition-transform duration-300 ease-out"
        style={{ 
          transformStyle: 'preserve-3d'
        }}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
      />
    </div>
  );
}