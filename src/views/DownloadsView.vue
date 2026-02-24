<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Lorem</router-link>
        <span> → </span>
        <span>Amet</span>
      </div>

      <h1 class="page-title">Lorem ipsum dolor sit amet consectetur</h1>

      <div class="downloads-list">
        <div class="download-item">
          <div class="download-info">
            <h3>Lorem ipsum dolor</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <a href="#" class="btn-download">Lorem</a>
        </div>
        <div class="download-item">
          <div class="download-info">
            <h3>Lorem ipsum dolor sit amet</h3>
            <p>Lorem ipsum dolor</p>
          </div>
          <a href="#" class="btn-download">Lorem</a>
        </div>
        <div class="download-item">
          <div class="download-info">
            <h3>Lorem ipsum dolor r. r.</h3>
            <p>Lorem ipsum dolor sit</p>
          </div>
          <a href="#" class="btn-download">Lorem</a>
        </div>
        <div class="download-item">
          <div class="download-info">
            <h3>Lorem ipsum 7S</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <a href="#" class="btn-download">Lorem</a>
        </div>
        <div class="download-item">
          <div class="download-info">
            <h3>Lorem PC-12</h3>
            <p>Lorem ipsum dolor</p>
          </div>
          <a href="#" class="btn-download">Lorem</a>
        </div>
        <div class="download-item">
          <div class="download-info">
            <h3>Lorem ipsum dolor</h3>
            <p>Lorem ipsum dolor</p>
          </div>
          <a href="#" class="btn-download">Lorem</a>
        </div>
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

.downloads-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.download-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.download-info {
  h3 {
    font-size: 1.1rem;
    margin: 0 0 0.25rem 0;
  }

  p {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }
}

.btn-download {
  padding: 0.5rem 1.5rem;
  background: #333;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  flex-shrink: 0;

  &:hover {
    background: #555;
  }
}
</style>
