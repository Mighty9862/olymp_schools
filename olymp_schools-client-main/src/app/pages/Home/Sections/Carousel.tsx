import { useEffect, useState } from "react";
import cn from "clsx";
import { useThemeStore } from "../../../stores/themeStore";

function Carousel() {
  const { isDarkMode } = useThemeStore();
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const importImages = async () => {
      try {
        // Получаем все изображения из папки assets
        // Используем import.meta.glob для Vite
        const modules = import.meta.glob(
          "/src/app/assets/*.(jpeg|jpg|png|svg)",
        );
        const imagePaths = await Promise.all(
          Object.keys(modules).map(async (path) => {
            const module = await modules[path]();
            return (module as { default: string }).default;
          }),
        );
        setImages(imagePaths);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    importImages();
  }, []);

  return (
    <section
      className={cn("p-8 text-center", {
        "bg-[#0d1117]": isDarkMode,
        "bg-white": !isDarkMode,
      })}
    >
      <h2
        className={cn("mb-6 text-2xl font-bold md:text-3xl", {
          "text-white": isDarkMode,
          "text-gray-900": !isDarkMode,
        })}
      >
        Галерея
      </h2>

      {/* Карусель */}
      <div className="scrollbar-hide relative overflow-x-auto py-4">
        <div className="flex space-x-4 px-2">
          {images.length > 0 ? (
            images.map((src, index) => (
              <div
                key={index}
                className={cn(
                  "relative shrink-0 rounded-lg shadow-lg transition-all duration-300",
                  {
                    "bg-gray-800": isDarkMode,
                    "bg-gray-100": !isDarkMode,
                  },
                )}
              >
                <img
                  src={src}
                  alt={`Галерея ${index + 1}`}
                  className="h-60 w-auto rounded-lg object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-lg transition-all duration-300" />
              </div>
            ))
          ) : (
            <div className="flex h-60 w-full items-center justify-center">
              <p
                className={cn("text-lg", {
                  "text-gray-400": isDarkMode,
                  "text-gray-500": !isDarkMode,
                })}
              >
                Загрузка изображений...
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
