export type JobHandler<T = unknown> = (payload: T) => Promise<void> | void;

export type JobQueue = {
  enqueue: <T>(name: string, payload: T) => Promise<void>;
  register: <T>(name: string, handler: JobHandler<T>) => void;
};

export function createInMemoryQueue(): JobQueue {
  const handlers = new Map<string, JobHandler<any>>();
  return {
    enqueue: async (name, payload) => {
      const h = handlers.get(name);
      if (!h) throw new Error(`No handler registered for job: ${name}`);
      await h(payload);
    },
    register: (name, handler) => {
      handlers.set(name, handler);
    },
  };
}
