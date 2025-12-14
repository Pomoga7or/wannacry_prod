// ModelViewerStatuette.jsx
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';


// Анимированная модель
function AnimatedModel({ modelPath, isVisible, modelRef, mousePosition, position = [0, 0, 0] }) {
  const { scene } = useGLTF(modelPath);

  useFrame(({ clock }) => {
    if (modelRef.current) {
      const time = clock.getElapsedTime();

      modelRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      modelRef.current.rotation.y = time * 0.5 + mousePosition.x * 0.5;
      modelRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;

      const targetScale = window.innerWidth <= 768 ? 1.2 : 1.7;
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
      position={position}
      scale={0}
    />
  );
}

// === ОСНОВНОЙ КОМПОНЕНТ ===
export default function ModelViewerStatuette({
  modelPath,
  title,
  titleFont,
  textColor,
  positionModel,
  textSizeClass = "text-5xl md:text-6xl lg:text-6xl xl:text-9xl", // теперь работает!
}) {
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef();
  const modelRef = useRef();
  const textRef = useRef();

  // Отслеживание видимости
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const isVisible =
        rect.top < window.innerHeight * 0.8 &&
        rect.bottom > window.innerHeight * 0.2;
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

  // Движение мыши/пальца
  useEffect(() => {
    const handleMove = (e) => {
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const clientY = e.clientY ?? e.touches?.[0]?.clientY;
      if (clientX && clientY) {
        setMousePosition({
          x: (clientX / window.innerWidth) * 2 - 1,
          y: -(clientY / window.innerHeight) * 2 + 1,
        });
        setHasInteracted(true);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  // Параллакс (опционально)
  const textTransform = hasInteracted
    ? { transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 15}px)` }
    : {};

  return (
    <div
      ref={containerRef}
      className="w-full h-screen min-h-[800px] relative overflow-hidden"
      style={{ margin: 0, padding: 0 }}
    >
      {/* Текст */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h1
          ref={textRef}
          className={`glitch noise uppercase tracking-wider transition-all duration-1000 ${titleFont} ${textSizeClass}`}
          data-glitch={title.toUpperCase()}
          style={{
            color: textColor,
            opacity: isModelVisible ? 1 : 0,
            transform: isModelVisible
              ? 'translateY(0) scale(1)'
              : 'translateY(100px) scale(0.8)',
            ...textTransform,
          }}
        >
          {title.toUpperCase()}
        </h1>
      </div>

      {/* 3D Canvas */}
      <div className="sticky top-0 w-full h-full">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[mousePosition.x * 2, 5 + mousePosition.y, 5]}
            intensity={1.2}
            color="#fff"
          />
          <pointLight
            position={[2 + mousePosition.x, 2 + mousePosition.y, 2]}
            intensity={0.8}
            color={textColor}
            distance={10}
          />

          <Suspense fallback={null}>
            <AnimatedModel
              modelPath={modelPath}
              isVisible={isModelVisible}
              modelRef={modelRef}
              mousePosition={mousePosition}
              position={positionModel}
            />
            {isModelVisible && (
              <>
              </>
            )}
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}