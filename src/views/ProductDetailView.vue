<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Lorem</router-link>
        <span> → </span>
        <router-link to="/product">Ipsum</router-link>
        <span> → </span>
        <span>{{ pageTitle }}</span>
      </div>

      <h1 class="page-title">{{ pageTitle }}</h1>

      <div class="product-detail">
        <div class="product-image">
          <img :src="imageUrl" alt="" />
        </div>
        <div class="product-body">
          <p class="product-description">{{ description }}</p>
          <a href="#" class="btn-cta">Lorem Ipsum</a>
        </div>
      </div>

      <div v-if="sections.length" class="product-sections">
        <div v-for="(section, i) in sections" :key="i" class="section-card">
          <h3>{{ section.title }}</h3>
          <p>{{ section.text }}</p>
          <a href="#" class="section-link">Lorem Ipsum</a>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "@/components/AppLayout.vue";
import { PLACEHOLDER_IMAGE } from "@/constants/images";

export default {
  components: { AppLayout },
  props: {
    pageTitle: { type: String, required: true },
    imageUrl: { type: String, default: () => PLACEHOLDER_IMAGE },
    description: { type: String, required: true },
    sections: { type: Array as () => Array<{ title: string; text: string }>, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 900px;
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

.product-detail {
  margin-bottom: 3rem;

  .product-image {
    margin-bottom: 2rem;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      max-height: 400px;
      object-fit: cover;
    }
  }

  .product-description {
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .btn-cta {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: #333;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background: #555;
    }
  }
}

.product-sections {
  display: grid;
  gap: 2rem;
}

.section-card {
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  .section-link {
    color: #333;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
