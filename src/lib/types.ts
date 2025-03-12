export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface ChatContextType {
  chatState: ChatState;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

export interface MessageBubbleProps {
  message: Message;
  isLast: boolean;
} 