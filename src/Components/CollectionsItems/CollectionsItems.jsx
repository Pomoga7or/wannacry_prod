import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import borderCard2 from "../../Assets/Images/borderCard2.svg";
import CollectionIntro from "../ModelViewers/CollectionIntro";
import { getСollections, getCollectionItems } from "../../api/articles";

// Проверка сенсорного устройства
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

// --- Компонент 3D-модели с улучшенной анимацией ---
function DynamicModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  useFrame((state) => {
    if (modelRef.current && !isMobile) {
      // Плавное вращение только на НЕ мобильных устройствах
      modelRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive 
      object={scene} 
      ref={modelRef} 
      scale={4} 
      position={[0, 0, 0]}
    />
  );
}

DynamicModel.preload = (modelPath) => useGLTF.preload(modelPath);

// --- Просмотр 3D модели для товаров ---
function ModelViewer({ modelPath }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true }}
      dpr={[1.5, 2]}
    >
      {/* Освещение */}
      <directionalLight
        position={[2, 2, 2]}
        intensity={2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-2, 1, 1]}
        intensity={1}
        color="#d4f8fe"
        decay={1}
      />
      <directionalLight
        position={[1, 0, -2]}
        intensity={1.5}
        color="#ffeb9e"
        decay={1}
      />
      <hemisphereLight
        skyColor="#b0e0e6"
        groundColor="#1e1e1e"
        intensity={0.7}
        position={[0, 2, 0]}
      />
      <hemisphereLight
        skyColor="#001122"
        groundColor="#000011"
        intensity={0.5}
      />
      <pointLight
        position={[0, 0, 3]}
        intensity={0.2}
        color="#9ff820"
        distance={10}
        decay={2}
      />

      <Suspense fallback={
        <Html center>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-[#9ff820] border-t-transparent rounded-full animate-spin mb-2"></div>
            <span className="text-[#9ff820] text-sm font-mono">ЗАГРУЗКА</span>
          </div>
        </Html>
      }>
        <DynamicModel modelPath={modelPath} />
      </Suspense>

      <OrbitControls 
        enableZoom={false} 
        autoRotate={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 0.5}
        minPolarAngle={Math.PI / 10}
      />
    </Canvas>
  );
}

// --- Футуристичная карточка товара ---
function ProductCard({ item }) {
  const cardRef = useRef();

  // Используем модель из данных Directus
  const modelPath = item.model_name 
    ? `/models/${item.model_name}.glb` 
    : "/models/vaseBubles.glb";

  return (
    <div 
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 flex flex-col h-full"
      style={{
        backdropFilter: 'blur(3px)',
        border: '50px solid transparent',
        borderImage: `url(${borderCard2}) 64 / 20px round space`,
      }}
    >
      {/* Блок с 3D-просмотром */}
      <div className="w-full h-56 md:h-72 lg:h-86 relative overflow-hidden">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#9ff820] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-[#9ff820] font-mono text-sm tracking-wider">ЗАГРУЗКА</p>
            </div>
          </div>
        }>
          <ModelViewer modelPath={modelPath} />
        </Suspense>
      </div>

      {/* Описание товара */}
      <div className="p-3 flex-1 space-y-4 relative">
        <h3 className="text-xl font-bold text-[#9ff820] font-mono tracking-wider transition-colors duration-300">
          {item.name}
        </h3>
        
        <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-100 transition-colors duration-300">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-[#d4e6b3] font-mono transition-colors duration-300">
            {item.price} ₽
          </span>
        </div>
      </div>
    </div>
  );
}


// --- Основной компонент с динамическими данными ---
export default function CollectionsItems() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Параллельная загрузка данных
        const [collectionsData, itemsResponse] = await Promise.all([
          getСollections(),
          getCollectionItems()
        ]);

        // Подготовка данных для отображения
        const collectionsWithItems = collectionsData.map(collection => {
          // Обработка position_intro_model
          let positionModel = [0, -1.55, 0]; // Значение по умолчанию
          if (collection.position_intro_model) {
            try {
              // Пытаемся распарсить JSON, если это строка
              positionModel = JSON.parse(collection.position_intro_model);
            } catch (e) {
              console.warn(`Некорректный формат position_intro_model для коллекции ${collection.id}:`, e);
              // Если не получается распарсить, используем значение по умолчанию
            }
          }
          
          // Формируем объект intro из данных коллекции
          const intro = collection.model_intro_name && collection.title_intro ? {
            modelPath: `/models/${collection.model_intro_name}.glb`,
            text: collection.title_intro,
            titleFont: collection.font_family || 'font-mono', // Исправлено с fontFamily на font_family
            textColor: '#9ff820',
            textSizeClass: "text-5xl md:text-6xl lg:text-6xl xl:text-9xl",
            positionModel: positionModel
          } : null;

          return {
            ...collection,
            intro: intro,
            items: itemsResponse.props.items.filter(item => 
              item.collection === collection.id && item.status === 'published'
            )
          };
        }).filter(collection => 
          collection.intro || collection.items.length > 0
        );

        setCollections(collectionsWithItems);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-mono text-xl">
        {error}
      </div>
    );
  }

  if (loading || collections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#9ff820] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9ff820] font-mono text-xl tracking-wider">ЗАГРУЗКА КОЛЛЕКЦИЙ</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-white z-20">
      {collections.map((collection) => (
        <React.Fragment key={collection.id}>
          {/* Вступительный экран */}
          {collection.intro && <CollectionIntro collection={collection} />}

          {/* Сетка товаров (только если есть товары) */}
          {collection.items.length > 0 && (
            <section
              className={`${collection.font_family || 'font-sans'} max-w-7xl mx-auto mb-32 px-4 py-16`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {collection.items.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Оптимизация загрузки моделей
CollectionsItems.preloadModels = () => {
  getСollections().then(collectionsData => {
    getCollectionItems().then(itemsResponse => {
      collectionsData.forEach(collection => {
        // Обработка position_intro_model для предзагрузки
        let positionModel = [0, -1.55, 0];
        if (collection.position_intro_model) {
          try {
            positionModel = JSON.parse(collection.position_intro_model);
          } catch (e) {
            // Используем значение по умолчанию
          }
        }
        
        // Предзагрузка intro-модели если она существует
        if (collection.model_intro_name) {
          const modelPath = `/models/${collection.model_intro_name}.glb`;
          // Здесь должна быть предзагрузка для ModelViewerStatuette
          // Но так как структура не предоставлена, оставим комментарий
        }
        
        // Предзагрузка моделей товаров
        const collectionItems = itemsResponse.props.items.filter(item => 
          item.collection === collection.id && item.status === 'published'
        );
        
        collectionItems.forEach(item => {
          if (item.model_name) {
            const modelPath = `/models/${item.model_name}.glb`;
            DynamicModel.preload(modelPath);
          }
        });
      });
    });
  });
};