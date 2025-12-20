/**
 * Type definitions for localStorage data structures
 */

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface ChatHistory {
  messages: ChatMessage[];
  lastUpdated: number;
}

/**
 * Type guard to validate chat message structure
 */
export function isValidChatMessage(data: unknown): data is ChatMessage {
  if (!data || typeof data !== 'object') return false;
  const msg = data as Record<string, unknown>;
  return (
    typeof msg.role === 'string' &&
    ['user', 'assistant', 'system'].includes(msg.role) &&
    typeof msg.content === 'string'
  );
}

/**
 * Type guard to validate chat history structure
 */
export function isValidChatHistory(data: unknown): data is ChatHistory {
  if (!data || typeof data !== 'object') return false;
  const history = data as Record<string, unknown>;
  return (
    Array.isArray(history.messages) &&
    history.messages.every(isValidChatMessage) &&
    typeof history.lastUpdated === 'number'
  );
}

