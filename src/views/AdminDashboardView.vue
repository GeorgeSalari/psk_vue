<template>
  <AdminLayout>
    <div class="dashboard-content">
      <h1>HELLOW ADMIN!</h1>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminLayout from "@/components/AdminLayout.vue";

export default defineComponent({
  name: "AdminDashboardView",
  components: { AdminLayout },
});
</script>

<style scoped>
.dashboard-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.dashboard-content h1 {
  font-size: 48px;
  font-weight: 700;
  color: #1a1a2e;
}
</style>
