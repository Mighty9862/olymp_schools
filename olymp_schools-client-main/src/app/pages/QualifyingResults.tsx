import { Link } from "react-router-dom";
import cn from "clsx";
import { m } from "framer-motion";
import { useThemeStore } from "../stores/themeStore";
import { Button } from "../components/ui/Button";
import Footer from "../components/layout/Footer/Footer";
import { fadeUp } from "../components/animations/fadeUp";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import Navbar from "../components/layout/Navbar/Navbar";
import { columnVariants } from "../components/animations/columnVariants";

function QualifyingResults() {
  const { isDarkMode } = useThemeStore();

  // Моковые данные участников
  const participants = [
    {
      id: 1,
      lastName: "Иванов",
      firstName: "Иван",
      middleName: "Иванович",
      grade: "11 класс",
      region: "Москва",
      score: 95,
    },
    {
      id: 2,
      lastName: "Петрова",
      firstName: "Анна",
      middleName: "Сергеевна",
      grade: "10 класс",
      region: "Санкт-Петербург",
      score: 89,
    },
    {
      id: 3,
      lastName: "Сидоров",
      firstName: "Алексей",
      middleName: "Дмитриевич",
      grade: "11 класс",
      region: "Новосибирск",
      score: 78,
    },
    {
      id: 4,
      lastName: "Кузнецова",
      firstName: "Мария",
      middleName: "Алексеевна",
      grade: "9 класс",
      region: "Екатеринбург",
      score: 85,
    },
    {
      id: 5,
      lastName: "Васильев",
      firstName: "Павел",
      middleName: "Игоревич",
      grade: "10 класс",
      region: "Казань",
      score: 82,
    },
    {
      id: 6,
      lastName: "Морозова",
      firstName: "Екатерина",
      middleName: "Владимировна",
      grade: "11 класс",
      region: "Самара",
      score: 91,
    },
    {
      id: 7,
      lastName: "Смирнов",
      firstName: "Дмитрий",
      middleName: "Андреевич",
      grade: "9 класс",
      region: "Ростов-на-Дону",
      score: 76,
    },
    {
      id: 8,
      lastName: "Попова",
      firstName: "Ольга",
      middleName: "Петровна",
      grade: "10 класс",
      region: "Воронеж",
      score: 88,
    },
    {
      id: 9,
      lastName: "Козлов",
      firstName: "Георгий",
      middleName: "Алексеевич",
      grade: "11 класс",
      region: "Краснодар",
      score: 93,
    },
    {
      id: 10,
      lastName: "Соколова",
      firstName: "Алина",
      middleName: "Сергеевна",
      grade: "9 класс",
      region: "Пермь",
      score: 80,
    },
    {
      id: 11,
      lastName: "Михайлов",
      firstName: "Виктор",
      middleName: "Денисович",
      grade: "10 класс",
      region: "Тюмень",
      score: 86,
    },
    {
      id: 12,
      lastName: "Федорова",
      firstName: "Светлана",
      middleName: "Игоревна",
      grade: "11 класс",
      region: "Уфа",
      score: 90,
    },
    {
      id: 13,
      lastName: "Волков",
      firstName: "Артём",
      middleName: "Валерьевич",
      grade: "10 класс",
      region: "Челябинск",
      score: 79,
    },
    {
      id: 14,
      lastName: "Зайцева",
      firstName: "Елена",
      middleName: "Андреевна",
      grade: "9 класс",
      region: "Омск",
      score: 84,
    },
    {
      id: 15,
      lastName: "Григорьев",
      firstName: "Максим",
      middleName: "Павлович",
      grade: "11 класс",
      region: "Владивосток",
      score: 92,
    },
  ];

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
        <div className="w-10xl mx-auto max-w-6xl">
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
              Результаты Отборочного этапа
            </h2>

            <div
              className={cn("rounded-2xl p-8 text-lg", {
                "bg-[#0b0f1a] outline-2 outline-blue-900": isDarkMode,
                "bg-white shadow-md outline-2 outline-blue-500": !isDarkMode,
              })}
            >
              <p className="mb-6">
                Рейтинговая таблица итогов проведения Отборочного этапа
                Олимпиады школьников «Университет цифровой полиции» по
                информационной безопасности.
              </p>

              <div className="mb-6 rounded-lg border border-blue-900/20 bg-blue-900/10 p-4">
                <p className="font-semibold">
                  260 участников получают электронный сертификат участника
                  Олимпиады.
                </p>
              </div>

              <a
                href="https://mvd.ru/upload/site116/folder_page/045/106/727/final_20_3.pdf"
                className="mb-4 text-xl font-semibold text-blue-400"
              >
                Финалисты Олимпиады школьников «Университет цифровой полиции» по
                информационной безопасности 2024-2025 учебного года.
              </a>

              {/* Таблица участников */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr
                      className={cn({
                        "bg-blue-800/30": isDarkMode,
                        "bg-blue-200": !isDarkMode,
                      })}
                    >
                      {[
                        "№ п/п",
                        "Фамилия",
                        "Имя",
                        "Отчество",
                        "Балл",
                        "Сертификат",
                      ].map((header, i) => (
                        <m.th
                          key={i}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className={cn("px-4 py-3 text-center align-middle", {
                            "text-blue-300": isDarkMode,
                            "text-blue-800": !isDarkMode,
                          })}
                        >
                          {header}
                        </m.th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant, index) => (
                      <tr
                        key={participant.id}
                        className={cn("border-b", {
                          "border-blue-700/30 hover:bg-blue-900/10": isDarkMode,
                          "border-blue-200 hover:bg-blue-100": !isDarkMode,
                        })}
                      >
                        <m.td
                          custom={0}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className="px-4 py-3 text-center"
                        >
                          {index + 1}
                        </m.td>
                        <m.td
                          custom={1}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className="px-4 py-3 text-center"
                        >
                          {participant.lastName}
                        </m.td>
                        <m.td
                          custom={2}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className="px-4 py-3 text-center"
                        >
                          {participant.firstName}
                        </m.td>
                        <m.td
                          custom={3}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className="px-4 py-3 text-center"
                        >
                          {participant.middleName}
                        </m.td>
                        <m.td
                          custom={6}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className={cn("px-4 py-3 text-center font-medium", {
                            "text-blue-400": isDarkMode,
                            "text-blue-600": !isDarkMode,
                          })}
                        >
                          {participant.score}
                        </m.td>
                        <m.td
                          custom={7}
                          initial="hidden"
                          animate="visible"
                          variants={columnVariants}
                          className="px-4 py-3 text-center"
                        >
                          <Button className="px-8 py-2 text-center">
                            Скачать
                          </Button>
                        </m.td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Button>Скачать полную рейтинговую таблицу (PDF)</Button>
                <Button>Скачать все сертификаты (ZIP)</Button>
              </div>
            </div>

            <div className="flex justify-center gap-4">
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

export default QualifyingResults;
