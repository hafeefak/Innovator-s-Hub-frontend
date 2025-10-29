// src/components/Entrepreneur/ChatModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { entrepreneurService } from "../../Services/EntrepreneurServices";

export default function ChatModal({ idea, onClose }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (idea) {
      loadChatHistory();
    }
  }, [idea]);

  const loadChatHistory = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      setTimeout(() => {
        const mockMessages = [
          { 
            id: 1, 
            content: "Hi there! I'm really impressed with your idea. Could you tell me more about the target market?", 
            sender: "investor", 
            timestamp: new Date(Date.now() - 3600000),
            investorName: "Sarah Johnson",
            investorAvatar: "SJ"
          },
          { 
            id: 2, 
            content: "Thank you for your interest! The target market is primarily small to medium businesses in the tech industry who struggle with project management.", 
            sender: "entrepreneur", 
            timestamp: new Date(Date.now() - 1800000)
          },
          { 
            id: 3, 
            content: "That's exactly the space we're focused on. What's your current traction like?", 
            sender: "investor", 
            timestamp: new Date(Date.now() - 1200000),
            investorName: "Sarah Johnson",
            investorAvatar: "SJ"
          },
        ];
        setMessages(mockMessages);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error loading chat history:", err);
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!message.trim() || sending) return;

    const newMessage = {
      id: Date.now(),
      content: message,
      sender: "entrepreneur",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setSending(true);
    setMessage("");

    try {
      await entrepreneurService.sendMessage({
        toUserId: idea.investorId || 1,
        content: message,
        chatSessionId: idea.id,
      });
    } catch (err) {
      console.error("Error sending message:", err);
      // Remove optimistic update if failed
      setMessages(prev => prev.filter(m => m.id !== newMessage.id));
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transform animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-xl">💡</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">Chat about {idea?.title}</h2>
                <p className="text-blue-100 text-sm opacity-90">Active conversation with investors</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 bg-slate-50/50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center space-x-3 text-slate-500">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Loading messages...</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "entrepreneur" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-xs lg:max-w-md">
                    {msg.sender === "investor" && (
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-xs font-bold mr-3 flex-shrink-0">
                        {msg.investorAvatar}
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        msg.sender === "entrepreneur"
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm"
                      }`}
                    >
                      {msg.sender === "investor" && (
                        <p className="text-xs font-semibold text-purple-600 mb-1">{msg.investorName}</p>
                      )}
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-2 ${
                        msg.sender === "entrepreneur" ? "text-blue-100" : "text-slate-500"
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 p-6 bg-white">
          <div className="flex space-x-4">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message to investors..."
                rows="2"
                className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all bg-slate-50/50 focus:bg-white"
                disabled={sending || loading}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={sending || loading || !message.trim()}
              className="px-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl hover:from-blue-600 hover:to-cyan-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
            >
              {sending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-3 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}