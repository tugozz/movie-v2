import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export const ThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const handleThemeChange = () => setTheme(isDarkMode ? "light" : "dark");
  return (
    <div>
      <Button size="icon" onClick={handleThemeChange}>
        {isDarkMode ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
};
