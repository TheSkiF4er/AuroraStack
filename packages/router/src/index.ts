export type Params = Record<string, string>;

export type RouteModule = {
  loader?: (ctx: any) => Promise<any> | any;
  action?: (ctx: any) => Promise<any> | any;
  default?: unknown;
};

export type Route = {
  id: string;
  path: string;
  module: RouteModule;
};

export class Router {
  private routes: Route[] = [];

  register(route: Route): void {
    this.routes.push(route);
  }

  list(): Route[] {
    return [...this.routes];
  }

  match(pathname: string): { route: Route; params: Params } | null {
    // Minimal matcher: supports static paths and :params
    for (const r of this.routes) {
      const a = r.path.split('/').filter(Boolean);
      const b = pathname.split('/').filter(Boolean);
      if (a.length !== b.length) continue;

      const params: Params = {};
      let ok = true;

      for (let i = 0; i < a.length; i++) {
        const segA = a[i];
        const segB = b[i];
        if (segA.startsWith(':')) params[segA.slice(1)] = decodeURIComponent(segB);
        else if (segA !== segB) {
          ok = false;
          break;
        }
      }

      if (ok) return { route: r, params };
    }
    return null;
  }
}

export function createRouter(): Router {
  return new Router();
}
