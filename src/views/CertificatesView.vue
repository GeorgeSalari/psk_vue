<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Lorem</router-link>
        <span> → </span>
        <span>Elit</span>
      </div>

      <h1 class="page-title">Lorem ipsum dolor</h1>

      <section class="cert-section">
        <h2>Lorem ipsum dolor sit amet</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </section>

      <section class="cert-section">
        <h2>Lorem ipsum dolor</h2>
        <div class="cert-images">
          <img src="/images/placeholder.svg" alt="" class="cert-img" />
          <img src="/images/placeholder.svg" alt="" class="cert-img" />
        </div>
      </section>
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
