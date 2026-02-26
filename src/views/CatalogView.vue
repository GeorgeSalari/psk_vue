<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Lorem</router-link>
        <span> → </span>
        <span>Sit</span>
      </div>

      <h1 class="page-title">Lorem Ipsum Dolor</h1>

      <p class="intro-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
      </p>

      <div class="catalog-grid">
        <router-link to="/product/sliding-drives" class="catalog-card">
          <img src="/images/placeholder.svg" alt="" />
          <h3>Lorem ipsum dolor sit amet</h3>
          <span class="card-link">Lorem Ipsum →</span>
        </router-link>
        <router-link to="/product/telescopic" class="catalog-card">
          <img src="/images/placeholder.svg" alt="" />
          <h3>Lorem ipsum dolor</h3>
          <span class="card-link">Lorem Ipsum →</span>
        </router-link>
        <router-link to="/product/proff" class="catalog-card">
          <img src="/images/placeholder.svg" alt="" />
          <h3>Lorem ipsum r. r.</h3>
          <span class="card-link">Lorem Ipsum →</span>
        </router-link>
        <router-link to="/product/accessories" class="catalog-card">
          <img src="/images/placeholder.svg" alt="" />
          <h3>Lorem ipsum dolor</h3>
          <span class="card-link">Lorem Ipsum →</span>
        </router-link>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "@/components/AppLayout.vue";

export default {
  components: { AppLayout },
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
  margin-bottom: 1rem;
}

.intro-text {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.catalog-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  h3 {
    padding: 1rem;
    font-size: 1.1rem;
    margin: 0;
  }

  .card-link {
    display: block;
    padding: 0 1rem 1rem;
    font-weight: 600;
    color: #333;
  }
}
</style>
