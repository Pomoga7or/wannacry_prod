import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#9ff820] font-mono mb-4">404</h1>
        <h2 className="text-2xl font-mono mb-6">СТРАНИЦА НЕ НАЙДЕНА</h2>
        <p className="text-gray-300 mb-8 max-w-md">
          Запрашиваемая страница не существует. Возможно, она была перемещена или удалена.
        </p>
        <Link 
          to="/" 
          className="inline-block px-6 py-3 border-2 border-[#9ff820] text-[#9ff820] font-mono hover:bg-[#9ff820] hover:text-black transition-colors duration-300"
        >
          ВЕРНУТЬСЯ НА ГЛАВНУЮ
        </Link>
      </div>
    </div>
  );
};

export default NotFound;