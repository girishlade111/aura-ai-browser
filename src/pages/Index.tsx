
import { Browser } from "@/components/browser/Browser";
import { ThemeProvider } from "@/components/browser/ThemeProvider";

const Index = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen bg-background">
        <Browser />
      </div>
    </ThemeProvider>
  );
};

export default Index;
