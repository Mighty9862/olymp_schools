import Menu from "./menu/Menu";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { m } from "framer-motion";
import cn from "clsx";
import { useSidebarStore } from "../../../stores/SidebarStore";

function Sidebar() {
  const { isCollapsed, setIsCollapsed } = useSidebarStore();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <m.aside
      className={cn(
        "fixed z-40 top-4 left-4 w-56 overflow-hidden rounded-lg bg-neutral-50 py-2 whitespace-nowrap shadow-lg",
        { "flex items-center p-2 first:pt-[2.7rem]": isCollapsed },
      )}
      animate={{ width: isCollapsed ? 50 : 224 }}
      transition={{ type: "spring", stiffness: 200, damping: 28 }}
    >
      <button
        onClick={toggleSidebar}
        className={cn(
          "cursor-pointer items-center justify-center opacity-50 hover:opacity-100",
          { "absolute top-1 left-3.5 h-12 w-12": isCollapsed },
          { "top-1 right-1 m-1.5": !isCollapsed },
        )}
      >
        {isCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
      </button>
      <Menu />
    </m.aside>
  );
}

export default Sidebar;
