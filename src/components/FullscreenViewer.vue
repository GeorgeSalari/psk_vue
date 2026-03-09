<template>
  <div v-if="visible" class="fullscreen-overlay" @click.self="$emit('close')">
    <button class="close-btn" @click="$emit('close')">&times;</button>
    <button v-if="images.length > 1" class="nav-btn prev" @click="prev">&lsaquo;</button>
    <div class="fullscreen-image-wrapper">
      <img :src="images[currentIndex]" :alt="alt" class="fullscreen-img" />
    </div>
    <button v-if="images.length > 1" class="nav-btn next" @click="next">&rsaquo;</button>
    <div v-if="images.length > 1" class="counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, onUnmounted } from "vue";

export default defineComponent({
  name: "FullscreenViewer",
  props: {
    visible: { type: Boolean, default: false },
    images: { type: Array as () => string[], required: true },
    alt: { type: String, default: "" },
    startIndex: { type: Number, default: 0 },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const currentIndex = ref(props.startIndex);

    watch(
      () => props.startIndex,
      (val) => {
        currentIndex.value = val;
      }
    );

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      }
    );

    const prev = () => {
      currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : props.images.length - 1;
    };

    const next = () => {
      currentIndex.value = currentIndex.value < props.images.length - 1 ? currentIndex.value + 1 : 0;
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (!props.visible) return;
      if (e.key === "Escape") emit("close");
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    onMounted(() => window.addEventListener("keydown", onKeydown));
    onUnmounted(() => {
      window.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
    });

    return { currentIndex, prev, next };
  },
});
</script>

<style scoped>
.fullscreen-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  font-size: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: background 0.15s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.fullscreen-image-wrapper {
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  font-size: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: background 0.15s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.25);
}

.nav-btn.prev {
  left: 20px;
}

.nav-btn.next {
  right: 20px;
}

.counter {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  z-index: 3;
}
</style>
