import { m } from "framer-motion";
import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import Footer from "../components/layout/Footer/Footer";
import { columnVariants } from "../components/animations/columnVariants";

const Rankings = () => {
  const { isDarkMode } = useThemeStore();

  // Данные участников
  const participants = [
    {
      id: 1,
      lastName: "Иванов",
      firstName: "Дмитрий",
      middleName: "Константинович",
      grade: 11,
      region: "Москва",
      score: 450,
      status: "Победитель",
      details: "#",
    },
    {
      id: 2,
      lastName: "Петров",
      firstName: "Гордей",
      middleName: "Михайлович",
      grade: 10,
      region: "Московская область",
      score: 420,
      status: "Призер I степени",
      details: "#",
    },
    {
      id: 3,
      lastName: "Сидоров",
      firstName: "Алексей",
      middleName: "Викторович",
      grade: 11,
      region: "Санкт-Петербург",
      score: 416,
      status: "Призер II степени",
      details: "#",
    },
    {
      id: 4,
      lastName: "Кузнецов",
      firstName: "Артем",
      middleName: "Сергеевич",
      grade: 11,
      region: "Новосибирская область",
      score: 410,
      status: "Призер II степени",
      details: "#",
    },
    {
      id: 5,
      lastName: "Смирнова",
      firstName: "Анна",
      middleName: "Александровна",
      grade: 10,
      region: "Московская область",
      score: 405,
      status: "Призер III степени",
      details: "#",
    },
    {
      id: 6,
      lastName: "Попов",
      firstName: "Максим",
      middleName: "Игоревич",
      grade: 11,
      region: "Свердловская область",
      score: 398,
      status: "Призер III степени",
      details: "#",
    },
    {
      id: 7,
      lastName: "Васильев",
      firstName: "Кирилл",
      middleName: "Дмитриевич",
      grade: 10,
      region: "Республика Чувашия",
      score: 395,
      status: "Участник",
      details: "#",
    },
    {
      id: 8,
      lastName: "Новикова",
      firstName: "Елизавета",
      middleName: "Андреевна",
      grade: 11,
      region: "Краснодарский край",
      score: 390,
      status: "Участник",
      details: "#",
    },
    {
      id: 9,
      lastName: "Федоров",
      firstName: "Даниил",
      middleName: "Романович",
      grade: 10,
      region: "Нижегородская область",
      score: 385,
      status: "Участник",
      details: "#",
    },
    {
      id: 10,
      lastName: "Морозова",
      firstName: "София",
      middleName: "Владимировна",
      grade: 11,
      region: "Челябинская область",
      score: 380,
      status: "Участник",
      details: "#",
    },
    {
      id: 11,
      lastName: "Волков",
      firstName: "Илья",
      middleName: "Артемович",
      grade: 10,
      region: "Самарская область",
      score: 375,
      status: "Участник",
      details: "#",
    },
    {
      id: 12,
      lastName: "Алексеева",
      firstName: "Мария",
      middleName: "Сергеевна",
      grade: 11,
      region: "Ростовская область",
      score: 370,
      status: "Участник",
      details: "#",
    },
    {
      id: 13,
      lastName: "Лебедев",
      firstName: "Андрей",
      middleName: "Олегович",
      grade: 10,
      region: "Москва",
      score: 365,
      status: "Участник",
      details: "#",
    },
    {
      id: 14,
      lastName: "Семенова",
      firstName: "Виктория",
      middleName: "Денисовна",
      grade: 11,
      region: "Пермский край",
      score: 360,
      status: "Участник",
      details: "#",
    },
    {
      id: 15,
      lastName: "Егоров",
      firstName: "Михаил",
      middleName: "Алексеевич",
      grade: 10,
      region: "Красноярский край",
      score: 355,
      status: "Участник",
      details: "#",
    },
  ];

  return (
    <div
      className={cn("flex min-h-screen w-screen flex-col font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />
      <div className="flex flex-1 items-center justify-center p-4">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn("w-full max-w-6xl rounded-2xl p-8 shadow-xl", {
            "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
              isDarkMode,
            "bg-gradient-to-br from-blue-50 to-blue-100": !isDarkMode,
          })}
        >
          {/* Заголовок */}
          <div className="mb-8 flex flex-col items-center">
            <h1 className="mb-2 text-4xl font-bold">Итоги Олимпиады</h1>
            <div
              className={cn("w-full border-b py-4 text-center", {
                "border-blue-700/30": isDarkMode,
                "border-blue-300": !isDarkMode,
              })}
            >
              <h3 className="mt-2 text-xl">
                Рейтинговая таблица заключительного этапа олимпиады школьников
              </h3>
            </div>
            {/* Подпись под заголовком */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={cn("text-md mt-6 text-center font-bold", {
                "text-blue-300/80": isDarkMode,
                "text-blue-600/80": !isDarkMode,
              })}
            >
              <p>Кнопки кликабельны и ведут к проектам в цифровом формате</p>
            </m.div>
          </div>

          {/* Таблица результатов */}
          <div className="overflow-x-auto">
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
                    "Класс/Курс",
                    "Регион",
                    "Балл",
                    "Статус",
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
                      custom={4}
                      initial="hidden"
                      animate="visible"
                      variants={columnVariants}
                      className="px-4 py-3 text-center"
                    >
                      {participant.grade}
                    </m.td>
                    <m.td
                      custom={5}
                      initial="hidden"
                      animate="visible"
                      variants={columnVariants}
                      className="px-4 py-3 text-center"
                    >
                      {participant.region}
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
                      <Button
                        className={cn("text-md w-2xs px-2 py-2", {
                          "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400":
                            isDarkMode,
                          "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300":
                            !isDarkMode,
                        })}
                      >
                        {participant.status === "Победитель"
                          ? "Победитель"
                          : participant.status}
                      </Button>
                    </m.td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </m.div>
      </div>
      <Footer />
    </div>
  );
};

export default Rankings;
