import { memo, useMemo } from 'react';
import Wannacry from "../../Assets/Images/Wannacry.svg";
import ModelViewer from "../ModelViewers/ModelViewerLogo";
import TextBlockWith3DBackground from "../Models/TextBlockWith3DBackground";

function Header() {
  const bottomImages = useMemo(() => [
    { src: Wannacry, alt: "Wannacry" },
    { src: Wannacry, alt: "Wannacry" },
    { src: Wannacry, alt: "Wannacry" },
  ], []);

  return (
    <header className="w-full relative  flex flex-col items-center justify-center px-4 py-10 pt-10 xl:pt-36">
      <div className="container mx-auto flex flex-col gap-6 lg:flex-row items-center justify-center  relative z-10 overflow-visible">
        {/* Логотип */}
        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end ">
          {/*<img
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain"
            alt="Logo"
            src={logo}
          />*/}
          <ModelViewer 
          modelPath="../Models/logo.glb" 
          useJSX={true}
        />
        </div>

        {/* Текстовый блок */}
        <TextBlockWith3DBackground />
      </div>

      {/* Нижние изображения */}
      <div className="w-full mt-56 lg:mt-30 flex flex-row justify-center items-center gap-4 md:gap-8 lg:gap-12 px-4">
        {bottomImages.map((imageData, index) => (
          <img
            key={index}
            className="w-full sm:w-1/3 max-w-sm md:max-w-md lg:max-w-lg object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            alt={imageData.alt}
            src={imageData.src}
          />
        ))}
      </div>

    </header>
  );
}

export default memo(Header);