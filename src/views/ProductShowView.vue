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

        <h1 class="page-title">{{ product.name }}</h1>

        <div class="product-detail">
          <div class="product-image" v-if="product.photo_url">
            <img :src="product.photo_url" :alt="product.name" />
          </div>
          <div class="product-body" v-if="product.description">
            <div class="product-description" v-html="product.description"></div>
          </div>
        </div>
      </template>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppLayout from "@/components/AppLayout.vue";
import { get } from "@/services/api";

interface Product {
  id: number;
  name: string;
  description: string | null;
  photo_url: string | null;
  created_at: string;
}

export default defineComponent({
  name: "ProductShowView",
  components: { AppLayout },
  setup() {
    const route = useRoute();
    const product = ref<Product | null>(null);
    const loading = ref(true);
    const error = ref("");

    onMounted(async () => {
      const id = route.params.id;
      const result = await get<Product>(`/products/${id}`);
      if (result.ok && result.data) {
        product.value = result.data;
      } else {
        error.value = result.error || "Продукт не найден";
      }
      loading.value = false;
    });

    return { product, loading, error };
  },
});
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 900px;
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

.page-title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.product-detail {
  margin-bottom: 3rem;

  .product-image {
    margin-bottom: 2rem;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      max-height: 500px;
      object-fit: cover;
    }
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
}
</style>
