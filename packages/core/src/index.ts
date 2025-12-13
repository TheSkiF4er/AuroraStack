export type Plugin = (app: AuroraApp) => void | Promise<void>;

export type AuroraConfig = {
  env?: Record<string, string | undefined>;
  log?: (level: 'debug' | 'info' | 'warn' | 'error', message: string, meta?: unknown) => void;
};

export class AuroraApp {
  readonly config: AuroraConfig;
  private readonly services = new Map<string, unknown>();
  private readonly plugins: Plugin[] = [];

  constructor(config: AuroraConfig = {}) {
    this.config = config;
  }

  use(plugin: Plugin): this {
    this.plugins.push(plugin);
    return this;
  }

  async init(): Promise<void> {
    for (const p of this.plugins) await p(this);
  }

  set<T>(key: string, value: T): void {
    this.services.set(key, value);
  }

  get<T>(key: string): T | undefined {
    return this.services.get(key) as T | undefined;
  }

  log(level: 'debug' | 'info' | 'warn' | 'error', message: string, meta?: unknown): void {
    const logger = this.config.log ?? (() => undefined);
    logger(level, message, meta);
  }
}

export function createApp(config: AuroraConfig = {}): AuroraApp {
  return new AuroraApp(config);
}

export function defineConfig<T extends object>(config: T): T {
  return config;
}
