import { NavLink } from "react-router-dom";
import { IMenuItem } from "./menu.data";
import { useSidebarStore } from "../../../../stores/SidebarStore";
import cn from "clsx";

function MenuItem({ item }: { item: IMenuItem }) {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);

  return (
    <NavLink
      to={item.link}
      style={{ gridTemplateColumns: isCollapsed ? "1fr" : "1fr 6fr" }}
      className={({ isActive }) =>
        cn(
          "group grid items-center gap-3 rounded-md px-1.5 py-3.5 transition-colors duration-300 ease-in-out",
          {
            "bg-white/10": isActive,
            "hover:bg-white/10": !isCollapsed,
          },
        )
      }
    >
      <item.icon className="text-xl transition-colors duration-300 group-hover:text-blue-800" />
      {!isCollapsed && <span className="group-hover:text-blue-800 group-hover:font-semibold">{item.name}</span>}
    </NavLink>
  );
}

export default MenuItem;
