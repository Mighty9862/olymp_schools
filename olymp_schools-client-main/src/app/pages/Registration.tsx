import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import Input from "../components/ui/Input";
import Select from "../components/ui/Select";
import { SubmitHandler, useForm } from "react-hook-form";
import cn from "clsx";
import { useThemeStore } from "../stores/themeStore";
import { ToastContainer, toast } from "react-toastify";
import { getCustomToastStyle } from "../components/ui/toastStyles";
import { IForm } from "../types/IForm.type";
import Stepper, { Step } from "../components/ui/Stepper/Stepper";
import { useRef, useState } from "react";
import { useStepStore } from "../stores/StepsStore";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";

function Registration() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { currentStep, setStep, nextStep, prevStep, resetStep } =
    useStepStore();
  const { setToken } = useAuthStore();
  const stepperRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useThemeStore();

  // Форма для первого шага (авторизация)
  const { register: registerAuth, handleSubmit: handleAuthSubmit } = useForm<{
    email: string;
    password: string;
  }>();

  // Форма для второго и третьего шага (профиль)
  const { register: registerProfile, handleSubmit: handleProfileSubmit } =
    useForm<IForm>();

  // Обработчик первого шага (регистрация)
  const handleAuth: SubmitHandler<{ email: string; password: string }> = async (
    data,
  ) => {
    setIsLoading(true);
    console.log(data);
    try {
      const response = await axios.post(`${API_URL}/auth-service/register`, {
        email: data.email,
        password: data.password,
      });

      setToken(response.data.token); // Сохраняем токен в хранилище
      toast.success("Регистрация успешна!", getCustomToastStyle(isDarkMode));
      nextStep();
      stepperRef.current?.handleNext?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Ошибка регистрации";
        toast.error(errorMessage, getCustomToastStyle(isDarkMode));
      } else {
        toast.error("Неизвестная ошибка", getCustomToastStyle(isDarkMode));
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработчик второго и третьего шага (обновление профиля)
  const handleProfileUpdate: SubmitHandler<IForm> = async (data) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      toast.error("Требуется авторизация", getCustomToastStyle(isDarkMode));
      return;
    }

    setIsLoading(true);
    try {
      await axios.put(
        `${API_URL}/users-service/updateProfile`,
        {
          firstName: data.firstName,
          patronymic: data.patronymic,
          lastName: data.lastName,
          dateOfBirth: data.dateOfBirth,
          phone: data.phone,
          region: data.region,
          city: data.city,
          institute: data.institute,
          gender: data.gender === "male" ? "м" : "ж",
          class_name: data.class,
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
      resetStep();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Ошибка обновления профиля";
        toast.error(errorMessage, getCustomToastStyle(isDarkMode));
      } else {
        toast.error("Неизвестная ошибка", getCustomToastStyle(isDarkMode));
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onError = () => {
    toast.warn(
      "Пожалуйста, заполните все поля",
      getCustomToastStyle(isDarkMode),
    );
  };

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />
      <Stepper
        ref={stepperRef}
        initialStep={currentStep}
        onStepChange={setStep}
        onFinalStepCompleted={() => console.log("Регистрация окончена")}
      >
        {/* Первый шаг - регистрация */}
        <Step>
          <form
            onSubmit={handleAuthSubmit(handleAuth, onError)}
            className="mx-auto flex w-full max-w-md flex-col gap-8"
          >
            <Input
              type="text"
              placeholder="Электронная почта"
              {...registerAuth("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Некорректный email",
                },
              })}
            />

            <Input
              type="password"
              placeholder="Придумайте пароль"
              {...registerAuth("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Пароль должен содержать минимум 6 символов",
                },
              })}
            />

            <Input type="password" placeholder="Повторите пароль" />

            <div className="mx-auto mt-8 flex max-w-2xl justify-between px-4">
              <div className="flex-1" />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Загрузка..." : "Далее"}
              </Button>
            </div>
          </form>
        </Step>

        {/* Второй шаг - личные данные */}
        <Step>
          <form onSubmit={handleProfileSubmit(handleProfileUpdate, onError)}>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
              <Input
                type="text"
                placeholder="Фамилия"
                {...registerProfile("lastName", {
                  required: "Обязательное поле",
                })}
              />

              <Input
                type="text"
                placeholder="Имя"
                {...registerProfile("firstName", {
                  required: "Обязательное поле",
                })}
              />

              <Input
                type="text"
                placeholder="Отчество"
                {...registerProfile("patronymic", {
                  required: "Обязательное поле",
                })}
              />

              <Input
                type="date"
                {...registerProfile("dateOfBirth", {
                  required: "Обязательное поле",
                  validate: (value) => {
                    const birthDate = new Date(value);
                    const now = new Date();
                    return (
                      now > birthDate || "Дата рождения не может быть в будущем"
                    );
                  },
                })}
              />

              <section className="grid grid-rows-4 gap-8">
                <Select
                  {...registerProfile("gender", {
                    required: "Обязательное поле",
                  })}
                >
                  <option value="">Пол</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </Select>

                <Select
                  {...registerProfile("class", {
                    required: "Обязательное поле",
                  })}
                >
                  <option value="">Класс / Курс</option>
                  <option value="10 класс">10 класс</option>
                  <option value="11 класс">11 класс</option>
                  <option value="1 курс">1 курс</option>
                  <option value="2 курс">2 курс</option>
                </Select>

                <Input
                  type="text"
                  placeholder="Образовательное учреждение"
                  {...registerProfile("institute", {
                    required: "Обязательное поле",
                  })}
                />

                <Select
                  {...registerProfile("instituteRegion", {
                    required: "Обязательное поле",
                  })}
                >
                  <option value="">Регион организации</option>
                  <option value="Москва">Москва</option>
                  <option value="СПб">Санкт-Петербург</option>
                </Select>
              </section>
            </div>

            <div className="mx-w-2xl mx-auto mt-8 flex justify-between px-4">
              <Button
                type="button"
                onClick={() => {
                  prevStep();
                  stepperRef.current?.handleBack?.();
                }}
                disabled={isLoading}
              >
                Назад
              </Button>
              <div className="flex-1" />
              <Button
                type="button"
                onClick={() => {
                  nextStep();
                  stepperRef.current?.handleNext?.();
                }}
                disabled={isLoading}
              >
                Далее
              </Button>
            </div>
          </form>
        </Step>

        {/* Третий шаг - дополнительная информация */}
        <Step>
          <form onSubmit={handleProfileSubmit(handleProfileUpdate, onError)}>
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
              <Input
                type="tel"
                placeholder="Контактный телефон"
                {...registerProfile("phone", {
                  required: "Обязательное поле",
                  pattern: {
                    value: /^[\d\+][\d\(\)\ -]{4,14}\d$/,
                    message: "Некорректный номер телефона",
                  },
                })}
              />

              <Select
                {...registerProfile("region", {
                  required: "Обязательное поле",
                })}
              >
                <option value="">Регион</option>
                <option value="Москва">Москва</option>
                <option value="СПб">Санкт-Петербург</option>
              </Select>

              <Input
                type="text"
                placeholder="Населенный пункт"
                {...registerProfile("city", { required: "Обязательное поле" })}
              />

              <Input
                type="text"
                placeholder="СНИЛС"
                {...registerProfile("snils", {
                  required: "Обязательное поле",
                  pattern: {
                    value: /^\d{3}-\d{3}-\d{3} \d{2}$/,
                    message: "Формат: XXX-XXX-XXX XX",
                  },
                })}
              />

              <Input
                type="text"
                placeholder="Почтовый адрес"
                {...registerProfile("mailAddress", {
                  required: "Обязательное поле",
                })}
              />

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <Input type="checkbox" required />
                  Согласен на
                  <Link to="/consent" className="text-blue-500">
                    обработку персональных данных
                  </Link>
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <Input type="checkbox" required />
                  Ознакомлен с
                  <a
                    href="https://mvd.ru/upload/site116/folder_page/041/907/599/Polozhenie_Olimpiada_MosU.pdf"
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Положением
                  </a>
                  и
                  <a
                    href="https://mvd.ru/upload/site116/folder_page/041/907/599/Reglament_2024-2025.pdf"
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Регламентом
                  </a>
                  Олимпиады
                </label>
              </div>
            </div>

            <div className="mx-auto mt-8 flex max-w-2xl justify-between px-4">
              <Button
                type="button"
                onClick={() => {
                  prevStep();
                  stepperRef.current?.handleBack?.();
                }}
                disabled={isLoading}
              >
                Назад
              </Button>
              <div className="flex-1" />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Зарегистрироваться"}
              </Button>
            </div>
          </form>
        </Step>
      </Stepper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Footer />
    </div>
  );
}

export default Registration;
