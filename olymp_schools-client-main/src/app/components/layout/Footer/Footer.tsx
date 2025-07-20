import cn from "clsx";
import { useThemeStore } from "../../../stores/themeStore";

function Footer() {
  const { isDarkMode } = useThemeStore();

  return (
    <footer
      className={cn("grid grid-cols-2 text-center border-t py-6 text-sm text-gray-500", {
        "border-[#2c313c] bg-[#0d1117]": isDarkMode,
        "border-gray-200 bg-white": !isDarkMode,
      })}
    >
      <section>
        Официальный сайт Министерства внутренних дел Российской Федерации
        <br />© 2025, МВД России
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
