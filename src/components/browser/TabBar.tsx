
import { useRef } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tab } from "./Tab";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface TabData {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

interface TabBarProps {
  tabs: TabData[];
  activeTabId: string;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onNewTab: () => void;
}

export function TabBar({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onNewTab,
}: TabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="flex items-center h-10 bg-muted/40">
      <ScrollArea 
        className="flex-1 overflow-hidden"
      >
        <div className="flex items-center h-full fade-mask">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              title={tab.title}
              icon={tab.icon}
              active={tab.id === activeTabId}
              onClick={() => onTabClick(tab.id)}
              onClose={() => onTabClose(tab.id)}
            />
          ))}
        </div>
      </ScrollArea>
      
      <div className="flex-shrink-0 pl-2 pr-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 rounded-full"
          onClick={onNewTab}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">New Tab</span>
        </Button>
      </div>
    </div>
  );
}
