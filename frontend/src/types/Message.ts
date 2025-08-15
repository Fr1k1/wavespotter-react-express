export interface MessageDto {
  content: string;
  conversationId?: number | null;
}

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}
