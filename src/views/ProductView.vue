<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Lorem</router-link>
        <span> → </span>
        <span>Ipsum</span>
      </div>

      <h1 class="page-title">Lorem ipsum dolor</h1>

      <p class="intro-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <div class="product-links">
        <router-link to="/product/sliding-drives" class="product-link-card">
          <div class="link-image">
            <img src="https://picsum.photos/400/250?random=10" alt="" />
          </div>
          <h3>Lorem ipsum dolor sit amet consectetur</h3>
          <span class="link-arrow">Lorem Ipsum →</span>
        </router-link>

        <router-link to="/product/telescopic" class="product-link-card">
          <div class="link-image">
            <img src="https://picsum.photos/400/250?random=11" alt="" />
          </div>
          <h3>Lorem ipsum dolor sit amet</h3>
          <span class="link-arrow">Lorem Ipsum →</span>
        </router-link>

        <router-link to="/product/proff" class="product-link-card">
          <div class="link-image">
            <img src="https://picsum.photos/400/250?random=12" alt="" />
          </div>
          <h3>Lorem ipsum dolor r. r.</h3>
          <span class="link-arrow">Lorem Ipsum →</span>
        </router-link>

        <router-link to="/product/accessories" class="product-link-card">
          <div class="link-image">
            <img src="https://picsum.photos/400/250?random=13" alt="" />
          </div>
          <h3>Lorem ipsum dolor</h3>
          <span class="link-arrow">Lorem Ipsum →</span>
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
  margin-bottom: 3rem;
  line-height: 1.6;
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
    width: 200px;
    height: 130px;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

@media (max-width: 768px) {
  .product-link-card {
    flex-direction: column;
    align-items: flex-start;

    .link-image {
      width: 100%;
      height: 180px;
    }
  }
}
</style>
