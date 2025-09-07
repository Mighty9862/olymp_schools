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
import { qualifResults } from "../../data/mockData";
import { useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

function QualifyingResults() {
  const { isDarkMode } = useThemeStore();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 400);

  // Фильтрация и сортировка с использованием поискового значения
  const sortedParticipants = [...qualifResults].sort(
    (a, b) => b.score - a.score,
  );

  // Фильтр с сохранением места в рей
  const filteredParticipants = sortedParticipants.filter((participant) => {
    const fullName =
      `${participant.lastName} ${participant.firstName} ${participant.middleName}`.toLowerCase();
    return fullName.includes(debouncedSearch.toLowerCase().trim());
  });

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
                  Участники, набравшие больше 20 баллов, получают электронный
                  сертификат участника Олимпиады.
                </p>
              </div>

              <a
                href="https://mvd.ru/upload/site116/folder_page/045/106/727/final_20_3.pdf"
                className="mb-4 text-xl font-semibold text-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Участники, прошедшие в финал Олимпиады школьников «Университет
                цифровой полиции» по информационной безопасности 2024-2025
                учебного года.
              </a>

              {/* Поле поиска */}
              <div className="mt-6">
                <label
                  htmlFor="search"
                  className="text-md mb-2 block font-medium"
                >
                  Поиск по ФИО
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Введите фамилию, имя или отчество..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-2 text-base focus:ring-2 focus:outline-none",
                    {
                      "border-blue-700 bg-gray-800 text-white focus:ring-blue-500":
                        isDarkMode,
                      "border-blue-300 bg-white text-gray-900 focus:ring-blue-400":
                        !isDarkMode,
                    },
                  )}
                />
              </div>

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
                      {["№ п/п", "Фамилия", "Имя", "Отчество", "Балл"].map(
                        (header, i) => (
                          <m.th
                            key={i}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            variants={columnVariants}
                            className={cn(
                              "px-4 py-3 text-center align-middle",
                              {
                                "text-blue-300": isDarkMode,
                                "text-blue-800": !isDarkMode,
                              },
                            )}
                          >
                            {header}
                          </m.th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredParticipants.length > 0 ? (
                      filteredParticipants.map((participant) => {
                        // Настоящий номер в рейтинге
                        const rank =
                          sortedParticipants.findIndex(
                            (p) => p.id === participant.id,
                          ) + 1;
                        return (
                          <tr
                            key={participant.id}
                            className={cn("border-b", {
                              "border-blue-700/30 hover:bg-blue-900/10":
                                isDarkMode,
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
                              {rank}
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
                              className={cn(
                                "px-4 py-3 text-center font-medium",
                                {
                                  "text-blue-400": isDarkMode,
                                  "text-blue-600": !isDarkMode,
                                },
                              )}
                            >
                              {participant.score}
                            </m.td>
                          </tr>
                        );
                      })
                    ) : (
                      <m.tr
                        initial="hidden"
                        animate="visible"
                        variants={columnVariants}
                      >
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-lg"
                        >
                          <p
                            className={cn({
                              "text-blue-300": isDarkMode,
                              "text-blue-700": !isDarkMode,
                            })}
                          >
                            Участник не найден
                          </p>
                        </td>
                      </m.tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="https://mvd.ru/upload/site116/folder_page/045/106/727/Ranzhirovannye_spiski_2_compressed.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button>Открыть полную рейтинговую таблицу (PDF)</Button>
                </a>
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
