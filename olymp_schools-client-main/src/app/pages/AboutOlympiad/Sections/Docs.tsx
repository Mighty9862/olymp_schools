import { m } from "framer-motion";
import { fadeUp } from "../../../components/animations/fadeUp";
import { useThemeStore } from "../../../stores/themeStore";
import cn from "clsx";
import { IDocs } from "../../../types/IDocs.type";

function Docs() {
  const { isDarkMode } = useThemeStore();

  const docs: IDocs[] = [
    {
      title: "Регламент",
      link: "https://mvd.ru/upload/site116/folder_page/041/907/599/Reglament_2024-2025.pdf",
    },
    {
      title: "Методика оценки",
      link: "https://mvd.ru/upload/site116/folder_page/041/907/599/Metodika_otsenki_2024-2025.pdf",
    },
    {
      title: "Положение",
      link: "https://mvd.ru/upload/site116/folder_page/041/907/599/Polozhenie_Olimpiada_MosU.pdf",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-3">
      {docs.map((item, i) => (
        <a key={i} href={item.link} target="_blank">
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            className={cn(
              "cursor-pointer rounded-xl p-6 py-6 text-lg font-medium shadow-xl transition",
              {
                "bg-[#14181d] text-blue-300 hover:shadow-blue-500/20":
                  isDarkMode,
                "border border-gray-200 bg-white text-blue-600 shadow-sm hover:shadow-blue-200":
                  !isDarkMode,
              },
            )}
          >
            {item.title}
          </m.div>
        </a>
      ))}
    </div>
  );
}

export default Docs;
