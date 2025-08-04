import { Link } from "react-router-dom";
import cn from "clsx";
import { Button } from "../../ui/Button";
import { useThemeStore } from "../../../stores/themeStore";
import { useAuthStore } from "../../../stores/authStore";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isAuthenticated, userData } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex w-screen items-center justify-between border-b px-4 py-2 backdrop-blur sm:px-6",
        {
          "border-[#2c313c] bg-[#0d1117]/70 text-gray-300": isDarkMode,
          "border-gray-200 bg-white/70 text-gray-800": !isDarkMode,
        },
      )}
    >
      <div className="flex w-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-4">
          <img
            src="/mosu_logo.png"
            className="max-h-20"
            alt="Логотип Университета Цифровой Полиции"
          />
          <span>
            <h2 className="hidden text-md md:block md:text-lg">Московский университет МВД России имени В.Я. Кикотя</h2>
            <h1 className="hidden text-2xl font-bold md:block md:text-3xl">
              Университет{" "}
              <span className="text-blue-400">Цифровой Полиции</span>
            </h1>
          </span>
          <span className="text-2xl font-bold text-blue-400 sm:hidden">
            УЦП
          </span>
        </Link>

        {/* Основная навигация */}
        <nav className="hidden gap-6 text-sm font-medium md:flex md:gap-10">
          <Link
            to="/about"
            className="text-base transition hover:text-blue-400"
          >
            Об олимпиаде
          </Link>
          <Link
            to="/passing"
            className="text-base transition hover:text-blue-400"
          >
            Прохождение
          </Link>
          <Link
            to="/partners"
            className="text-base transition hover:text-blue-400"
          >
            Партнёры
          </Link>
          <a
            href="#developers"
            className="text-base transition hover:text-blue-400"
          >
            Разработчики
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={cn("cursor-pointer rounded-lg p-2", {
              "text-gray-300 hover:bg-blue-950": isDarkMode,
              "text-gray-700 hover:bg-gray-200": !isDarkMode,
            })}
            aria-label={isDarkMode ? "Светлая тема" : "Тёмная тема"}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {isAuthenticated ? (
            <div className="hidden items-center gap-4 md:flex">
              {userData?.role === "admin" && (
                <Link to="/admin">
                  <Button>Админ-панель</Button>
                </Link>
              )}
              <Link to="/profile">
                <Button>Личный кабинет</Button>
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-lg text-blue-400 transition hover:text-blue-300 md:inline-block"
              >
                Войти
              </Link>
              <Link to="/registration">
                <Button className="hidden md:block">Регистрация</Button>
              </Link>
            </>
          )}

          {/* Меню навигации для телефона */}
          <button
            className="ml-2 p-2 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Меню"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Навигация для телефона */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute top-full left-0 w-full overflow-hidden md:hidden",
              {
                "bg-[#0d1117]": isDarkMode,
                "bg-white": !isDarkMode,
              },
            )}
          >
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/about"
                className="py-2 text-lg transition hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Об олимпиаде
              </Link>
              <Link
                to="/passing"
                className="py-2 text-lg transition hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Прохождение
              </Link>
              <Link
                to="/partners"
                className="py-2 text-lg transition hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Партнёры
              </Link>
              <a
                href="#developers"
                className="py-2 text-lg transition hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                Разработчики
              </a>

              {isAuthenticated ? (
                <div className="flex flex-col gap-4 pt-4">
                  {userData?.role === "admin" && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full">Админ-панель</Button>
                    </Link>
                  )}
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full">Личный кабинет</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-4">
                  <Link
                    to="/login"
                    className="w-full py-2 text-center text-lg text-blue-400 transition hover:text-blue-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link
                    to="/registration"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full">Регистрация</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
