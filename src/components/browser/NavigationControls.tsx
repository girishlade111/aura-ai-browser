
import { ArrowLeft, ArrowRight, RefreshCw, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationControlsProps {
  onHome?: () => void;
  onBack?: () => void;
  onForward?: () => void;
  onRefresh?: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
}

export function NavigationControls({
  onHome = () => console.log("Home clicked"),
  onBack = () => console.log("Back clicked"),
  onForward = () => console.log("Forward clicked"),
  onRefresh = () => console.log("Refresh clicked"),
  canGoBack = false,
  canGoForward = false,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onBack}
        disabled={!canGoBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onForward}
        disabled={!canGoForward}
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Forward</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onRefresh}
      >
        <RefreshCw className="h-4 w-4" />
        <span className="sr-only">Refresh</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onHome}
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Button>
    </div>
  );
}
