// src/components/ModelViewers/CollectionIntro.jsx
import ModelViewerStatuette from './ModelViewerIntro';

export default function CollectionIntro({ collection }) {
    // Формируем объект intro из данных коллекции
    const intro = collection.model_intro_name && collection.title_intro ? {
        modelPath: `/models/${collection.model_intro_name}.glb`,
        text: collection.title_intro,
        titleFont: collection.fontFamily || 'font-mono',
        textColor: '#9ff820', // HEX значение с #
        textSizeClass: "text-5xl md:text-6xl lg:text-6xl xl:text-9xl",
        positionModel: collection.intro?.positionModel || [0, -1.55, 0]
    } : null;

    if (!intro) {
        // Если нет интро — просто пустой раздел высотой
        return <div className="h-screen"></div>;
    }

    return (
        <section className="w-full">
            <ModelViewerStatuette
                modelPath={intro.modelPath}
                title={intro.text}
                titleFont={intro.titleFont}
                textColor={intro.textColor}
                textSizeClass={intro.textSizeClass}
                positionModel={intro.positionModel}
            />
        </section>
    );
}