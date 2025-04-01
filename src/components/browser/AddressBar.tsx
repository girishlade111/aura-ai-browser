
import { Search } from "lucide-react";
import { useState } from "react";

export function AddressBar() {
  const [url, setUrl] = useState("https://www.google.com");
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Navigating to: ${url}`);
    // Here we would handle actual navigation in a real browser
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
