import { m } from "framer-motion";
import Navbar from "../components/layout/Navbar/Navbar";
import { BackgroundBlobs } from "../components/ui/BackgroundBlobs/BackgroundBlobs";
import { Button } from "../components/ui/Button";
import { useThemeStore } from "../stores/themeStore";
import cn from "clsx";
import Footer from "../components/layout/Footer/Footer";
import { columnVariants } from "../components/animations/columnVariants";
import { rankings } from "../../data/mockData";

const Rankings = () => {
  const { isDarkMode } = useThemeStore();

  // Filter winners
  const winners = rankings.filter(
    (participant) => participant.status !== "Участник",
  );

  return (
    <div
      className={cn("flex min-h-screen w-screen flex-col font-sans", {
        "bg-[#0b0f1a] text-white": isDarkMode,
        "bg-gray-50 text-gray-900": !isDarkMode,
      })}
    >
      <BackgroundBlobs />
      <Navbar />
      <div className="flex flex-1 flex-col items-center gap-8 p-4">
        {/* Работы победителей */}
        {winners.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "w-full max-w-6xl rounded-2xl border border-blue-600 p-8 shadow-xl",
              {
                "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
                  isDarkMode,
                "bg-gradient-to-br from-blue-50 to-blue-100": !isDarkMode,
              },
            )}
          >
            <div className="mb-6 flex flex-col items-center">
              <h2 className="text-3xl font-bold">Проекты победителей</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {winners.map((winner, index) => (
                <m.div
                  key={`winner-${winner.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "rounded-lg p-4 transition-all hover:shadow-lg",
                    {
                      "bg-blue-900/20 hover:bg-blue-900/30": isDarkMode,
                      "bg-blue-200/40": !isDarkMode,
                    },
                  )}
                >
                  <h2 className="text-lg font-bold text-blue-400">
                    {winner.status}
                  </h2>
                  <h3 className="justify-center text-lg font-semibold">
                    {winner.lastName} {winner.firstName} {winner.middleName}
                  </h3>
                  <p className="text-md opacity-80">{winner.region}</p>
                  <p className="my-2 font-bold">{winner.score} баллов</p>
                  {winner.details ? (
                    <a
                      href={winner.details}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        className={cn("mt-2 w-full text-sm", {
                          "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400":
                            isDarkMode,
                          "bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-300":
                            !isDarkMode,
                        })}
                      >
                        Посмотреть работу
                      </Button>
                    </a>
                  ) : (
                    <p className="mt-2 text-sm opacity-70">
                      Работа не загружена
                    </p>
                  )}
                </m.div>
              ))}
            </div>
          </m.div>
        )}

        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "w-full max-w-6xl rounded-2xl border border-blue-600 p-8 shadow-xl",
            {
              "bg-gradient-to-br from-[#0f172a] via-[#101b36] to-[#14213d]":
                isDarkMode,
              "bg-gradient-to-br from-blue-50 to-blue-100": !isDarkMode,
            },
          )}
        >
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
                {[...rankings]
                  .sort((a, b) => b.score - a.score)
                  .map((participant, index) => (
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
                            "bg-gray-600/50 hover:bg-gray-600/70": isDarkMode,
                            "bg-gray-300 hover:bg-gray-400": !isDarkMode,
                          })}
                          disabled
                        >
                          {participant.status}
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
