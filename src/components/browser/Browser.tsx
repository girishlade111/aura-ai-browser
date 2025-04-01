
import { useState, useEffect, useRef } from "react";
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
  
  // Browser content
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com");
  
  // Navigation history for each tab
  const [navigationHistory, setNavigationHistory] = useState<Record<string, string[]>>({});
  const [historyPosition, setHistoryPosition] = useState<Record<string, number>>({});
  
  // Refs
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Initialize history for new tabs
  useEffect(() => {
    const newNavigationHistory = { ...navigationHistory };
    const newHistoryPosition = { ...historyPosition };
    
    tabs.forEach(tab => {
      if (!newNavigationHistory[tab.id]) {
        newNavigationHistory[tab.id] = [tab.url];
        newHistoryPosition[tab.id] = 0;
      }
    });
    
    setNavigationHistory(newNavigationHistory);
    setHistoryPosition(newHistoryPosition);
  }, [tabs]);
  
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
  
  // Handle navigation
  const handleNavigate = (url: string) => {
    // Update the active tab's URL
    const updatedTabs = tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url, title: new URL(url).hostname } 
        : tab
    );
    setTabs(updatedTabs);
    setCurrentUrl(url);
    
    // Update navigation history
    const tabHistory = [...(navigationHistory[activeTabId] || [])];
    const currentPosition = historyPosition[activeTabId] || 0;
    
    // If we're not at the end of history, truncate everything after current position
    const newHistory = tabHistory.slice(0, currentPosition + 1);
    newHistory.push(url);
    
    setNavigationHistory({
      ...navigationHistory,
      [activeTabId]: newHistory
    });
    
    setHistoryPosition({
      ...historyPosition,
      [activeTabId]: newHistory.length - 1
    });
  };
  
  const handleGoBack = () => {
    const tabHistory = navigationHistory[activeTabId];
    const currentPosition = historyPosition[activeTabId];
    
    if (tabHistory && currentPosition > 0) {
      const newPosition = currentPosition - 1;
      const previousUrl = tabHistory[newPosition];
      
      // Update position and current URL
      setHistoryPosition({
        ...historyPosition,
        [activeTabId]: newPosition
      });
      
      // Update the tab URL
      setTabs(tabs.map(tab => 
        tab.id === activeTabId ? { ...tab, url: previousUrl } : tab
      ));
      
      setCurrentUrl(previousUrl);
    }
  };
  
  const handleGoForward = () => {
    const tabHistory = navigationHistory[activeTabId];
    const currentPosition = historyPosition[activeTabId];
    
    if (tabHistory && currentPosition < tabHistory.length - 1) {
      const newPosition = currentPosition + 1;
      const nextUrl = tabHistory[newPosition];
      
      // Update position and current URL
      setHistoryPosition({
        ...historyPosition,
        [activeTabId]: newPosition
      });
      
      // Update the tab URL
      setTabs(tabs.map(tab => 
        tab.id === activeTabId ? { ...tab, url: nextUrl } : tab
      ));
      
      setCurrentUrl(nextUrl);
    }
  };
  
  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = currentUrl;
    }
  };
  
  const handleHome = () => {
    handleNavigate("https://www.google.com");
  };
  
  // Check if we can navigate back/forward
  const canGoBack = () => {
    const position = historyPosition[activeTabId];
    return position && position > 0;
  };
  
  const canGoForward = () => {
    const position = historyPosition[activeTabId];
    const history = navigationHistory[activeTabId];
    return position !== undefined && history && position < history.length - 1;
  };
  
  // Handle bookmark actions
  const handleBookmarkClick = (bookmarkId: string) => {
    const bookmark = bookmarks.find(bm => bm.id === bookmarkId);
    if (bookmark) {
      handleNavigate(bookmark.url);
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
  
  // Render content frame with iframe
  const renderContentFrame = () => {
    return (
      <div className="flex-1 bg-white dark:bg-zinc-900 flex items-center justify-center">
        <iframe 
          ref={iframeRef}
          src={currentUrl} 
          className="w-full h-full border-0"
          title="Browser Content"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
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
          canGoBack={canGoBack()}
          canGoForward={canGoForward()}
          onBack={handleGoBack}
          onForward={handleGoForward}
          onRefresh={handleRefresh}
          onHome={handleHome}
        />
        <AddressBar 
          initialUrl={currentUrl}
          onNavigate={handleNavigate}
        />
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
