
import { X, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant({
  isOpen,
  onClose,
  className,
}: AIAssistantProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: `This is a simulated response to: "${input}"`,
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-y-0 right-0 w-80 md:w-96 bg-popover border-l border-border shadow-lg flex flex-col animate-slide-in-right z-50",
        className
      )}
    >
      <div className="flex items-center justify-between p-3 border-b">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-lg p-3",
                message.role === "user"
                  ? "bg-primary text-primary-foreground self-end"
                  : "bg-muted self-start"
              )}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-muted self-start max-w-[85%] rounded-lg p-3">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSubmit} className="p-3 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 px-3 py-2 text-sm rounded-md bg-background border focus:outline-none focus:ring-1 focus:ring-primary"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
