<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Главная</router-link>
        <span> → </span>
        <span>Сертификаты</span>
      </div>

      <h1 class="page-title">Сертификаты</h1>

      <section class="cert-section">
        <h2>Наши сертификаты качества</h2>
        <p>
          Мы гарантируем высокое качество нашей продукции. Все наши изделия сертифицированы и соответствуют требованиям стандартов.
        </p>
      </section>

      <section class="cert-section">
        <div v-if="loading" class="loading-text">Загрузка...</div>
        <div v-else class="cert-images">
          <template v-if="certificates.length > 0">
            <img
              v-for="cert in certificates"
              :key="cert.id"
              :src="cert.photo_url"
              :alt="cert.name"
              class="cert-img"
            />
          </template>
          <template v-else>
            <img :src="placeholderImg" alt="" class="cert-img" />
            <img :src="placeholderImg" alt="" class="cert-img" />
          </template>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import { PLACEHOLDER_IMAGE } from "@/constants/images";
import { get } from "@/services/api";

interface Certificate {
  id: number;
  name: string;
  photo_url: string | null;
  created_at: string;
}

export default defineComponent({
  components: { AppLayout },
  setup() {
    const certificates = ref<Certificate[]>([]);
    const loading = ref(true);
    const placeholderImg = PLACEHOLDER_IMAGE;

    onMounted(async () => {
      const result = await get<Certificate[]>("/certificates");
      if (result.ok && result.data) {
        certificates.value = result.data.filter((c) => c.photo_url);
      }
      loading.value = false;
    });

    return { certificates, loading, placeholderImg };
  },
});
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 800px;
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
  margin-bottom: 2rem;
}

.cert-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
}

.loading-text {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.cert-images {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;

  .cert-img {
    width: 300px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}
</style>
