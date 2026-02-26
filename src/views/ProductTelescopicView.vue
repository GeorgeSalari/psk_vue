<template>
  <ProductDetailView
    page-title="Lorem ipsum dolor"
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      sections: [
        { title: "Lorem ipsum TLS-2", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
        { title: "Lorem ipsum TLS-3", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod." },
        { title: "Lorem ipsum TLS-4", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor." },
      ],
    };
  },
};
</script>
