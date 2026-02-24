import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import ProductView from "@/views/ProductView.vue";
import CatalogView from "@/views/CatalogView.vue";
import DownloadsView from "@/views/DownloadsView.vue";
import CertificatesView from "@/views/CertificatesView.vue";
import ContactsView from "@/views/ContactsView.vue";
import ProductSlidingDrivesView from "@/views/ProductSlidingDrivesView.vue";
import ProductProffView from "@/views/ProductProffView.vue";
import ProductTelescopicView from "@/views/ProductTelescopicView.vue";
import ProductAccessoriesView from "@/views/ProductAccessoriesView.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "home", component: HomeView },
  { path: "/about", name: "about", component: AboutView },
  { path: "/product", name: "product", component: ProductView },
  { path: "/catalog", name: "catalog", component: CatalogView },
  { path: "/downloads", name: "downloads", component: DownloadsView },
  { path: "/certificates", name: "certificates", component: CertificatesView },
  { path: "/contacts", name: "contacts", component: ContactsView },
  { path: "/product/sliding-drives", name: "product-sliding-drives", component: ProductSlidingDrivesView },
  { path: "/product/proff", name: "product-proff", component: ProductProffView },
  { path: "/product/telescopic", name: "product-telescopic", component: ProductTelescopicView },
  { path: "/product/accessories", name: "product-accessories", component: ProductAccessoriesView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
