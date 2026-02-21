<template>
  <ProductDetailView
    page-title="Lorem ipsum dolor sit amet consectetur"
    image-url="https://picsum.photos/800/400?random=50"
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      sections: [
        { title: "Lorem ipsum OPTIMA", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor." },
        { title: "Lorem ipsum dolor sit amet", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt." },
      ],
    };
  },
};
</script>
