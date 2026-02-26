<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Lorem</router-link>
        <span> → </span>
        <router-link to="/product">Ipsum</router-link>
        <span> → </span>
        <span>Lorem ipsum</span>
      </div>

      <h1 class="page-title">Lorem ipsum dolor</h1>

      <div class="accessories-grid">
        <div class="accessory-card">
          <img :src="placeholderImg" alt="" />
          <h3>Lorem ipsum VISYON</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.</p>
          <a href="#" class="card-link">Lorem Ipsum</a>
        </div>
        <div class="accessory-card">
          <img :src="placeholderImg" alt="" />
          <h3>Lorem ipsum 7S</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.</p>
          <a href="#" class="card-link">Lorem Ipsum</a>
        </div>
        <div class="accessory-card">
          <img :src="placeholderImg" alt="" />
          <h3>Lorem PC-12</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod.</p>
          <a href="#" class="card-link">Lorem Ipsum</a>
        </div>
        <div class="accessory-card">
          <img :src="placeholderImg" alt="" />
          <h3>Lorem ipsum dolor</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <a href="#" class="card-link">Lorem Ipsum</a>
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
  data() {
    return { placeholderImg: PLACEHOLDER_IMAGE };
  },
};
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
  margin-bottom: 2rem;
}

.accessories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.accessory-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    padding: 1rem 1rem 0;
    font-size: 1.1rem;
  }

  p {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #555;
    line-height: 1.5;
  }

  .card-link {
    display: block;
    padding: 0 1rem 1rem;
    font-weight: 600;
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
