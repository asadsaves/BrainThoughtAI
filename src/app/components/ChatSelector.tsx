'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { FiZap } from 'react-icons/fi';

interface ChatSelectorProps {
  selectedChat: string;
  onSelectChat: (chat: string) => void;
}

const PORTFOLIO_URL = 'https://asad-3d-portfolio.vercel.app/';
const LINKEDIN_URL = 'https://www.linkedin.com/in/mohd-asad-shoyeb-983a08213/';

const chatOptions = [
  { id: 'assistant', label: 'Assistant', icon: '🤖' },
  { 
    id: 'hire-asad', 
    label: 'Hire ASAD', 
    icon: '👔',
    externalLink: PORTFOLIO_URL
  },
  { 
    id: 'app-creator', 
    label: 'App Creator', 
    icon: <FiZap className="w-4 h-4" />,
    externalLink: LINKEDIN_URL
  },
];

export default function ChatSelector({ selectedChat, onSelectChat }: ChatSelectorProps) {
  const handleClick = (option: typeof chatOptions[0]) => {
    if (option.externalLink) {
      // Prevent default button behavior
      event?.preventDefault();
      // Open in new tab with security attributes
      window.open(option.externalLink, '_blank', 'noopener,noreferrer');
      return;
    }
    onSelectChat(option.id);
  };

  return (
    <div className="flex justify-center gap-2 px-4 py-2">
      {chatOptions.map((option) => (
        <button
          key={option.id}
          onClick={(e) => handleClick(option)}
          className={cn(
            'group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
            'hover:bg-[#2A2A2A]/50 focus:outline-none focus:ring-2 focus:ring-[#BB86FC] focus:ring-opacity-50',
            selectedChat === option.id
              ? 'bg-[#BB86FC] text-[#121212] hover:bg-[#BB86FC]/90 shadow-[0_0_15px_rgba(187,134,252,0.3)]'
              : 'text-[#9E9E9E] hover:text-white hover:shadow-[0_0_10px_rgba(187,134,252,0.1)]'
          )}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {option.icon}
          </span>
          <span className="tracking-[0.02em] font-medium">{option.label}</span>
          {selectedChat === option.id && !option.externalLink && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#BB86FC]/20 to-[#3700B3]/20 blur-sm" />
          )}
        </button>
      ))}
    </div>
  );
} 