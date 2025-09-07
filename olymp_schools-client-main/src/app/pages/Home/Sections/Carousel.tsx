import { useEffect, useState, useRef } from "react";
import axios from "axios";
import cn from "clsx";
import { useThemeStore } from "../../../stores/themeStore";

function InfiniteCarousel() {
  const API_URL = import.meta.env.VITE_API_URL;
  const STATIC_URL = import.meta.env.VITE_STATIC_URL;
  const { isDarkMode } = useThemeStore();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollSpeed = 30;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await axios.get(`${API_URL}/news-service/images`);

        if (response.data && Array.isArray(response.data.images)) {
          // Дублируем изображения для бесшовной прокрутки
          setImages([...response.data.images, ...response.data.images]);
        } else {
          throw new Error("Некорректный формат данных");
        }
      } catch (err) {
        console.error("Ошибка загрузки изображений:", err);
        setError("Не удалось загрузить изображения");
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [API_URL]);

  useEffect(() => {
    if (images.length > 0) {
      const carousel = carouselRef.current;
      if (!carousel) return;

      let requestId: number;
      let lastTimestamp = 0;

      const animateScroll = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += delta / scrollSpeed;
        }

        requestId = requestAnimationFrame(animateScroll);
      };

      requestId = requestAnimationFrame(animateScroll);

      return () => {
        cancelAnimationFrame(requestId);
      };
    }
  }, [images]);

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

      <div
        ref={carouselRef}
        className="scrollbar-hide relative overflow-x-hidden py-4"
      >
        <div className="flex space-x-4">
          {isLoading ? (
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
          ) : error ? (
            <div className="flex h-60 w-full items-center justify-center">
              <p
                className={cn("text-lg text-red-500", {
                  "text-red-400": isDarkMode,
                })}
              >
                {error}
              </p>
            </div>
          ) : images.length > 0 ? (
            images.map((imageUrl, index) => (
              <div
                key={index}
                className={cn("relative shrink-0 rounded-lg shadow-lg", {
                  "bg-gray-800": isDarkMode,
                  "bg-gray-100": !isDarkMode,
                })}
              >
                <img
                  src={`${STATIC_URL}${imageUrl}`}
                  alt={`Галерея ${(index % (images.length / 2)) + 1}`}
                  crossOrigin="anonymous"
                  className="h-60 w-auto rounded-lg object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
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
                Нет доступных изображений
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InfiniteCarousel;
