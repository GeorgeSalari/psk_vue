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
import AdminSignInView from "@/views/AdminSignInView.vue";
import AdminDashboardView from "@/views/AdminDashboardView.vue";

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
  { path: "/admin/sign_in", name: "admin-sign-in", component: AdminSignInView },
  {
    path: "/admin/dashboard",
    name: "admin-dashboard",
    component: AdminDashboardView,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to: any, _from: any, next: any) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      next({ name: "admin-sign-in" });
      return;
    }
  }
  next();
});

export default router;
