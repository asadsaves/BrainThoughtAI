'use client';

import React from 'react';
import { MessageBubbleProps } from '@/lib/types';
import { cn, formatTimestamp } from '@/lib/utils';

const UserAvatar = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    <path
      d="M16 16a6 6 0 100-12 6 6 0 000 12zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"
      fill="currentColor"
    />
  </svg>
);

const AssistantAvatar = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
    {/* Main Sparkle */}
    <path
      d="M16 4l2.4 7.2a1 1 0 00.9.7l7.7.1-6.2 4.5a1 1 0 00-.4 1.1L22.2 25l-6.2-4.5a1 1 0 00-1.2 0L8.6 25l1.8-7.4a1 1 0 00-.4-1.1L3.8 12l7.7-.1a1 1 0 00.9-.7L16 4z"
      fill="currentColor"
      className="opacity-90"
    >
      <animate
        attributeName="opacity"
        values="0.9;1;0.9"
        dur="2s"
        repeatCount="indefinite"
      />
    </path>
    
    {/* Decorative Mini Sparkles */}
    <g className="opacity-70">
      {/* Top */}
      <path
        d="M16 2v2m0 0l1 1-1-1-1 1z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </path>
      {/* Right */}
      <path
        d="M28 16h-2m0 0l-1 1 1-1 1 1z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </path>
      {/* Bottom */}
      <path
        d="M16 30v-2m0 0l1-1-1 1-1-1z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </path>
      {/* Left */}
      <path
        d="M4 16h2m0 0l1 1-1-1-1 1z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
      >
        <animate
          attributeName="opacity"
          values="0.7;1;0.7"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.8s"
        />
      </path>
    </g>
    
    {/* Center Dot */}
    <circle cx="16" cy="16" r="1.5" fill="currentColor">
      <animate
        attributeName="r"
        values="1.5;1.8;1.5"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLast }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'group relative flex w-full items-start gap-2 md:gap-3 px-2 md:px-4 py-1.5 md:py-2 message-fade-in',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'flex h-7 w-7 md:h-8 md:w-8 shrink-0 select-none items-center justify-center rounded-full text-sm shadow-sm',
          'transition-transform duration-200 hover:scale-110',
          isUser 
            ? 'bg-[#BB86FC] text-[#121212] shadow-[0_0_10px_rgba(187,134,252,0.3)]' 
            : 'bg-[#2A2A2A] text-[#E0E0E0] shadow-[0_0_10px_rgba(42,42,42,0.3)]'
        )}
      >
        {isUser ? <UserAvatar /> : <AssistantAvatar />}
      </div>

      <div
        className={cn(
          'group relative flex max-w-[85%] flex-col gap-1',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'relative rounded-[16px] px-5 py-3 shadow-sm transition-all duration-300',
            'hover:shadow-lg',
            isUser
              ? 'bg-[#1E1E1E] text-[#E0E0E0] hover:bg-[#242424]'
              : 'bg-[#2A2A2A] text-[#E0E0E0] hover:bg-[#333333]'
          )}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed tracking-[0.02em] font-medium">
            {message.content}
          </p>
          <div
            className={cn(
              'absolute -bottom-1.5 h-3 w-3 rotate-45 transition-colors duration-300',
              isUser
                ? 'right-3 bg-[#1E1E1E] group-hover:bg-[#242424]'
                : 'left-3 bg-[#2A2A2A] group-hover:bg-[#333333]'
            )}
          />
        </div>
        <span
          className={cn(
            'text-[12px] opacity-0 transition-all duration-200 group-hover:opacity-60',
            isUser ? 'text-[#9E9E9E]' : 'text-[#9E9E9E]'
          )}
        >
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble; 