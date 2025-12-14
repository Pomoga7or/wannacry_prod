import './App.css';
import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Preloader from './Components/Preloader/Preloader';
import { preloadAllAssets } from './utils/preloader';
import { useShouldPauseFaultyTerminal } from './hooks/useScreenSize';
import { usePreloader } from './hooks/usePreloader';

// Lazy load heavy components
const Home = lazy(() => import('./Components/Home'));
const NotFound = lazy(() => import('./Components/404'));
const FaultyTerminal = lazy(() => import('./Components/FaultyTerminal'));

// Добавляем глобальную функцию для сброса прелоадера в development
if (process.env.NODE_ENV === 'development') {
  window.resetPreloader = () => {
    localStorage.removeItem('cyber_preloader_complete');
    window.location.reload();
  };
}

export default function App() {
  const { isLoading, isPreloaded, completePreloading } = usePreloader();
  const shouldPauseFaultyTerminal = useShouldPauseFaultyTerminal();

  // Загрузка всех ресурсов (прелоадер)
  useEffect(() => {
    if (!isPreloaded && isLoading) {
      const loadFullSite = async () => {
        // Запускаем предзагрузку ресурсов
        await preloadAllAssets();
        // Запускаем анимацию прелоадера
        // Колбэк onComplete в Preloader вызовет completePreloading
      };
      loadFullSite();
    }
  }, [isPreloaded, isLoading]);

  // Показываем прелоадер только при первой загрузке
  if (isLoading && !isPreloaded) {
    return <Preloader onComplete={completePreloading} />;
  }

  return (
    <Router>
      <div className="App overflow-hidden relative min-h-screen">
        {/* Фон */}
        <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '120vw', height: '120vh', zIndex: -1 }}>
            <FaultyTerminal
              scale={4}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={1}
              pause={shouldPauseFaultyTerminal}
              scanlineIntensity={1}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={1}
              curvature={0.2}
              tint="#a7ef9e"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation={false}
              brightness={0.125}
            />
          </div>
        </Suspense>

        {/* Контент с роутингом */}
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-[#9FF820] font-pressStart text-sm">Loading...</div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}