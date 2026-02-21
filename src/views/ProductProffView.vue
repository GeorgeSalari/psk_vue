<template>
  <ProductDetailView
    page-title="Lorem ipsum dolor r. r. PROFF"
    image-url="https://picsum.photos/800/400?random=51"
    :description="description"
    :sections="sections"
  />
</template>

<script lang="ts">
import ProductDetailView from "./ProductDetailView.vue";

export default {
  components: { ProductDetailView },
  data() {
    return {
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      sections: [],
    };
  },
};
</script>
