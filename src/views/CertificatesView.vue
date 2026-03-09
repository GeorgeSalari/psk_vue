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
              v-for="(cert, idx) in certificates"
              :key="cert.id"
              :src="cert.photo_url"
              :alt="cert.name"
              class="cert-img"
              @click="openFullscreen(idx)"
            />
          </template>
          <template v-else>
            <img :src="placeholderImg" alt="" class="cert-img" />
            <img :src="placeholderImg" alt="" class="cert-img" />
          </template>
        </div>
      </section>
    </div>

    <FullscreenViewer
      :visible="fullscreenVisible"
      :images="certificateUrls"
      :alt="'Сертификат'"
      :start-index="fullscreenIndex"
      @close="fullscreenVisible = false"
    />
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import FullscreenViewer from "@/components/FullscreenViewer.vue";
import { PLACEHOLDER_IMAGE } from "@/constants/images";
import { get } from "@/services/api";

interface Certificate {
  id: number;
  name: string;
  photo_url: string | null;
  created_at: string;
}

export default defineComponent({
  components: { AppLayout, FullscreenViewer },
  setup() {
    const certificates = ref<Certificate[]>([]);
    const loading = ref(true);
    const placeholderImg = PLACEHOLDER_IMAGE;
    const fullscreenVisible = ref(false);
    const fullscreenIndex = ref(0);

    const certificateUrls = computed(() =>
      certificates.value.map((c) => c.photo_url).filter(Boolean) as string[]
    );

    const openFullscreen = (idx: number) => {
      fullscreenIndex.value = idx;
      fullscreenVisible.value = true;
    };

    onMounted(async () => {
      const result = await get<Certificate[]>("/certificates?published=true");
      if (result.ok && result.data) {
        certificates.value = result.data.filter((c) => c.photo_url);
      }
      loading.value = false;
    });

    return { certificates, loading, placeholderImg, fullscreenVisible, fullscreenIndex, certificateUrls, openFullscreen };
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
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;

    &:hover {
      transform: scale(1.03);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
