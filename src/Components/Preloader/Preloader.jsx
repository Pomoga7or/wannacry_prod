import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// === Параметры: адаптивные под устройство ===
const getGridSize = () => {
  if (window.innerWidth <= 768) return { cols: 10, rows: 10 }; // Мобильные
  if (window.innerWidth <= 1024) return { cols: 14, rows: 14 }; // Планшеты
  return { cols: 20, rows: 20 }; // Десктоп
};

// === Кэширование результатов проверки производительности ===
let isLowEndDevice = null;

const checkPerformance = () => {
  if (isLowEndDevice !== null) return isLowEndDevice;

  const nav = navigator;
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 1; // в ГБ

  isLowEndDevice = cores <= 4 && memory <= 2;
  return isLowEndDevice;
};

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef();
  const cubesContainerRef = useRef();
  const [cubes] = useState(() => {
    const { cols, rows } = getGridSize();
    return Array.from({ length: rows }, (_, y) =>
      Array.from({ length: cols }, (_, x) => ({ x, y, id: `${y}-${x}` }))
    );
  });

  useEffect(() => {
    let tl;
    const { cols, rows } = getGridSize();

    const init = async () => {
      const isLowPerf = checkPerformance();

      // Начальное состояние
      gsap.set(preloaderRef.current, { opacity: 0 });
      preloaderRef.current.style.display = 'flex';

      // === GSAP Timeline ===
      tl = gsap.timeline({ 
        defaults: { ease: 'power1.out' },
        onComplete: () => {
          // Сохраняем состояние и вызываем колбэк
          setTimeout(() => {
            onComplete();
          }, 300);
        }
      });

      tl.to(preloaderRef.current, { opacity: 1, duration: 0.4 });
      tl.call(() => preloaderRef.current.classList.add('vhs-active'), null, '+=0.1');

      // === Анимация кубиков (на мощных устройствах) ===
      if (!isLowPerf) {
        const allCubes = cubesContainerRef.current?.children;
        if (allCubes) {
          gsap.set(allCubes, {
            transform: 'translateZ(-10px) rotateX(-90deg)',
            opacity: 0,
            backgroundColor: 'transparent',
          });

          cubes.forEach((row, rowIndex) => {
            const rowElements = row.map(
              (_, colIndex) => allCubes[rowIndex * cols + colIndex]
            );

            tl.to(rowElements, {
              transform: 'translateZ(0) rotateX(0) scale(1)',
              opacity: 0.75,
              backgroundColor: '#9FF820',
              borderColor: '#bfff40',
              duration: 0.15,
              stagger: 0.002,
              ease: 'back.out(1.6)',
            }, `+=${rowIndex === 0 ? 0 : 0.01}`);
          });
        }
      }

      // === Анимация центрального круга ===
      const centerX = cols / 2;
      const centerY = rows / 2;
      const radius = Math.min(cols, rows) * 0.3;

      const centerCubes = cubes.flat().filter(({ x, y }) => {
        const dx = x - centerX;
        const dy = y - centerY;
        return dx * dx + dy * dy <= radius * radius;
      });

      tl.to('[data-role="cube"]', {
        opacity: 0.1,
        borderColor: 'rgba(159, 248, 32, 0.1)',
        duration: 0.2,
      }, '-=0.4');

      const centerEls = centerCubes
        .map(({ id }) => document.getElementById(`cube-${id}`))
        .filter(Boolean);

      tl.fromTo(centerEls, {
        scale: 0, opacity: 0, boxShadow: '0 0 0 #9FF820'
      }, {
        scale: 1.7,
        opacity: 1,
        backgroundColor: '#a8ff50',
        boxShadow: '0 0 30px #9FF820',
        duration: 0.4,
        stagger: 0.008,
        ease: 'elastic.out(1.1, 0.6)',
      }, '-=0.2');

      tl.to(centerEls, {
        scale: 1.2,
        boxShadow: '0 0 20px #9FF820',
        backgroundColor: '#9FF820',
        duration: 0.3,
      });

      tl.call(() => preloaderRef.current.classList.remove('vhs-active'));

      // === ФИНАЛЬНОЕ ИСЧЕЗНОВЕНИЕ ===
      tl.to(preloaderRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          preloaderRef.current.style.display = 'none';
        },
      }).play();
    };

    init();

    return () => {
      if (tl) tl.kill();
    };
  }, [onComplete, cubes]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* VHS Overlay */}
      <div className="vhs-overlay absolute inset-0 pointer-events-none z-10"></div>
      <div className="scan-lines absolute inset-0 pointer-events-none z-20 opacity-30"></div>

      {/* Сетка кубов */}
      <div
        ref={cubesContainerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${getGridSize().cols}, ${12}px)`,
          gridTemplateRows: `repeat(${getGridSize().rows}, ${12}px)`,
          transformStyle: 'preserve-3d',
          perspective: '400px',
        }}
      >
        {cubes.flat().map(({ x, y, id }) => (
          <div
            key={id}
            id={`cube-${id}`}
            data-role="cube"
            style={{
              width: '12px',
              height: '12px',
              background: 'transparent',
              border: '1px solid rgba(159, 248, 32, 0.3)',
              boxSizing: 'border-box',
              transform: 'translateZ(0)',
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}