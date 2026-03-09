<template>
  <AppLayout>
    <div class="page-content">
      <div v-if="loading" class="loading-text">Загрузка...</div>

      <div v-else-if="error" class="error-text">{{ error }}</div>

      <template v-else-if="product">
        <div class="breadcrumb">
          <router-link to="/">Главная</router-link>
          <span> → </span>
          <router-link to="/products">Продукция</router-link>
          <span> → </span>
          <span>{{ product.name }}</span>
        </div>

        <div class="product-layout">
          <div class="product-gallery" v-if="product.photo_urls && product.photo_urls.length > 0">
            <ImageCarousel
              :images="product.photo_urls"
              :alt="product.name"
              height="400px"
              @click="openFullscreen"
            />
          </div>
          <div class="product-content">
            <h1 class="product-title">{{ product.name }}</h1>
            <div v-if="product.description" class="product-description" v-html="product.description"></div>
          </div>
        </div>
      </template>
    </div>

    <FullscreenViewer
      :visible="fullscreenVisible"
      :images="product?.photo_urls || []"
      :alt="product?.name || ''"
      :start-index="fullscreenIndex"
      @close="fullscreenVisible = false"
    />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppLayout from "@/components/AppLayout.vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import FullscreenViewer from "@/components/FullscreenViewer.vue";
import { get } from "@/services/api";

interface Product {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  photo_urls: string[];
  created_at: string;
}

export default defineComponent({
  name: "ProductShowView",
  components: { AppLayout, ImageCarousel, FullscreenViewer },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const product = ref<Product | null>(null);
    const loading = ref(true);
    const error = ref("");

    const fullscreenVisible = ref(false);
    const fullscreenIndex = ref(0);

    onMounted(async () => {
      const slug = route.params.slug;
      const result = await get<Product>(`/products/${slug}`);
      if (result.ok && result.data) {
        product.value = result.data;
      } else {
        router.replace("/products");
        return;
      }
      loading.value = false;
    });

    const openFullscreen = (index: number) => {
      fullscreenIndex.value = index;
      fullscreenVisible.value = true;
    };

    return { product, loading, error, fullscreenVisible, fullscreenIndex, openFullscreen };
  },
});
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
}

.loading-text,
.error-text {
  text-align: center;
  padding: 3rem;
  color: #999;
}

.error-text {
  color: #dc2626;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.product-layout {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

.product-gallery {
  flex-shrink: 0;
  width: 480px;
}

.product-content {
  flex: 1;
  min-width: 0;
}

.product-title {
  font-size: 1.8rem;
  margin: 0 0 1.5rem;
  color: #1a1a2e;
}

.product-description {
  line-height: 1.8;
  font-size: 1.05rem;
  color: #333;

  :deep(h1),
  :deep(h2),
  :deep(h3) {
    margin: 1.5rem 0 0.75rem;
    color: #1a1a2e;
  }

  :deep(p) {
    margin: 0 0 1rem;
  }

  :deep(ul),
  :deep(ol) {
    margin: 0 0 1rem;
    padding-left: 1.5rem;
  }

  :deep(strong) {
    font-weight: 600;
  }

  :deep(a) {
    color: #4f46e5;
    text-decoration: underline;
  }
}

@media (max-width: 768px) {
  .product-layout {
    flex-direction: column;
  }

  .product-gallery {
    width: 100%;
  }
}
</style>
