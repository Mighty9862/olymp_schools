import { m } from "framer-motion";
import { Button } from "../../../components/ui/Button";
import { useThemeStore } from "../../../stores/themeStore";
import { Link } from "react-router-dom";
import cn from "clsx";

function Results() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="flex flex-col items-center gap-10">
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={cn("max-w-4xl text-lg", {
          "text-gray-400": isDarkMode,
          "text-gray-600": !isDarkMode,
        })}
      >
        Здесь публикуются финальные баллы участников, список победителей и
        аналитика прохождения этапов. Все данные доступны для скачивания в
        формате PDF и доступны на портале личного кабинета.
      </m.p>
      <Link to={"/ranking"}>
        <Button className="px-7 py-4">Перейти к результатам</Button>
      </Link>
    </div>
  );
}

export default Results;
