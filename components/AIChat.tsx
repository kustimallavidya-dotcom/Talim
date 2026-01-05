
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, BrainCircuit } from 'lucide-react';
import { askUstadAI } from '../services/geminiService';
import { Language } from '../types';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const AIChat: React.FC<{ lang: Language }> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Namaste! I am Ustad AI. How can I help you today regarding Kushti training or culture?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const botResponse = await askUstadAI(input, lang);
    const botMsg: Message = { id: (Date.now() + 1).toString(), text: botResponse || "Sorry beta, I'm resting.", sender: 'bot' };
    
    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[75vh] bg-white rounded-xl shadow-lg border border-stone-200 m-4 overflow-hidden">
      <div className="p-4 saffron-gradient text-white flex items-center gap-3">
        <BrainCircuit size={24} />
        <div>
          <h2 className="font-bold">Ustad AI Assistant</h2>
          <p className="text-[10px] opacity-90 tracking-wide">Tradition meets Technology</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl flex gap-3 ${
              msg.sender === 'user' 
                ? 'bg-orange-600 text-white rounded-tr-none' 
                : 'bg-stone-100 text-stone-800 rounded-tl-none border border-stone-200'
            }`}>
              <div className="shrink-0 mt-1">
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-stone-100 p-3 rounded-2xl animate-pulse flex gap-2">
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-stone-100 flex gap-2">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about diet, exercise, or techniques..."
          className="flex-1 bg-stone-50 border border-stone-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="w-10 h-10 saffron-gradient rounded-full flex items-center justify-center text-white shadow-md disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
