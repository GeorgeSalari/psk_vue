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
          v-if="catalogCoverSrc"
          :src="catalogCoverSrc"
          alt="Каталог продукции"
          class="catalog-cover"
        />
        <div v-else class="catalog-cover catalog-cover--loading">
          <span v-if="pdfError">{{ pdfError }}</span>
          <span v-else>Загрузка…</span>
        </div>
        <span class="download-label">Скачать</span>
      </a>

      <p class="download-hint">Нажмите для скачивания каталога (PDF)</p>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import { PLACEHOLDER_IMAGE } from "@/constants/images";

const CATALOG_FILENAME = "каталог_двери.pdf";

// PDF.js v3 from CDN - see public/index.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pdfjsLib = (window as any).pdfjsLib;

export default defineComponent({
  components: { AppLayout },
  data() {
    return {
      placeholderImg: PLACEHOLDER_IMAGE,
      catalogPdfUrl: `/${CATALOG_FILENAME}`,
      catalogCoverSrc: "" as string,
      pdfError: "" as string,
    };
  },
  mounted() {
    this.renderPdfFirstPage();
  },
  methods: {
    async renderPdfFirstPage() {
      if (!pdfjsLib) {
        this.pdfError = "PDF.js не загружен";
        this.catalogCoverSrc = this.placeholderImg;
        return;
      }
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      try {
        const loadingTask = pdfjsLib.getDocument(this.catalogPdfUrl);
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);

        const scale = 2; // 2x for sharper image
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");
        if (!context) {
          this.pdfError = "Ошибка рендеринга";
          return;
        }

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        this.catalogCoverSrc = canvas.toDataURL("image/jpeg", 0.85);
      } catch (err) {
        console.error("PDF load error:", err);
        this.pdfError = "Не удалось загрузить превью";
        this.catalogCoverSrc = this.placeholderImg;
      }
    },
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

    &--loading {
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 300px;
      color: #888;
      font-size: 0.9rem;
    }
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
