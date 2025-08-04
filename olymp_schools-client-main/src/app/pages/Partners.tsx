import { motion } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const partners = [
  {
    logo: "/expert_logo.png",
    name: "Экспертно-криминалистический центр МВД России",
    size: "h-40",
  },
  {
    logo: "/ubk_logo.png",
    name: "Управление по организации борьбы с противоправным использованием информационно-коммуникационных технологий МВД России",
    size: "h-40",
  },
  {
    logo: "/bstm_logo.png",
    name: "Бюро специальных технических мероприятий МВД России",
    size: "h-36",
  },
  {
    logo: "/stis_logo.png",
    name: "НПО «Специальная техника и связь» МВД России",
    size: "h-52",
  },
  {
    logo: "/giac_logo.png",
    name: "Главный информационно-аналитический центр МВД России",
    size: "h-38",
  },
  {
    logo: "/ditsizi_logo.png",
    name: "Департамент информационных технологий, связи и защиты информации МВД России",
    size: "h-38",
  },
  {
    logo: "/consplus_logo.png",
    name: "Консультант Плюс",
    size: "h-32",
  },
  {
    logo: "/garant_logo.png",
    name: "Гарант",
    size: "h-54",
  },
  {
    logo: "/sber_logo.svg",
    name: "Сбер",
    size: "h-20",
  },
  {
    logo: {
      dark: "/standart_logo.svg",
      light: "/standart_logo_dark.png", // Добавляем альтернативный логотип для светлой темы
    },
    name: "СтандартПроект",
    size: "h-72",
  },
  {
    logo: "/kaspersky_logo.svg",
    name: "Лаборатория Касперского",
    size: "h-72",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Partners() {
  const { isDarkMode } = useThemeStore();

  // Функция для получения правильного логотипа в зависимости от темы
  const getLogo = (logo: string | { dark: string; light: string }) => {
    if (typeof logo === "string") {
      return logo;
    }
    return isDarkMode ? logo.dark : logo.light;
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

      <section className="relative px-6 py-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("mb-12 text-center text-4xl font-bold md:text-5xl", {
              "text-white": isDarkMode,
              "text-gray-900": !isDarkMode,
            })}
          >
            Партнеры олимпиады
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center"
              >
                <div
                  className={cn(
                    "flex h-40 w-full items-center justify-center rounded-2xl p-6",
                    {
                      "bg-[#1e293b]/50": isDarkMode,
                      "bg-white shadow-md": !isDarkMode,
                    },
                  )}
                >
                  <img
                    src={getLogo(partner.logo)}
                    alt={partner.name}
                    className={cn("object-contain", partner.size)}
                  />
                </div>
                <motion.p
                  className={cn("mt-4 text-center text-xl", {
                    "text-gray-300": isDarkMode,
                    "text-gray-600": !isDarkMode,
                  })}
                >
                  {partner.name}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-10 flex items-center justify-center">
            <Link to="/">
              <Button className="px-7 py-3">Вернуться на главную</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
