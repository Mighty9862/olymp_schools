import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";
import Footer from "../components/layout/Footer/Footer";
import { Button } from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { INewsItem } from "../types/INews.type";

interface LocalImage {
  id: string;
  file: File;
  previewUrl: string;
}

const Admin = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { token, isAuthenticated, setUserData, userData } = useAuthStore();
  const { isDarkMode } = useThemeStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Состояния для новостей
  const [newsFormData, setNewsFormData] = useState({
    title: "",
    description: "",
    content: " ",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Состояния для локальных изображений
  const [localImages, setLocalImages] = useState<LocalImage[]>([]);

  // Проверка прав администратора
  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }

    if (!userData) {
      axios
        .get(`${API_URL}/auth-service/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
          if (response.data.role !== "admin") {
            navigate("/");
          }
        })
        .catch(() => {
          navigate("/login");
        });
    } else if (userData.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, token, navigate, API_URL, userData, setUserData]);

  // Получение списка новостей
  const {
    data: news,
    isLoading: isNewsLoading,
    error: newsError,
  } = useQuery<INewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/news-service/news`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  // Создание новости
  const createNewsMutation = useMutation({
    mutationFn: (newNews: Omit<INewsItem, "id">) =>
      axios.post(`${API_URL}/news-service/news`, newNews, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setNewsFormData({ title: "", description: "", content: " " });
    },
  });

  // Обновление новости
  const updateNewsMutation = useMutation({
    mutationFn: (updatedNews: INewsItem) =>
      axios.put(`${API_URL}/news-service/news/${updatedNews.id}`, updatedNews, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setEditingId(null);
      setNewsFormData({ title: "", description: "", content: " " });
    },
  });

  // Удаление новости
  const deleteNewsMutation = useMutation({
    mutationFn: (id: number) =>
      axios.delete(`${API_URL}/news-service/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
  });

  // Обработчики для новостей
  const handleNewsInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewsFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newsData = {
      ...newsFormData,
      content: " ",
    };

    if (editingId !== null) {
      updateNewsMutation.mutate({ ...newsData, id: editingId });
    } else {
      createNewsMutation.mutate(newsData);
    }
  };

  const handleEditNews = (newsItem: INewsItem) => {
    setEditingId(newsItem.id);
    setNewsFormData({
      title: newsItem.title,
      description: newsItem.description,
      content: " ",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewsFormData({ title: "", description: "", content: " " });
  };

  // Обработчики для изображений
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);

      // Создаем превью для выбранных файлов
      const newImages = files.map((file) => ({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setLocalImages((prev) => [...prev, ...newImages]);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (id: string) => {
    // Освобождаем память от превью
    const imageToRemove = localImages.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.previewUrl);
    }

    setLocalImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Очистка превью при размонтировании компонента
  useEffect(() => {
    return () => {
      localImages.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });
    };
  }, [localImages]);

  if (isNewsLoading) return <div>Загрузка...</div>;
  if (newsError)
    return <div>Ошибка загрузки новостей: {newsError.message}</div>;

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50/20 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section className="flex flex-col items-center justify-center px-6 py-12">
        <h2
          className={cn("mb-12 text-center text-4xl font-bold md:text-5xl", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Панель администратора
        </h2>

        <div className="flex w-full flex-col gap-8 lg:flex-row">
          {/* Колонка новостей */}
          <div className="flex-1">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <h3
                className={cn("text-center text-3xl font-bold", {
                  "text-white": isDarkMode,
                  "text-gray-900": !isDarkMode,
                })}
              >
                Управление новостями
              </h3>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  {editingId !== null
                    ? "Редактирование новости"
                    : "Создание новости"}
                </h4>

                <form onSubmit={handleNewsSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block font-medium">Заголовок</label>
                    <input
                      type="text"
                      name="title"
                      value={newsFormData.title}
                      onChange={handleNewsInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-medium">Описание</label>
                    <textarea
                      name="description"
                      value={newsFormData.description}
                      onChange={handleNewsInputChange}
                      className={cn("w-full rounded border p-2", {
                        "border-gray-700 bg-gray-800": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="flex space-x-4 pt-2">
                    <Button
                      type="submit"
                      disabled={
                        createNewsMutation.isPending ||
                        updateNewsMutation.isPending
                      }
                    >
                      {editingId !== null ? "Обновить" : "Создать"}
                      {(createNewsMutation.isPending ||
                        updateNewsMutation.isPending) && (
                        <span className="ml-2">...</span>
                      )}
                    </Button>
                    {editingId !== null && (
                      <Button type="button" onClick={handleCancelEdit}>
                        Отмена
                      </Button>
                    )}
                  </div>
                </form>
              </div>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Список новостей
                </h4>
                {news?.length === 0 ? (
                  <p className="text-center">Новостей нет</p>
                ) : (
                  <div className="space-y-4">
                    {news?.map((item) => (
                      <div
                        key={item.id}
                        className={cn("rounded-lg border p-4", {
                          "border-gray-700": isDarkMode,
                          "border-gray-200": !isDarkMode,
                        })}
                      >
                        <h5 className="mb-2 text-lg font-bold">{item.title}</h5>
                        <p className="mb-3">{item.description}</p>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditNews(item)}
                            disabled={updateNewsMutation.isPending}
                          >
                            Редактировать
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => deleteNewsMutation.mutate(item.id)}
                            disabled={deleteNewsMutation.isPending}
                          >
                            {deleteNewsMutation.isPending
                              ? "Удаление..."
                              : "Удалить"}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </m.div>
          </div>

          {/* Колонка изображений */}
          <div className="flex-1">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              <h3
                className={cn("text-center text-3xl font-bold", {
                  "text-white": isDarkMode,
                  "text-gray-900": !isDarkMode,
                })}
              >
                Управление изображениями главной страницы
              </h3>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Загрузка изображений
                </h4>
                <div className="space-y-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className={cn("w-full rounded border p-2", {
                      "border-gray-700 bg-gray-800": isDarkMode,
                      "border-gray-300 bg-white": !isDarkMode,
                    })}
                  />
                  {localImages.length > 0 && (
                    <p className="text-sm">
                      Выбрано изображений: {localImages.length}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={cn("rounded-2xl p-6", {
                  "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                  "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
                })}
              >
                <h4 className="mb-4 text-center text-xl font-semibold">
                  Галерея изображений
                </h4>
                {localImages.length === 0 ? (
                  <p className="text-center">Нет загруженных изображений</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {localImages.map((image) => (
                      <div
                        key={image.id}
                        className={cn("relative rounded-lg border", {
                          "border-gray-700": isDarkMode,
                          "border-gray-200": !isDarkMode,
                        })}
                      >
                        <img
                          src={image.previewUrl}
                          alt={`Preview ${image.id}`}
                          className="h-full w-full object-cover"
                        />
                        <div className="bg-opacity-50 absolute right-0 bottom-0 left-0 bg-black p-2 text-white">
                          <p className="truncate text-xs">{image.file.name}</p>
                          <p className="text-xs">
                            {(image.file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveImage(image.id)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </m.div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button className="px-7 py-3">Вернуться на главную</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admin;
