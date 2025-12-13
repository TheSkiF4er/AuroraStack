import type { ChatMessage } from '@aurora/ai';

export function system(content: string): ChatMessage {
  return { role: 'system', content };
}

export function user(content: string): ChatMessage {
  return { role: 'user', content };
}

export function assistant(content: string): ChatMessage {
  return { role: 'assistant', content };
}

export type RAGResult = { context: string; sources: Array<{ id: string; score: number }> };

export async function retrieve(_query: string): Promise<RAGResult> {
  // Placeholder: integrate with embeddings/vector store here.
  return { context: '', sources: [] };
}
