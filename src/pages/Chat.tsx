import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserCircle } from 'lucide-react';
import { toast } from "sonner";

interface Message {
  id: number;
  sender: string;
  text: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'مدیر', text: 'به سیستم چت پولیش‌کاری حرفه‌ای خوش آمدید. چگونه می‌توانم کمکتان کنم؟', timestamp: new Date() },
  ]);
  const [userName, setUserName] = useState('کاربر');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // اسکرول به پایین پنجره چت با هر پیام جدید
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Navbar />
      <div className="section-container min-h-screen pt-28 pb-20">
        <h1 className="section-title text-center mb-10">پشتیبانی و چت</h1>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* اطلاعات کاربر */}
          <div className="p-5 bg-metal-shine border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <UserCircle className="w-10 h-10 text-accent" />
                <div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="font-medium text-gray-800 bg-transparent border-b border-dashed border-accent focus:outline-none"
                    placeholder="نام شما"
                  />
                  <p className="text-sm text-gray-500">آنلاین</p>
                </div>
              </div>
              <div className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm">پشتیبانی آنلاین است</div>
            </div>
          </div>
          
          {/* پنجره چت */}
          <div className="h-96 overflow-y-auto p-5 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 flex ${message.sender === userName ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs sm:max-w-md rounded-lg p-3 ${
                    message.sender === userName 
                      ? 'bg-accent text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 shadow-sm rounded-tl-none'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm">{message.sender}</span>
                    <span className="text-xs opacity-70 mr-2">{formatTime(message.timestamp)}</span>
                  </div>
                  <p className={`text-sm ${message.sender !== userName ? 'text-gray-700' : ''}`}>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* فرم ارسال پیام حذف شد */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
