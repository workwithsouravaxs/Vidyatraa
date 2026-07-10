'use client';

import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { Send, X, Bot, Sparkles } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Namaste! I am your Vidyatraa Assistant. How can I help you find scholarships today?' },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // Mock AI response
    setTimeout(() => {
      const botResponse = { 
        role: 'bot', 
        content: `Based on your query about "${input}", I recommend checking the Post-Matric Scholarship for SC/ST students if you are from Bihar or Andhra Pradesh. Would you like me to show you the eligibility criteria?` 
      };
      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-8 right-8 w-14 h-14 shadow-2xl flex items-center justify-center bg-[#0B3C91] text-white rounded-full z-50 border-none animate-bounce hover:animate-none cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <Sparkles size={24} />
      </button>

      {/* Chat Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <Bot size={20} className="text-[#0B3C91]" />
            <span className="font-bold">Vidyatraa AI Assistant</span>
          </div>
        }
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
        width={400}
        style={{ position: 'fixed', bottom: 80, right: 20, margin: 0 }}
        styles={{ body: { height: '450px', display: 'flex', flexDirection: 'column', padding: 0 } }}
        className="ai-modal rounded-2xl overflow-hidden"
        closeIcon={<X size={20} />}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              className="rounded-xl h-11"
              variant="filled"
            />
            <Button 
              type="primary" 
              icon={<Send size={18} />} 
              onClick={handleSend}
              className="h-11 rounded-xl bg-primary flex items-center justify-center px-4"
            />
          </div>
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            AI can make mistakes. Always check official sources.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default AIAssistant;
