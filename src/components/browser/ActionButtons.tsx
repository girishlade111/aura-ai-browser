
import { Bookmark, Menu, MessageSquare, Moon, Settings, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "./ThemeProvider";

interface ActionButtonsProps {
  onOpenAI: () => void;
  onOpenSettings: () => void;
  onAddBookmark: () => void;
  onOpenMenu: () => void;
}

export function ActionButtons({
  onOpenAI,
  onOpenSettings,
  onAddBookmark,
  onOpenMenu,
}: ActionButtonsProps) {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  
  return (
    <div className="flex items-center gap-0.5 mr-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onOpenAI}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">AI Assistant</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>AI Assistant</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onAddBookmark}
          >
            <Bookmark className="h-4 w-4" />
            <span className="sr-only">Add Bookmark</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Add Bookmark</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle Theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Toggle Theme</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onOpenSettings}
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Settings</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onOpenMenu}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Menu</TooltipContent>
      </Tooltip>
    </div>
  );
}
