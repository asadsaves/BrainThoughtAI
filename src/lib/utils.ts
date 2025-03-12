import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Message } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateMessageId(): string {
  return Math.random().toString(36).substring(2, 15);
}

export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(new Date(timestamp));
}

export function getLastMessages(messages: Message[], count: number = 8): Message[] {
  return messages.slice(-count);
}

export const TOGETHER_AI_API_KEY = process.env.NEXT_PUBLIC_TOGETHER_API_KEY || '';
export const API_URL = 'https://api.together.xyz/v1/chat/completions'; 