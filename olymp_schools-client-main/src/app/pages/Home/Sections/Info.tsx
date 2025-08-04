import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";
import { useThemeStore } from "../../../stores/themeStore";
import cn from "clsx";
import { Link } from "react-router-dom";
import { IInfoItem } from "../../../types/IInfo.type";

function Info() {
  const { isDarkMode } = useThemeStore();

  const InfoItems: IInfoItem[] = [
    {
      title: "Об олимпиаде",
      desc: "Описание олимпиады, её цели и документы",
      link: "/about",
    },
    {
      title: "Прохождение олимпиады",
      desc: "Этапы участия и правила прохождения",
      link: "/passing",
    },
    {
      title: "Результаты Отборочного этапа",
      desc: "Результаты отборочного этапа олимпиады",
      link: "/qualification",
    },
    {
      title: "Итоги Олимпиады",
      desc: "Победители и призёры олимпиады и их проекты",
      link: "/ranking",
    },
    {
      title: "Результаты Олимпиады прошлых лет",
      desc: "Архив победителей и проектов прошлых лет",
      link: "/",
    },
    {
      title: "Наши партнёры",
      desc: "Организации и компании, поддерживающие олимпиаду",
      link: "/partners",
    },
  ];

  return (
    <div
      className={`col-auto grid grid-cols-1 gap-8 md:grid-cols-${InfoItems.length} lg:grid-cols-1 xl:gap-6`}
    >
      {InfoItems.map((item, index) => (
        <Link to={item.link} key={index}>
          <m.button
            key={index}
            variants={fadeUp}
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl px-4 py-6 shadow-xl transition",

              {
                "bg-[#161b22]/50 hover:shadow-blue-500/20": isDarkMode,
                "border border-gray-200 bg-white hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            <h4
              className={cn("mb-2 text-xl font-bold", {
                "text-blue-300": isDarkMode,
                "text-blue-600": !isDarkMode,
              })}
            >
              {item.title}
            </h4>
            <p
              className={cn("text-md", {
                "text-gray-400": isDarkMode,
                "text-gray-600": !isDarkMode,
              })}
            >
              {item.desc}
            </p>
          </m.button>
        </Link>
      ))}
    </div>
  );
}

export default Info;
