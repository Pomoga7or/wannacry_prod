// ModelViewerVase.jsx
import React, { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Анимированная модель
function AnimatedModel({ modelPath, isVisible, modelRef, isMobile, mousePosition }) {
  const { scene } = useGLTF(modelPath);
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      const time = clock.getElapsedTime();
      
      // Основная анимация вращения
      modelRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      modelRef.current.rotation.y = time * 0.5;
      modelRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;
      
      // Добавляем влияние курсора на вращение
      modelRef.current.rotation.y += mousePosition.x * 0.1;
      modelRef.current.rotation.x += mousePosition.y * 0.05;
      
      // Адаптивный масштаб
      const targetScale = isMobile ? 1.2 : 1.7;
      
      if (isVisible) {
        modelRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      } else {
        modelRef.current.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.1);
      }
    }
  });

  return (
    <primitive 
      ref={modelRef} 
      object={scene} 
      position={[0, 0, 0]}
      scale={0}
    />
  );
}

// Основной компонент
export default function ModelViewerVase({ modelPath }) {
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef();
  const modelRef = useRef();
  const textRef = useRef();

  // Определение типа устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Отслеживание видимости модели при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isVisible = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
      setIsModelVisible(isVisible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Отслеживание движения курсора
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
      setHasInteracted(true);
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        setMousePosition({
          x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(e.touches[0].clientY / window.innerHeight) * 2 + 1
        });
        setHasInteracted(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Анимация текста при появлении
  useEffect(() => {
    if (textRef.current && isModelVisible) {
      textRef.current.style.transform = 'translateY(0) scale(1)';
      textRef.current.style.opacity = '1';
    }
  }, [isModelVisible]);

  // Адаптивный размер текста
  const textSize = useMemo(() => {
    if (typeof window === 'undefined') return 150;
    
    const minSize = 150;
    const maxSize = 550;
    const minWidth = 320;
    const maxWidth = 1920;
    
    const width = window.innerWidth;
    const normalizedWidth = Math.min(Math.max(width, minWidth), maxWidth);
    
    return minSize + ((normalizedWidth - minWidth) / (maxWidth - minWidth)) * (maxSize - minSize);
  }, []);

  // Эффект параллакса для текста от мышки
  const textTransform = useMemo(() => {
    if (!hasInteracted) return {};
    
    const moveX = mousePosition.x * 20;
    const moveY = mousePosition.y * 15;
    
    return {
      transform: `translate(${moveX}px, ${moveY}px)`,
      transition: 'transform 0.2s ease-out'
    };
  }, [mousePosition, hasInteracted]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen min-h-[800px] relative overflow-hidden"
      style={{ margin: 0, padding: 0, boxSizing: 'border-box' }}
    >
      {/* Текст с глитч-эффектом и параллаксом */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="glitch-wrapper">
          <div 
            ref={textRef}
            className="glitch noise text-[#9FF820] font-sans tracking-[5px] transition-all duration-1000 ease-out"
            data-glitch="ВАЗЫ"
            style={{
              fontSize: `${textSize}px`,
              lineHeight: '1.2',
              opacity: 0,
              transform: 'translateY(100px) scale(0.8)',
              ...textTransform
            }}
          >
            ВАЗЫ
          </div>
        </div>
      </div>

      <div className="sticky top-0 w-full h-full">
        <Canvas
          gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
          }}
          camera={{
            position: [0, 0, 5],
            fov: 45,
            near: 0.1,
            far: 100,
          }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          style={{ background: 'transparent' }}
        >
          {/* Освещение с анимацией от курсора */}
          <ambientLight intensity={0.8} color="#ffffff" />
          <directionalLight 
            position={[mousePosition.x * 2, 5 + mousePosition.y, 5]} 
            intensity={1.2} 
            color="#ffffff" 
          />
          <pointLight 
            position={[2 + mousePosition.x, 2 + mousePosition.y, 2]} 
            intensity={0.8} 
            color="#9FF820" 
            distance={10} 
          />

          <Suspense fallback={null}>
            <AnimatedModel 
              modelPath={modelPath} 
              isVisible={isModelVisible} 
              modelRef={modelRef} 
              isMobile={isMobile}
              mousePosition={mousePosition}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}