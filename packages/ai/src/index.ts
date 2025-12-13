export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };

export type ChatRequest = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
};

export type ChatResponse = {
  text: string;
  raw?: unknown;
};

export type LlmProvider = {
  chat: (req: ChatRequest) => Promise<ChatResponse>;
};

let provider: LlmProvider | null = null;

export function configureLLM(p: LlmProvider): void {
  provider = p;
}

export const llm = {
  chat: async (req: ChatRequest): Promise<ChatResponse> => {
    if (!provider) {
      throw new Error(
        'No LLM provider configured. Call configureLLM() in your app bootstrap to set a provider.',
      );
    }
    return provider.chat(req);
  },
};
