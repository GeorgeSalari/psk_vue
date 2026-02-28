<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Главная</router-link>
        <span> → </span>
        <span>Каталог продукции</span>
      </div>

      <h1 class="page-title">Каталог продукции</h1>

      <p class="intro-text">Подробный каталог продукции</p>

      <a
        :href="catalogPdfUrl"
        class="catalog-download-card"
        download="каталог_двери.pdf"
      >
        <img
          :src="catalogCoverSrc"
          alt="Каталог продукции"
          class="catalog-cover"
        />
        <span class="download-label">Скачать</span>
      </a>

      <p class="download-hint">Нажмите для скачивания каталога (PDF)</p>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";

const CATALOG_FILENAME = "каталог_двери.pdf";

export default defineComponent({
  components: { AppLayout },
  data() {
    return {
      catalogPdfUrl: `/${CATALOG_FILENAME}`,
      catalogCoverSrc: "/images/catalog-cover.png",
    };
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
  margin-bottom: 0.5rem;
}

.intro-text {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #555;
}

.catalog-download-card {
  display: block;
  position: relative;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  max-width: 400px;
  margin: 0 auto 1rem;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    .download-label {
      background: rgba(0, 0, 0, 0.75);
    }
  }

  .catalog-cover {
    width: 100%;
    display: block;
    aspect-ratio: 3/4;
    object-fit: cover;
  }

  .download-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 1.5rem;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    font-weight: 600;
    text-align: center;
    transition: background 0.2s;
  }
}

.download-hint {
  font-size: 0.9rem;
  color: #888;
  text-align: center;
}
</style>
