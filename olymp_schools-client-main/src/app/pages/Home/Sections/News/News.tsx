import { m } from "framer-motion";
import { fadeUp } from "../../../../components/animations/fadeUp";
import { useThemeStore } from "../../../../stores/themeStore";
import cn from "clsx";
import NewsModal from "./NewsModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getCustomToastStyle } from "../../../../components/ui/toastStyles";
import { useAuthStore } from "../../../../stores/authStore";

interface INewsItem {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

function News() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token } = useAuthStore();
  const [selectedNewsIndex, setSelectedNewsIndex] = useState<number | null>(
    null,
  );
  const [newsItems, setNewsItems] = useState<
    { text: string; date: string; desc: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_URL}/news-service/news`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Преобразуем данные API в нужный формат
        const formattedNews = response.data.map((item: INewsItem) => ({
          text: item.title,
          date: formatDate(item.created_at),
          desc: item.description,
        }));
        setNewsItems(formattedNews);
      } catch (error) {
        toast.error(
          "Ошибка загрузки новостей",
          getCustomToastStyle(isDarkMode),
        );
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [isDarkMode]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="h-full max-h-[32rem] overflow-y-auto">
      <m.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn("mb-8 text-3xl font-semibold", {
          "text-white": isDarkMode,
          "text-gray-900": !isDarkMode,
        })}
      >
        Новости
      </m.h3>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <div
            className={cn("text-lg", {
              "text-gray-400": isDarkMode,
              "text-gray-600": !isDarkMode,
            })}
          >
            Загрузка новостей...
          </div>
        </div>
      ) : newsItems.length === 0 ? (
        <div
          className={cn("py-10 text-center", {
            "text-gray-400": isDarkMode,
            "text-gray-500": !isDarkMode,
          })}
        >
          Нет доступных новостей
        </div>
      ) : (
        <m.ul
          className={cn(
            "space-y-6",
            {
              "text-gray-300": isDarkMode,
              "text-gray-600": !isDarkMode,
            },
            newsItems.length > 3 ? "h-2/3 overflow-y-auto pr-2" : "",
          )}
        >
          {newsItems.map((item, index) => (
            <m.li
              key={index}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              onClick={() => setSelectedNewsIndex(index)}
              className={cn(
                "cursor-pointer rounded-xl p-4 shadow-md transition",
                {
                  "bg-[#111827] hover:shadow-blue-500/20": isDarkMode,
                  "bg-white hover:shadow-blue-200": !isDarkMode,
                  "border border-gray-200": !isDarkMode,
                },
              )}
            >
              <p
                className={cn("font-medium", {
                  "text-white": isDarkMode,
                  "text-gray-800": !isDarkMode,
                })}
              >
                {item.text}
              </p>
              <p
                className={cn("text-sm", {
                  "text-gray-400": isDarkMode,
                  "text-gray-500": !isDarkMode,
                })}
              >
                {item.date}
              </p>
            </m.li>
          ))}
        </m.ul>
      )}

      {selectedNewsIndex !== null && (
        <NewsModal
          text={newsItems[selectedNewsIndex].text}
          desc={newsItems[selectedNewsIndex].desc}
          date={newsItems[selectedNewsIndex].date}
          isOpen={selectedNewsIndex !== null}
          onClose={() => setSelectedNewsIndex(null)}
        />
      )}
    </div>
  );
}

export default News;
