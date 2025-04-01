
import { X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TabProps {
  title: string;
  icon?: string;
  active?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

export function Tab({ 
  title, 
  icon, 
  active = false, 
  onClose, 
  onClick 
}: TabProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        "browser-tab group",
        active && "active"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && (
        <img src={icon} alt="" className="h-4 w-4 rounded-sm" />
      )}
      
      <span className="truncate max-w-[140px]">{title}</span>
      
      <button
        className={cn(
          "h-5 w-5 rounded-full flex items-center justify-center transition-all",
          (active || isHovered) ? "opacity-100" : "opacity-0",
          "hover:bg-muted"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Close tab</span>
      </button>
    </div>
  );
}
