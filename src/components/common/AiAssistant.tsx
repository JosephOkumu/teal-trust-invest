
import { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      content: "Hello! I'm your AI investment assistant. How can I help you today?", 
      sender: 'ai' 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: newMessage,
      sender: 'user'
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      // This would be replaced with actual API call to your backend
      const aiResponse = {
        id: messages.length + 2,
        content: "Thanks for your message. This is a placeholder response. In the real app, I'll connect to your backend API to provide personalized investment advice and answer your questions.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Floating button */}
      <Button 
        onClick={toggleAssistant}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 flex items-center justify-center ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-500 hover:bg-teal-600'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Assistant dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-card rounded-lg shadow-xl border border-border z-50 flex flex-col h-[500px] max-h-[70vh]">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center space-x-3">
            <Avatar className="h-9 w-9 bg-teal-100">
              <AvatarFallback className="bg-teal-500 text-white">AI</AvatarFallback>
              <AvatarImage src="/ai-assistant.png" />
            </Avatar>
            <div>
              <h3 className="font-medium">AI Investment Assistant</h3>
              <p className="text-xs text-muted-foreground">Ask me about stocks or investing</p>
            </div>
          </div>
          
          {/* Message area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-teal-500 text-white' 
                      : 'bg-secondary'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="flex items-center mb-1 space-x-1">
                      <Bot size={14} />
                      <span className="text-xs font-medium">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Input area */}
          <form onSubmit={sendMessage} className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Ask about investments..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send size={18} />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
