<template>
  <ProductDetailView
    page-title="Lorem ipsum dolor r. r. PROFF"
    :image-url="placeholderImg"
    :description="description"
    :sections="sections"
  />
</template>

<script lang="ts">
import ProductDetailView from "./ProductDetailView.vue";
import { PLACEHOLDER_IMAGE } from "@/constants/images";

export default {
  components: { ProductDetailView },
  data() {
    return {
      placeholderImg: PLACEHOLDER_IMAGE,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      sections: [],
    };
  },
};
</script>
