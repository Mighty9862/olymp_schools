import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../../components/ui/Button";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import Input from "../../components/ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { m } from "framer-motion";
import cn from "clsx";
import { useThemeStore } from "../../stores/themeStore";
import { useState } from "react";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { toast, ToastContainer } from "react-toastify";
import { getCustomToastStyle } from "../../components/ui/toastStyles";
import axios from "axios";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

interface ILoginForm {
  email: string;
  password: string;
}

function Login() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { isDarkMode } = useThemeStore();
  const { setToken, setUserData } = useAuthStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const [showForgotPasswordModal, setShowForgotPasswordModal] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth-service/login`, {
        email: data.email,
        password: data.password,
      });

      setToken(response.data.token);
      setUserData(response.data.user);

      toast.success("Вход выполнен успешно!", getCustomToastStyle(isDarkMode));

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Ошибка входа";
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

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />

      <m.section
        className={cn(
          "relative flex flex-col items-center justify-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:gap-16 md:py-20",
          {
            "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
              isDarkMode,
            "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200":
              !isDarkMode,
          },
        )}
      >
        <form
          className="w-full max-w-md px-4 sm:px-0 md:ml-20"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div className="grid grid-cols-1 gap-6">
            <Input
              type="text"
              placeholder="Электронная почта"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Некорректный email",
                },
              })}
            />
            <Input
              type="password"
              placeholder="Пароль"
              {...register("password", {
                required: true,
                minLength: {
                  value: 5,
                  message: "Минимум 5 символов",
                },
              })}
            />
            <Button
              type="submit"
              className="py-2.5 text-lg"
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
            <a
              onClick={() => setShowForgotPasswordModal(true)}
              className="inline-block cursor-pointer text-center text-lg text-blue-400 transition hover:text-blue-300"
            >
              Забыли пароль?
            </a>
          </div>
        </form>
        <m.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={cn(
            "mt-8 flex h-64 w-full max-w-md items-center justify-center rounded-2xl md:mt-0 md:h-80 md:w-xl",
            {
              "bg-gradient-to-br from-blue-700 to-blue-400": isDarkMode,
              "bg-gradient-to-br from-blue-400 to-blue-300": !isDarkMode,
            },
          )}
        >
          <img
            src={isDarkMode ? "/logo_dark.png" : "/logo.png"}
            className="z-10 h-64 object-contain md:h-80"
            alt="Логотип"
          />
        </m.div>
      </m.section>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default Login;
