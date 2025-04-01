
import { useState, useEffect } from "react";
import { TabBar, type TabData } from "./TabBar";
import { NavigationControls } from "./NavigationControls";
import { AddressBar } from "./AddressBar";
import { ActionButtons } from "./ActionButtons";
import { BookmarkBar, type BookmarkData } from "./BookmarkBar";
import { AIAssistant } from "./AIAssistant";
import { toast } from "sonner";

export function Browser() {
  // State for tabs
  const [tabs, setTabs] = useState<TabData[]>([
    { id: "tab-1", title: "Google", url: "https://www.google.com", icon: "https://www.google.com/favicon.ico" },
    { id: "tab-2", title: "GitHub", url: "https://github.com", icon: "https://github.com/favicon.ico" },
  ]);
  
  const [activeTabId, setActiveTabId] = useState("tab-1");
  
  // State for bookmarks
  const [bookmarks, setBookmarks] = useState<BookmarkData[]>([
    { id: "bm-1", title: "Google", url: "https://www.google.com", icon: "https://www.google.com/favicon.ico" },
    { id: "bm-2", title: "GitHub", url: "https://github.com", icon: "https://github.com/favicon.ico" },
    { id: "bm-3", title: "YouTube", url: "https://www.youtube.com", icon: "https://www.youtube.com/favicon.ico" },
    { id: "bm-4", title: "Gmail", url: "https://mail.google.com", icon: "https://mail.google.com/favicon.ico" },
    { id: "bm-5", title: "Netflix", url: "https://www.netflix.com", icon: "https://www.netflix.com/favicon.ico" },
    { id: "bm-6", title: "Amazon", url: "https://www.amazon.com", icon: "https://www.amazon.com/favicon.ico" },
  ]);
  
  // State for AI Assistant
  const [isAIOpen, setIsAIOpen] = useState(false);
  
  // Browser content (this would be an iframe in a real browser)
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com");
  
  // Navigation history
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  
  // Set current URL based on active tab
  useEffect(() => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab) {
      setCurrentUrl(activeTab.url);
    }
  }, [activeTabId, tabs]);
  
  // Handle tab actions
  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };
  
  const handleTabClose = (tabId: string) => {
    if (tabs.length === 1) {
      // Don't close the last tab
      return;
    }
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    // If we're closing the active tab, activate the first available tab
    if (tabId === activeTabId) {
      setActiveTabId(newTabs[0].id);
    }
  };
  
  const handleNewTab = () => {
    const newTab: TabData = {
      id: `tab-${Date.now()}`,
      title: "New Tab",
      url: "about:blank",
    };
    
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };
  
  // Handle bookmark actions
  const handleBookmarkClick = (bookmarkId: string) => {
    const bookmark = bookmarks.find(bm => bm.id === bookmarkId);
    if (bookmark) {
      // In a real browser, we would navigate to this URL
      toast.info(`Navigating to ${bookmark.title}`);
      
      // Update the active tab's URL
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, title: bookmark.title, url: bookmark.url, icon: bookmark.icon } 
          : tab
      ));
    }
  };
  
  const handleAddBookmark = () => {
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    if (activeTab) {
      const newBookmark: BookmarkData = {
        id: `bm-${Date.now()}`,
        title: activeTab.title,
        url: activeTab.url,
        icon: activeTab.icon,
      };
      
      setBookmarks([...bookmarks, newBookmark]);
      toast.success("Bookmark added!");
    }
  };
  
  // Render content frame (in a real browser, this would be an iframe)
  const renderContentFrame = () => {
    // For this demo, just show the URL in a content box
    return (
      <div className="flex-1 bg-white dark:bg-zinc-900 flex items-center justify-center">
        <div className="max-w-2xl w-full p-8 text-center">
          <h1 className="text-3xl font-bold mb-6">Aura Browser Demo</h1>
          <p className="text-xl mb-8">
            Current URL: <span className="text-primary font-medium">{currentUrl}</span>
          </p>
          <p className="mb-6">
            This is a UI demo. In a real browser, this area would display the actual webpage content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto text-left">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold mb-2">Try the features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Click tabs to switch between them</li>
                <li>Add a new tab with the + button</li>
                <li>Click bookmarks to navigate</li>
                <li>Toggle light/dark mode</li>
              </ul>
            </div>
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-semibold mb-2">AI Features:</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Click the message icon to open AI assistant</li>
                <li>Type a question and press Enter</li>
                <li>Get AI-powered answers and help</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Tab bar */}
      <TabBar
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={handleTabClick}
        onTabClose={handleTabClose}
        onNewTab={handleNewTab}
      />
      
      {/* Navigation bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b">
        <NavigationControls
          canGoBack={canGoBack}
          canGoForward={canGoForward}
        />
        <AddressBar />
        <ActionButtons
          onOpenAI={() => setIsAIOpen(true)}
          onAddBookmark={handleAddBookmark}
          onOpenSettings={() => toast.info("Settings would open here")}
          onOpenMenu={() => toast.info("Menu would open here")}
        />
      </div>
      
      {/* Bookmark bar */}
      <BookmarkBar
        bookmarks={bookmarks}
        onBookmarkClick={handleBookmarkClick}
      />
      
      {/* Main content area */}
      {renderContentFrame()}
      
      {/* AI Assistant */}
      <AIAssistant
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
      />
    </div>
  );
}
