declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "quill" {
  class Quill {
    constructor(container: Element | string, options?: any);
    root: HTMLElement;
    getText(): string;
    getContents(): any;
    setContents(delta: any): any;
    on(event: string, handler: (...args: any[]) => void): void;
  }
  export default Quill;
}

declare module "quill/dist/quill.snow.css" {}

declare module "vue-router" {
  export interface RouteMeta {
    requiresAuth?: boolean;
    [key: string]: any;
  }
  export interface RouteRecordRaw {
    path: string;
    name?: string;
    component?: any;
    children?: RouteRecordRaw[];
    meta?: RouteMeta;
    [key: string]: any;
  }
  export function createRouter(options: any): any;
  export function createWebHistory(base?: string): any;
  export function useRouter(): any;
  export function useRoute(): any;
}
