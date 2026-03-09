<template>
  <div class="carousel" :style="{ height: height }">
    <div class="carousel-inner">
      <img :src="images[currentIndex]" :alt="alt" class="carousel-img" @click="$emit('click', currentIndex)" />
    </div>
    <template v-if="images.length > 1">
      <button class="carousel-btn prev" @click.prevent.stop="prev">&lsaquo;</button>
      <button class="carousel-btn next" @click.prevent.stop="next">&rsaquo;</button>
      <div class="carousel-dots">
        <span
          v-for="(_, i) in images"
          :key="i"
          class="dot"
          :class="{ active: i === currentIndex }"
          @click.prevent.stop="currentIndex = i"
        ></span>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "ImageCarousel",
  props: {
    images: { type: Array as () => string[], required: true },
    alt: { type: String, default: "" },
    height: { type: String, default: "100%" },
    startIndex: { type: Number, default: 0 },
  },
  emits: ["click"],
  setup(props) {
    const currentIndex = ref(props.startIndex);

    watch(
      () => props.images,
      () => {
        if (currentIndex.value >= props.images.length) {
          currentIndex.value = 0;
        }
      }
    );

    const prev = () => {
      currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : props.images.length - 1;
    };

    const next = () => {
      currentIndex.value = currentIndex.value < props.images.length - 1 ? currentIndex.value + 1 : 0;
    };

    return { currentIndex, prev, next };
  },
});
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #f3f4f6;
}

.carousel-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  cursor: pointer;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  z-index: 2;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.75);
}

.carousel-btn.prev {
  left: 8px;
}

.carousel-btn.next {
  right: 8px;
}

.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 2;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.15s;
}

.dot.active {
  background: #fff;
}
</style>
