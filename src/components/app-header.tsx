import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import { UserDropdown } from "./user-dropdown";

export const AppHeader = () => {
  return (
    <header className="flex justify-between items-center border w-full px-2 py-1 mt-2 bg-sidebar">
      <SidebarTrigger />
      <div className="flex items-center justify-center gap-4">
        <ThemeToggle size="icon-lg" variant="outline" />
        <UserDropdown />
      </div>
    </header>
  );
};
