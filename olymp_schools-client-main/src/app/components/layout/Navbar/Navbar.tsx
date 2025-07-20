import { Link } from "react-router-dom";
import cn from "clsx";
import { Button } from "../../ui/Button";
import { useThemeStore } from "../../../stores/themeStore";
import { useAuthStore } from "../../../stores/authStore";

function Navbar() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isAuthenticated, userData } = useAuthStore();

  return (
    <header
      className={cn(
        "sticky top-0 z-100 flex w-screen items-center justify-between border-b px-4 py-2 backdrop-blur sm:px-6",
        {
          "border-[#2c313c] bg-[#0d1117]/70 text-gray-300": isDarkMode,
          "border-gray-200 bg-white text-gray-800": !isDarkMode,
        },
      )}
    >
      {" "}
      <Link to={"/"} className="flex flex-row items-center gap-4">
        <img src="/mosu_logo.png" className="max-h-20" />
        <h1 className="text-2xl font-bold md:text-3xl">
          Университет <span className="text-blue-400">Цифровой Полиции</span>
        </h1>
      </Link>
      <nav className="hidden gap-6 text-sm font-medium md:flex md:gap-10">
        <Link to="/about" className="text-base transition hover:text-blue-400">
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
        <div className="flex items-center gap-4">
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
            className="inline-block text-lg text-blue-400 transition hover:text-blue-300"
          >
            Войти
          </Link>
          <Link to="/registration">
            <Button>Регистрация</Button>
          </Link>
        </>
      )}
    </header>
  );
}

export default Navbar;
