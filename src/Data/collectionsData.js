import vase1 from "../Assets/Images/vase1.jpg";
import vase2 from "../Assets/Images/vase2.jpg";
import vase3 from "../Assets/Images/vase3.jpg";
import vase4 from "../Assets/Images/vase4.jpg";
import vase5 from "../Assets/Images/vase5.jpg";
import vase6 from "../Assets/Images/vase6.jpg";


export const collections = [
  {
    id: 1,
    title: "вазы",
    fontFamily: "font-sans",
    fontSize: "text-5xl md:text-6xl lg:text-6xl xl:text-7xl",
    imageUrl: `${vase1}`,
    description: "Элегантные вазы ручной работы различных форм и размеров",
    subtitle: "ПОДБЕРИТЕ ИДЕАЛЬНОЕ РЕШЕНИЕ ДЛЯ ВАШЕГО ИНЬТЕРЬЕРА",
    fontSizeSubtitle: "text-2xl md:text-3xl lg:text-4xl xl:text-4xl",
    // --- ВСТУПИТЕЛЬНЫЙ ЭКРАН ---
    intro: {
      modelPath: "/models/modelVase.glb",     // модель для анимации
      text: "вазы",                            // текст на экране
      titleFont: "font-sans",                  // шрифт
      textColor: "#9FF820",
      textSizeClass: "text-7xl md:text-8xl lg:text-8xl xl:text-9xl", 
      effect: "glitch",
      positionModel: [0, 0, 0],                // эффект (опционально)
    },
    images: [
      { src: vase1, alt: "Vase design 1", col: 1, row: 1 },
      { src: vase2, alt: "Vase design 2", col: 2, row: 1 },
      { src: vase3, alt: "Vase design 3", col: 3, row: 2 },
      { src: vase4, alt: "Vase design 4", col: 1, row: 3 },
    ],
    items: [
      {
        id: 101,
        name: "Minimalist Vase",
        description: "A sleek, modern ceramic vase with smooth curves.",
        price: "$45.00",
        modelPath: "/models/vaseBubles.glb", // Путь к .glb или .gltf файлу
        col: 1,
        row: 1
      },
      {
        id: 102,
        name: "Rustic Pot",
        description: "Handcrafted terracotta pot with organic texture.",
        price: "$38.00",
        modelPath: "/models/vaseGoldjy.glb",
        col: 2,
        row: 1
      },
      {
        id: 103,
        name: "Art Deco Vase",
        description: "Geometric design inspired by the 1920s.",
        price: "$65.00",
        modelPath: "/models/vasePeak.glb",
        col: 1,
        row: 2
      },
      {
        id: 104,
        name: "Wave Sculpture",
        description: "Fluid form mimicking ocean waves.",
        price: "$72.00",
        modelPath: "/models/vaseStone.glb",
        col: 2,
        row: 2
      }
    ]
  },
  {
    id: 2,
    title: "бюсты",
    fontFamily: "font-bogeda",
    fontSize: "text-5xl md:text-6xl lg:text-4xl xl:text-7xl",
    imageUrl: `${vase2}`,
    description: "Детализированные бюсты известных личностей и персонажей",
    // Добавленные поля из defaultGalleries
    subtitle: "Детализированные бюсты известных личностей и персонажей",
    fontSizeSubtitle: "text-2xl md:text-3xl lg:text-4xl xl:text-4xl",

    images: [
      { src: vase1, alt: "Vase design 1", col: 1, row: 1 },
      { src: vase2, alt: "Vase design 2", col: 2, row: 1 },
      { src: vase3, alt: "Vase design 3", col: 3, row: 2 },
      { src: vase4, alt: "Vase design 4", col: 1, row: 3 },]
  },
  {
    id: 3,
    title: "фигурки",
    fontFamily: "font-pressStart",
    fontSize: "text-xl md:text-3xl lg:text-3xl xl:text-4xl",
    imageUrl: `${vase3}`,
    description: "Коллекционные фигурки для настоящих ценителей",
    // Добавленные поля из defaultGalleries
    subtitle: "Коллекционные фигурки для настоящих ценителей",
    fontSizeSubtitle: "text-2xl md:text-3xl lg:text-4xl xl:text-4xl",
    intro: {
      modelPath: "/models/donald-duck.glb",     // модель для анимации
      text: "фигурки",                            // текст на экране
      titleFont: "font-pressStart",
      textSizeClass: "text-5xl md:text-6xl lg:text-8xl xl:text-9xl", // шрифт
      textColor: "#9FF820",                    // цвет текста
      effect: "glitch",
      positionModel: [0, -1.55, 0],                    // эффект (опционально)
    },

    images: [
      { src: vase1, alt: "Vase design 1", col: 1, row: 1 },
      { src: vase2, alt: "Vase design 2", col: 2, row: 1 },
      { src: vase3, alt: "Vase design 3", col: 3, row: 2 },
      { src: vase4, alt: "Vase design 4", col: 1, row: 3 },]
  },
  {
    id: 4,
    title: "ништяки",
    fontFamily: "font-space",
    fontSize: "text-xl md:text-2xl lg:text-3xl xl:text-3xl",
    imageUrl: `${vase4}`,
    description: "Забавные и необычные модели для поднятия настроения",
    // Добавленные поля из defaultGalleries
    subtitle: "Забавные и необычные модели для поднятия настроения",
    fontSizeSubtitle: "text-2xl md:text-3xl lg:text-4xl xl:text-4xl",

    images: [
      { src: vase1, alt: "Vase design 1", col: 1, row: 1 },
      { src: vase2, alt: "Vase design 2", col: 2, row: 1 },
      { src: vase3, alt: "Vase design 3", col: 3, row: 2 },
      { src: vase4, alt: "Vase design 4", col: 1, row: 3 },]
  },
  {
    id: 5,
    title: "II + NATURA",
    fontFamily: "font-quantum",
    fontSize: "text-2xl md:text-2xl lg:text-3xl xl:text-4xl",
    imageUrl: `${vase5}`,
    description: "Экологичные модели, вдохновленные природой",
    // Добавленные поля из defaultGalleries
    subtitle: "найдите сочетание в несочетаемом",
    fontSizeSubtitle: "text-2xl md:text-3xl lg:text-4xl xl:text-4xl",
    images: [
      { src: vase1, alt: "Vase design 1", col: 1, row: 1 },
      { src: vase2, alt: "Vase design 2", col: 3, row: 1 },
      { src: vase3, alt: "Vase design 3", col: 2, row: 3 },
      { src: vase4, alt: "Vase design 4", col: 1, row: 2 },
    ]
  },
  {
    id: 6,
    title: "запчасти",
    fontFamily: "font-robot",
    fontSize: "text-2xl md:text-3xl lg:text-4xl xl:text-3xl",
    imageUrl: `${vase6}`,
    description: "Функциональные детали и запчасти для различных устройств",
    subtitle: "Функциональные детали и запчасти для различных устройств",
    fontSizeSubtitle: "text-2xl md:text-2xl lg:text-3xl xl:text-3xl",
    images: [
      { src: vase1, alt: "Vase design 1", col: 1, row: 1 },
      { src: vase2, alt: "Vase design 2", col: 2, row: 1 },
      { src: vase3, alt: "Vase design 3", col: 3, row: 2 },
      { src: vase4, alt: "Vase design 4", col: 1, row: 3 },]
  },

];