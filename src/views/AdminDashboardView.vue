<template>
  <div class="dashboard-page">
    <h1>HELLOW ADMIN!</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminDashboardView",
});
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
}

.dashboard-page h1 {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a2e;
}
</style>
