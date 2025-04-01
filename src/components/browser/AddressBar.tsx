
import { Search } from "lucide-react";
import { useState } from "react";

interface AddressBarProps {
  initialUrl?: string;
  onNavigate?: (url: string) => void;
}

export function AddressBar({ initialUrl = "https://www.google.com", onNavigate }: AddressBarProps) {
  const [url, setUrl] = useState(initialUrl);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure URL has a protocol
    let navigateUrl = url;
    if (!navigateUrl.startsWith('http://') && !navigateUrl.startsWith('https://')) {
      navigateUrl = `https://${navigateUrl}`;
    }
    
    // Update the URL with the corrected version
    setUrl(navigateUrl);
    
    // Call the navigation callback
    if (onNavigate) {
      onNavigate(navigateUrl);
    }
    
    console.log(`Navigating to: ${navigateUrl}`);
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex-1 max-w-4xl mx-auto bg-muted/50 rounded-full overflow-hidden transition-all"
    >
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full py-1.5 pl-9 pr-3 bg-transparent focus:outline-none ${isFocused ? 'text-foreground' : 'text-muted-foreground'}`}
        placeholder="Search or enter website name"
      />
    </form>
  );
}
