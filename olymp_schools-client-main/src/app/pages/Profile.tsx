import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { fadeUp } from "../components/animations/fadeUp";
import { m } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { Button } from "../components/ui/Button";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";
import { getCustomToastStyle } from "../components/ui/toastStyles";
import { toast, ToastContainer } from "react-toastify";

interface UserData {
  lastname: string;
  firstname: string;
  patronymic: string;
  email: string;
  dateofbirth: string;
  gender: "М" | "Ж";
  class_name: string;
  institute: string;
  instituteRegion: string;
  phone: string;
  region: string;
  city: string;
  snils: string;
  mailAddress: string;
}

export default function Profile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useThemeStore();
  const { token } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    lastname: "",
    firstname: "",
    patronymic: "",
    email: "",
    dateofbirth: "",
    gender: "М",
    class_name: "",
    institute: "",
    instituteRegion: "",
    phone: "",
    region: "",
    city: "",
    snils: "",
    mailAddress: "",
  });

  // Загрузка данных профиля
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/users-service/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            "Ошибка загрузки профиля",
            getCustomToastStyle(isDarkMode),
          );
        }
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, isDarkMode]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await axios.put(
        `${API_URL}/users-service/updateProfile`,
        {
          firstName: userData.firstname,
          patronymic: userData.patronymic,
          lastName: userData.lastname,
          dateOfBirth: userData.dateofbirth,
          phone: userData.phone,
          region: userData.region,
          city: userData.city,
          institute: userData.institute,
          gender: userData.gender,
          class_name: userData.class_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(
        "Профиль успешно обновлен!",
        getCustomToastStyle(isDarkMode),
      );
      setIsEditing(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Ошибка обновления профиля",
          getCustomToastStyle(isDarkMode),
        );
      }
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className={cn(
          "flex min-h-screen w-screen items-center justify-center font-sans",
          {
            "bg-[#0b0f1a] text-white": isDarkMode,
            "bg-gray-50 text-gray-900": !isDarkMode,
          },
        )}
      >
        <div className="text-xl">Загрузка профиля...</div>
      </div>
    );
  }

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />
      <ToastContainer />

      {/* Основной блок с профилем */}
      <section
        className={cn("relative min-h-[80vh] px-6 py-12", {
          "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200":
            !isDarkMode,
        })}
      >
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
          {/* ФИО и почта */}
          <div className="flex h-full flex-col">
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={cn(
                "flex h-full flex-1 flex-col rounded-2xl p-6 shadow-lg",
                {
                  "border border-blue-800/30 bg-[#161b22]/50": isDarkMode,
                  "border border-gray-200 bg-white shadow-md": !isDarkMode,
                },
              )}
            >
              <h2
                className={cn("mb-6 text-2xl font-bold", {
                  "text-blue-300": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                Личные данные
              </h2>

              <div className="space-y-6">
                <div>
                  <h3
                    className={cn("text-lg font-semibold", {
                      "text-gray-400": isDarkMode,
                      "text-gray-500": !isDarkMode,
                    })}
                  >
                    ФИО
                  </h3>
                  {isEditing ? (
                    <div className="mt-2 grid grid-cols-1 gap-4">
                      <Input
                        name="lastname"
                        value={userData.lastname}
                        onChange={handleInputChange}
                        placeholder="Фамилия"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                      <Input
                        name="firstname"
                        value={userData.firstname}
                        onChange={handleInputChange}
                        placeholder="Имя"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                      <Input
                        name="patronymic"
                        value={userData.patronymic}
                        onChange={handleInputChange}
                        placeholder="Отчество"
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    </div>
                  ) : (
                    <p className="mt-1 text-xl">
                      {userData.lastname} {userData.firstname}{" "}
                      {userData.patronymic}
                    </p>
                  )}
                </div>

                <div>
                  <h3
                    className={cn("text-lg font-semibold", {
                      "text-gray-400": isDarkMode,
                      "text-gray-500": !isDarkMode,
                    })}
                  >
                    Почта
                  </h3>
                  {isEditing ? (
                    <Input
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className={cn("mt-2", {
                        "border-blue-700 bg-[#1e293b]": isDarkMode,
                        "border-gray-300 bg-white": !isDarkMode,
                      })}
                      disabled
                    />
                  ) : (
                    <p className="mt-1 text-xl">{userData.email}</p>
                  )}
                </div>
              </div>
            </m.div>
          </div>

          {/* Остальные данные */}
          <div className="flex h-full w-full flex-col">
            <div
              className={cn(
                "relative h-full flex-1 rounded-2xl p-6 shadow-lg",
                {
                  "border border-blue-800/30 bg-[#161b22]/50": isDarkMode,
                  "border border-gray-200 bg-white shadow-md": !isDarkMode,
                },
              )}
            >
              <div className="mb-6 flex items-center justify-between">
                <h2
                  className={cn("text-2xl font-bold", {
                    "text-blue-300": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  Общая информация
                </h2>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className={cn("px-4 py-2", {
                      "bg-blue-600 hover:bg-blue-500": isDarkMode,
                      "bg-blue-500 hover:bg-blue-400": !isDarkMode,
                    })}
                    disabled={isLoading}
                  >
                    Редактировать профиль
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Первая колонка */}
                <div className="space-y-6">
                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Дата рождения
                    </h3>
                    {isEditing ? (
                      <Input
                        type="date"
                        name="dateofbirth"
                        value={userData.dateofbirth}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.dateofbirth}</p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Пол
                    </h3>
                    {isEditing ? (
                      <Select
                        name="gender"
                        value={userData.gender}
                        onChange={handleInputChange}
                        className={cn("input-size w-full", {
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      >
                        <option value="М">Мужской</option>
                        <option value="Ж">Женский</option>
                      </Select>
                    ) : (
                      <p className="mt-1 text-xl">
                        {userData.gender === "М" ? "Мужской" : "Женский"}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Класс/Курс
                    </h3>
                    {isEditing ? (
                      <Select
                        name="class_name"
                        value={userData.class_name}
                        onChange={handleInputChange}
                        className={cn("input-size w-full", {
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      >
                        <option value="10 класс">10 класс</option>
                        <option value="11 класс">11 класс</option>
                        <option value="1 курс">1 курс</option>
                        <option value="2 курс">2 курс</option>
                      </Select>
                    ) : (
                      <p className="mt-1 text-xl">{userData.class_name}</p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Телефон
                    </h3>
                    {isEditing ? (
                      <Input
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.phone}</p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Почтовый адрес
                    </h3>
                    {isEditing ? (
                      <Input
                        name="mailAddress"
                        value={userData.mailAddress}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.mailAddress}</p>
                    )}
                  </div>
                </div>

                {/* Вторая колонка */}
                <div className="space-y-6">
                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Учебное заведение
                    </h3>
                    {isEditing ? (
                      <Input
                        name="institute"
                        value={userData.institute}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.institute}</p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Регион организации
                    </h3>
                    {isEditing ? (
                      <Select
                        name="instituteRegion"
                        value={userData.instituteRegion}
                        onChange={handleInputChange}
                        className={cn("input-size w-full", {
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      >
                        <option value="Москва">Москва</option>
                        <option value="СПб">Санкт-Петербург</option>
                      </Select>
                    ) : (
                      <p className="mt-1 text-xl">{userData.instituteRegion}</p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Регион проживания
                    </h3>
                    {isEditing ? (
                      <Select
                        name="region"
                        value={userData.region}
                        onChange={handleInputChange}
                        className={cn("input-size w-full", {
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      >
                        <option value="Москва">Москва</option>
                        <option value="СПб">Санкт-Петербург</option>
                      </Select>
                    ) : (
                      <p className="mt-1 text-xl">{userData.region}</p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      Населенный пункт
                    </h3>
                    {isEditing ? (
                      <Input
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.city}</p>
                    )}
                  </div>

                  <div>
                    <h3
                      className={cn("mb-2 text-lg font-semibold", {
                        "text-gray-400": isDarkMode,
                        "text-gray-500": !isDarkMode,
                      })}
                    >
                      СНИЛС
                    </h3>
                    {isEditing ? (
                      <Input
                        name="snils"
                        value={userData.snils}
                        onChange={handleInputChange}
                        className={cn({
                          "border-blue-700 bg-[#1e293b]": isDarkMode,
                          "border-gray-300 bg-white": !isDarkMode,
                        })}
                      />
                    ) : (
                      <p className="mt-1 text-xl">{userData.snils}</p>
                    )}
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 flex justify-end space-x-4">
                  <Button
                    onClick={() => setIsEditing(false)}
                    className={cn("px-6 py-2", {
                      "bg-gray-600 hover:bg-gray-500": isDarkMode,
                      "bg-gray-200 text-gray-800 hover:bg-gray-300":
                        !isDarkMode,
                    })}
                    disabled={isLoading}
                  >
                    Отмена
                  </Button>
                  <Button
                    onClick={handleSave}
                    className={cn("px-6 py-2", {
                      "bg-blue-600 hover:bg-blue-500": isDarkMode,
                      "bg-blue-500 hover:bg-blue-400": !isDarkMode,
                    })}
                    disabled={isLoading}
                  >
                    {isLoading ? "Сохранение..." : "Сохранить изменения"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
