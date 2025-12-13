import type { ChatRequest, ChatResponse, LlmProvider } from '@aurora/ai';

export type LlmHook = (event: { req: ChatRequest; res?: ChatResponse; err?: unknown; durationMs: number }) => void;

export function withObservability(provider: LlmProvider, hook: LlmHook): LlmProvider {
  return {
    chat: async (req) => {
      const start = Date.now();
      try {
        const res = await provider.chat(req);
        hook({ req, res, durationMs: Date.now() - start });
        return res;
      } catch (err) {
        hook({ req, err, durationMs: Date.now() - start });
        throw err;
      }
    },
  };
}
