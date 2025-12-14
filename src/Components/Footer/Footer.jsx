
export default function Footer() {
    return (
        <footer className=" text-[#F0F0F0] font-quantum py-10 px-5 relative ">

            {/* Сетка: на мобильных — 1 колонка, на десктопе — 4 колонки */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 justify-center items-center content-center lg:justify-items-center">

                {/* Блок 1: TELEGRAM */}
                <div className="p-2 order-1 md:col-start-1 md:row-start-1">
                    <a href='https://t.me/wannacryportfolio' className="text-xs uppercase tracking-wide ">TELEGRAM</a>
                </div>

                {/* Блок 2: ЭЛЕКТРОПОЧТА */}
                <div className="p-2 order-2 md:col-start-2 md:row-start-1 ">
                    <a href='mailto:wannacryme@yandex.ru' className="text-xs uppercase tracking-wide ">wannacryme@yandex.ru</a>
                </div>

                {/* Блок 3: VK */}
                <div className="p-2 order-3 md:col-start-3 md:row-start-1">
                    <a href="https://vk.com/wannacrygroup?from=groups" className="text-xs uppercase tracking-wide">VK</a>
                </div>

                {/* Блок 4: РОССИЯ, Г. ВОРОНЕЖ */}
                <div className="p-2 order-4 md:col-start-4 md:row-start-1">
                    <p className="text-xs uppercase tracking-wide">РОССИЯ, Г. ВОРОНЕЖ</p>
                </div>

                {/* Блок 5: ОБСУЖДЕНИЕ → МОДЕЛИРОВАНИЕ → ПЕЧАТЬ → ДОСТАВКА → ДОВОЛЬНЫЙ КЛИЕНТ */}
                <div className="p-2 order-5 md:col-start-1 col-span-2 md:row-start-3 mt-4 md:mt-6">
                    <p className="text-xs uppercase tracking-wide">ОБСУЖДЕНИЕ → МОДЕЛИРОВАНИЕ → ПЕЧАТЬ → ДОСТАВКА → ДОВОЛЬНЫЙ КЛИЕНТ</p>
                </div>

                {/* Блок 6: 3D */}
                <div className="p-2 order-6 md:col-start-4 md:row-start-3 mt-4 md:mt-6">
                    <p className="text-xs uppercase tracking-wide">designed by: Барсуков Андрей</p>
                </div>

                {/* Блок 7: Центральный логотип — в конце на мобильных, по центру на десктопе */}
                <div className="col-span-full p-2 order-7 md:order-1 mt-4 md:mt-6">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold leading-none -tracking-[.02em] lg:-tracking-[.04em] text-center">
                        WANNACRY.SHOP
                    </h1>
                </div>

            </div>
        </footer>
    );
}