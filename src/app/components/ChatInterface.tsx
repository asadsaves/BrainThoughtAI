'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Message } from '@/lib/types';
import { generateMessageId } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import Logo from './Logo';
import ChatSelector from './ChatSelector';
import JournalSidebar from './JournalSidebar';
import { FiSend, FiMic, FiPaperclip } from 'react-icons/fi';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState('assistant');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        scrollToBottom();
      }
    }
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const textarea = e.target;
    textarea.style.height = '48px';
    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = '48px';
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              try {
                const parsed = JSON.parse(data);
                if (parsed.choices?.[0]?.delta?.content) {
                  assistantMessage += parsed.choices[0].delta.content;
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage?.role === 'assistant') {
                      lastMessage.content = assistantMessage;
                    } else {
                      newMessages.push({
                        id: generateMessageId(),
                        role: 'assistant',
                        content: assistantMessage,
                        timestamp: Date.now(),
                      });
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                console.error('Error parsing SSE message:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Enhanced Background System */}
      <div className="fixed inset-0 bg-gradient-animate pointer-events-none" />
      <div className="fixed inset-0 bg-overlay pointer-events-none" />
      <div className="fixed inset-0 bg-noise pointer-events-none" />
      <div className="fixed inset-0 glow-effect pointer-events-none" />
      
      {/* Journal Sidebar - Hidden by default on mobile */}
      <div className="hidden lg:block">
        <JournalSidebar />
      </div>
      
      <div className="flex flex-col flex-1 relative w-full">
        {/* Header with responsive padding */}
        <div className="relative border-b border-[#2A2A2A]/50 bg-[#1E1E1E]/80 backdrop-blur-sm shadow-lg z-10">
          <div className="px-4 md:px-6">
            <Logo />
            <ChatSelector selectedChat={selectedChat} onSelectChat={setSelectedChat} />
          </div>
        </div>

        {/* Chat container with responsive spacing */}
        <div 
          ref={containerRef}
          className="relative flex-1 overflow-y-auto px-4 pt-4 scroll-smooth z-10"
        >
          <div className="mx-auto max-w-3xl">
            <div className="min-h-full">
              {messages.length === 0 ? (
                <div className="flex h-[80vh] items-center justify-center text-center">
                  <div className="space-y-2 text-[#9E9E9E]">
                    <p className="text-lg font-medium tracking-[0.01em]">Welcome to BrainThought</p>
                    <p className="text-sm tracking-[0.01em]">Let your thoughts flow—start typing below✨.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pb-4">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <MessageBubble
                        message={message}
                        isLast={index === messages.length - 1}
                      />
                    </div>
                  ))}
                  {isLoading && (
                    <div className="animate-fade-in px-4">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          </div>
        </div>

        <div className="relative border-t border-[#2A2A2A]/50 bg-[#1E1E1E]/80 backdrop-blur-sm shadow-lg">
          <div className="mx-auto max-w-3xl px-4 py-3">
            <form
              onSubmit={handleSubmit}
              className="relative rounded-2xl border border-[#2A2A2A]/50 bg-[#2A2A2A]/80 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-[#BB86FC]/50 hover:shadow-[0_0_10px_rgba(187,134,252,0.1)] hover:bg-[#2A2A2A]/90 focus-within:border-[#BB86FC] focus-within:shadow-[0_0_15px_rgba(187,134,252,0.1)] focus-within:bg-[#2A2A2A]/90"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#BB86FC]/5 to-[#3700B3]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-50 focus-within:opacity-100" />
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                rows={1}
                className="relative block h-12 min-h-[48px] w-full resize-none rounded-2xl bg-transparent px-5 py-3 pr-24 text-[#E0E0E0] placeholder:text-[#616161] focus:outline-none tracking-[0.02em] font-medium"
                style={{ maxHeight: '200px' }}
              />
              <div className="absolute bottom-1.5 right-2 flex items-center gap-1.5">
                <button
                  type="button"
                  className="button-glow button-press rounded-full p-2 text-[#D1C4E9] transition-all duration-300 hover:bg-[#2A2A2A] hover:text-[#BB86FC] focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:ring-opacity-50"
                  aria-label="Voice input"
                >
                  <FiMic className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="button-glow button-press rounded-full p-2 text-[#D1C4E9] transition-all duration-300 hover:bg-[#2A2A2A] hover:text-[#BB86FC] focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:ring-opacity-50"
                  aria-label="Add attachment"
                >
                  <FiPaperclip className="h-5 w-5" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="button-glow button-press rounded-full p-2 text-[#D1C4E9] transition-all duration-300 hover:bg-[#2A2A2A] hover:text-[#BB86FC] disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:ring-opacity-50"
                  aria-label="Send message"
                >
                  <FiSend className="h-5 w-5 rotate-90 transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 