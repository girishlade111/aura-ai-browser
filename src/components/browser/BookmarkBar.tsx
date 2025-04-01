
import { Bookmark, Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface BookmarkData {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

interface BookmarkBarProps {
  bookmarks: BookmarkData[];
  onBookmarkClick: (id: string) => void;
  className?: string;
}

export function BookmarkBar({
  bookmarks,
  onBookmarkClick,
  className
}: BookmarkBarProps) {
  return (
    <div className={cn("h-9 flex items-center bg-muted/20 px-2", className)}>
      <ScrollArea className="w-full fade-mask">
        <div className="flex items-center gap-1 py-1">
          {bookmarks.map((bookmark) => (
            <button
              key={bookmark.id}
              className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-md whitespace-nowrap hover:bg-muted/60 transition-colors"
              onClick={() => onBookmarkClick(bookmark.id)}
            >
              {bookmark.icon ? (
                <img src={bookmark.icon} alt="" className="h-3.5 w-3.5 rounded-sm" />
              ) : (
                <Star className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <span className="truncate max-w-[120px]">{bookmark.title}</span>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
