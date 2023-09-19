import { PaintArea } from "@/widgets/area";
import { Header } from "@/widgets/header";
import { SidebarProperties } from "@/widgets/sidebars/sidebar-properties";
import { SidebarItems } from "@/widgets/sidebars/siderbar-items";

export const PaintPage = () => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="grid grid-cols-[240px,1fr,240px] w-full h-full">
        <SidebarItems />
        <PaintArea />
        <SidebarProperties />
      </div>
    </div>
  );
};
