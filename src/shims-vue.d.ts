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

declare module "vue-router" {
  export interface RouteRecordRaw {
    path: string;
    name?: string;
    component?: any;
    children?: RouteRecordRaw[];
    [key: string]: any;
  }
  export function createRouter(options: any): any;
  export function createWebHistory(base?: string): any;
}
