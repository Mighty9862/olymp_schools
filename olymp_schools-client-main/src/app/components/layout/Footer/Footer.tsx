import cn from "clsx";
import { useThemeStore } from "../../../stores/themeStore";

function Footer() {
  const { isDarkMode } = useThemeStore();

  return (
    <footer
      className={cn(
        "text-md grid grid-cols-1 gap-4 border-t py-4 text-center text-gray-500 md:grid-cols-2",
        {
          "border-[#2c313c] bg-[#0d1117]": isDarkMode,
          "border-gray-200 bg-white": !isDarkMode,
        },
      )}
    >
      <section>
        Проект разработан <br /> курсантами факультета подготовки специалистов в
        области информационной безопасности <br /> Московского университета МВД
        России имени В.Я. Кикотя
      </section>
      <section>
        Организационный комитет
        <br />
        почта: olimpiada.mosu@mail.ru
        <br />
        тел.: +7 499 789-67-47, +7 499 745-91-46
      </section>
    </footer>
  );
}

export default Footer;
