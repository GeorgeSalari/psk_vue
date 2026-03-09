<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Главная</router-link>
        <span> → </span>
        <span>Продукция</span>
      </div>

      <h1 class="page-title">Продукция</h1>

      <p class="intro-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <div v-if="loading" class="loading-text">Загрузка...</div>

      <div class="product-links">
        <template v-if="products.length > 0">
          <router-link
            v-for="product in products"
            :key="product.id"
            :to="`/products/${product.id}`"
            class="product-link-card"
          >
            <div class="link-image">
              <ImageCarousel
                v-if="product.photo_urls && product.photo_urls.length > 0"
                :images="product.photo_urls"
                :alt="product.name"
                height="150px"
              />
              <img v-else :src="placeholderImg" alt="" />
            </div>
            <h3>{{ product.name }}</h3>
            <span class="link-arrow">Подробнее →</span>
          </router-link>
        </template>

        <template v-if="!loading && products.length === 0">
          <div class="product-link-card placeholder-card">
            <div class="link-image">
              <img :src="placeholderImg" alt="" />
            </div>
            <h3>Lorem ipsum dolor sit amet consectetur</h3>
            <span class="link-arrow">Подробнее →</span>
          </div>

          <div class="product-link-card placeholder-card">
            <div class="link-image">
              <img :src="placeholderImg" alt="" />
            </div>
            <h3>Lorem ipsum dolor sit amet</h3>
            <span class="link-arrow">Подробнее →</span>
          </div>
        </template>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import ImageCarousel from "@/components/ImageCarousel.vue";
import { PLACEHOLDER_IMAGE } from "@/constants/images";
import { get } from "@/services/api";

interface Product {
  id: number;
  name: string;
  description: string | null;
  photo_urls: string[];
  created_at: string;
}

export default defineComponent({
  name: "ProductView",
  components: { AppLayout, ImageCarousel },
  setup() {
    const products = ref<Product[]>([]);
    const loading = ref(true);
    const placeholderImg = PLACEHOLDER_IMAGE;

    onMounted(async () => {
      const result = await get<Product[]>("/products");
      if (result.ok && result.data) {
        products.value = result.data;
      }
      loading.value = false;
    });

    return { products, loading, placeholderImg };
  },
});
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
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

.page-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.intro-text {
  margin-bottom: 3rem;
  line-height: 1.6;
}

.loading-text {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.product-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-link-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .link-image {
    flex-shrink: 0;
    width: 220px;
    height: 150px;
    border-radius: 4px;
    overflow: hidden;

    img {
      height: 100%;
      width: auto;
      display: block;
    }
  }

  h3 {
    flex: 1;
    font-size: 1.25rem;
    margin: 0;
  }

  .link-arrow {
    font-weight: 600;
    color: #333;
  }
}

.placeholder-card {
  cursor: default;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 768px) {
  .product-link-card {
    flex-direction: column;
    align-items: flex-start;

    .link-image {
      width: 100%;
      height: 200px;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
