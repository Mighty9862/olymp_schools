import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import { m } from "framer-motion";
import { fadeUp } from "../components/animations/fadeUp";
import Footer from "../components/layout/Footer/Footer";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

function Passing() {
  const { isDarkMode } = useThemeStore();
  const { isAuthenticated } = useAuthStore();

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50/20 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-10xl mx-auto max-w-4xl">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <h2
              className={cn("text-center text-4xl font-bold md:text-5xl", {
                "text-white": isDarkMode,
                "text-gray-900": !isDarkMode,
              })}
            >
              Прохождение олимпиады
            </h2>

            <div
              className={cn("rounded-2xl p-8 text-lg", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
              })}
            >
              <h3 className="mb-6 text-center text-2xl font-semibold">
                Регистрация для участия в олимпиаде
              </h3>

              <p className="mb-4">
                Для прохождения олимпиады Вам необходимо пройти предварительную
                регистрацию и в личном кабинете выбрать дисциплину, в которой Вы
                хотите участвовать.
              </p>

              {isAuthenticated ? (
                <Link to="/profile" className="mb-4 inline-block">
                  <Button>Перейти в личный кабинет</Button>
                </Link>
              ) : (
                <Link to="/registration" className="mb-4 inline-block">
                  <Button>Регистрация</Button>
                </Link>
              )}

              <p className="mb-6">
                По результатам регистрации Вам будет направлен логин и пароль
                для прохождения отборочного этапа по данному адресу электронной
                почты:{" "}
                <a
                  href="mailto:olimpiada.mosu@mail.ru"
                  className={cn("font-medium", {
                    "text-blue-400": isDarkMode,
                    "text-blue-600": !isDarkMode,
                  })}
                >
                  olimpiada.mosu@mail.ru
                </a>
              </p>

              <a
                href="https://moodle.mosu-mvd.com/mod/quiz/view.php?id=337"
                target="_blank"
                rel="noopener noreferrer"
                className={cn("font-medium", {
                  "text-blue-400": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                Нажмите для прохождения отборочного этапа
              </a>
            </div>

            <div className="flex justify-center">
              <Link to="/">
                <Button className="px-7 py-3">Вернуться на главную</Button>
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Passing;
