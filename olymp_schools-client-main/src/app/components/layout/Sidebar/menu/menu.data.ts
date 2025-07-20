import {
  BookOpenCheck,
  CheckSquare,
  Home,
  LucideIcon,
  Settings,
  Trophy,
  Users,
} from "lucide-react";

export interface IMenuItem {
  icon: LucideIcon;
  name: string;
  link: string;
}

export const MENU: IMenuItem[] = [
  {
    icon: Home,
    name: "Главная",
    link: "/",
  },
  {
    icon: Users,
    name: "Профиль",
    link: "/profile",
  },
  {
    icon: BookOpenCheck,
    name: 'Олимпиады',
    link: "/olympiads",
  },
  {
    icon: CheckSquare,
    name: "Новости",
    link: "/news",
  },
  {
    icon: Trophy,
    name: "Рейтинг",
    link: "/ranking",
  },
  {
    icon: Settings,
    name: "Настройки",
    link: "/settings",
  },
];
