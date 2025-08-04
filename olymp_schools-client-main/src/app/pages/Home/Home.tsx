import Navbar from "../../components/layout/Navbar/Navbar";
import News from "./Sections/News/News";
import About from "./Sections/Info";
import Footer from "../../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../../components/ui/BackgroundBlobs/BackgroundBlobs";
import { fadeUp } from "../../components/animations/fadeUp";
import { m } from "framer-motion";
import { Link } from "react-router-dom";
import { useThemeStore } from "../../stores/themeStore";
import cn from "clsx";
import Carousel from "./Sections/Carousel";

export default function Home() {
  const { isDarkMode } = useThemeStore();

  return (
    <div
      className={cn("min-h-screen w-screen font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />

      {/* Основной блок с тремя колонками */}
      <section className={"relative px-6 py-12"}>
        <div className="w-10xl mx-auto grid grid-cols-1 justify-center gap-8 md:grid-cols-3">
          {/* Левая колонка - название и логотип */}
          <div className="ml-8 flex flex-col">
            {" "}
            {/* Добавлен ml-8 здесь */}
            <m.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="max-w-xl"
            >
              <h2
                className={cn(
                  "mb-6 text-4xl leading-tight font-bold md:text-5xl",
                  {
                    "text-white": isDarkMode,
                    "text-gray-900": !isDarkMode,
                  },
                )}
              >
                Всероссийская олимпиада школьников
              </h2>
              <p
                className={cn("mb-8 text-xl", {
                  "text-blue-100": isDarkMode,
                  "text-blue-600": !isDarkMode,
                })}
              >
                Побеждай и получай дополнительные баллы при поступлении
              </p>
              <m.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "group relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl sm:w-md",
                  {
                    "bg-gradient-to-br from-blue-700 to-blue-400": isDarkMode,
                    "bg-gradient-to-br from-blue-400 to-blue-300": !isDarkMode,
                  },
                )}
              >
                <Link to={"/"}>
                  <m.img
                    src="/logo.png"
                    className="z-10 mt-6 h-88 cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </Link>
              </m.div>
            </m.div>
          </div>

          {/* Центральная колонка - кнопки */}
          <div className="justify-center">
            <About />
          </div>

          {/* Правая колонка - новости */}
          <News />
        </div>
      </section>

      {/* Разработчики */}
      {/* <section
        id="developers"
        className={cn("px-4 py-14 text-center sm:px-6", {
          "bg-[#0b0f1a]": isDarkMode,
          "bg-white": !isDarkMode,
        })}
      >
        <m.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn("mb-6 text-3xl font-semibold", {
            "text-white": isDarkMode,
            "text-gray-900": !isDarkMode,
          })}
        >
          Разработчики
        </m.h3>
        <m.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn("mx-auto mb-8 max-w-4xl text-lg", {
            "text-gray-400": isDarkMode,
            "text-gray-600": !isDarkMode,
          })}
        >
          Проект разработан курсантами факультета подготовки специалистов в
          области информационной безопасности Московского университета МВД
          России имени В.Я. Кикотя.
        </m.p>
      </section> */}

      {/* Карусель */}
      <Carousel />

      <Footer />
    </div>
  );
}
