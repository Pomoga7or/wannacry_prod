import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import Model from '../Models/logoModel.jsx';

// Проверка сенсорного устройства
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

// Хук для адаптивного масштаба в зависимости от ширины экрана
const useAdaptiveScale = () => {
  const [scale, setScale] = React.useState(12);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setScale(10); // Меньший масштаб на мобильных
      } else {
        setScale(12); // Стандартный масштаб на десктопе
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return scale;
};

// Компонент для отображения GLTF-модели по пути
function GLTFModel({ modelPath, mousePosition }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const scale = useAdaptiveScale();

  useFrame((state) => {
    if (modelRef.current) {
      if (isTouchDevice()) {
        // Лёгкая анимация только по X на сенсорных устройствах
        modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      } else {
        // Полная анимация на десктопе
        modelRef.current.rotation.y = mousePosition.current.x * 0.1;
        modelRef.current.rotation.x = mousePosition.current.y * -0.5;
        modelRef.current.position.x = mousePosition.current.x * 0.1;
        modelRef.current.position.y = mousePosition.current.y * -0.5;
      }
    }
  });

  return <primitive ref={modelRef} object={scene} scale={scale} />;
}

// Анимированная JSX-модель
function AnimatedModel({ mousePosition }) {
  const modelRef = useRef();
  const scale = useAdaptiveScale();

  useFrame((state) => {
    if (modelRef.current) {
      if (isTouchDevice()) {
        modelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      } else {
        modelRef.current.rotation.y = mousePosition.current.x * 0.1;
        modelRef.current.rotation.x = mousePosition.current.y * -0.1;
        modelRef.current.position.x = mousePosition.current.x * 0.1;
        modelRef.current.position.y = mousePosition.current.y * -0.1;
      }
    }
  });

  return <Model ref={modelRef} scale={scale} />;
}

// Основной компонент — просмотрщик 3D-модели
export default function ModelViewer({ modelPath, useJSX = true }) {
  const mousePosition = useRef({ x: 0, y: 0 });

  // Отслеживание движения мыши (только для несенсорных устройств)
  useEffect(() => {
    if (isTouchDevice()) return;

    const handleMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-96 overflow-visible">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[15, 15, 15]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-15, -15, -15]} intensity={0.5} color="#ffaa88" />

        <Suspense fallback={null}>
          {useJSX ? (
            <AnimatedModel mousePosition={mousePosition} />
          ) : (
            <GLTFModel modelPath={modelPath} mousePosition={mousePosition} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}