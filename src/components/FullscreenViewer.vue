<template>
  <div v-if="visible" class="fullscreen-overlay" @click.self="onOverlayClick">
    <button class="close-btn" @click="$emit('close')">&times;</button>
    <button v-if="images.length > 1" class="nav-btn prev" @click="prev">&lsaquo;</button>
    <div
      class="fullscreen-image-wrapper"
      @wheel.prevent="onWheel"
      @mousedown="onMouseDown"
      @mousemove="onMouseMove"
      @mouseup="onMouseUp"
      @mouseleave="onMouseUp"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onMouseUp"
    >
      <img
        :src="images[currentIndex]"
        :alt="alt"
        class="fullscreen-img"
        :class="{ zoomed: scale > 1, grabbing: dragging }"
        :style="imgTransform"
        @click="toggleZoom"
        draggable="false"
      />
    </div>
    <button v-if="images.length > 1" class="nav-btn next" @click="next">&rsaquo;</button>
    <div class="bottom-bar">
      <div v-if="images.length > 1" class="counter">{{ currentIndex + 1 }} / {{ images.length }}</div>
      <div class="zoom-hint" v-if="scale <= 1">Колёсико мыши или клик для увеличения</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onUnmounted } from "vue";

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
    const scale = ref(1);
    const translateX = ref(0);
    const translateY = ref(0);
    const dragging = ref(false);
    const dragStart = ref({ x: 0, y: 0 });
    const dragOffset = ref({ x: 0, y: 0 });

    const MIN_SCALE = 1;
    const MAX_SCALE = 5;

    const imgTransform = computed(() => ({
      transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
    }));

    const resetZoom = () => {
      scale.value = 1;
      translateX.value = 0;
      translateY.value = 0;
      dragging.value = false;
    };

    watch(() => props.startIndex, (val) => { currentIndex.value = val; });

    watch(() => props.visible, (val) => {
      if (val) {
        document.body.style.overflow = "hidden";
        resetZoom();
      } else {
        document.body.style.overflow = "";
      }
    });

    watch(currentIndex, () => resetZoom());

    const prev = () => {
      currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : props.images.length - 1;
    };

    const next = () => {
      currentIndex.value = currentIndex.value < props.images.length - 1 ? currentIndex.value + 1 : 0;
    };

    const toggleZoom = () => {
      if (scale.value > 1) {
        resetZoom();
      } else {
        scale.value = 2.5;
      }
    };

    const onWheel = (e: WheelEvent) => {
      const delta = e.deltaY > 0 ? -0.3 : 0.3;
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value + delta));
      if (newScale === MIN_SCALE) {
        resetZoom();
      } else {
        scale.value = newScale;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      if (scale.value <= 1) return;
      dragging.value = true;
      dragStart.value = { x: e.clientX, y: e.clientY };
      dragOffset.value = { x: translateX.value, y: translateY.value };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragging.value) return;
      translateX.value = dragOffset.value.x + (e.clientX - dragStart.value.x);
      translateY.value = dragOffset.value.y + (e.clientY - dragStart.value.y);
    };

    const onMouseUp = () => {
      dragging.value = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (scale.value <= 1 || e.touches.length !== 1) return;
      dragging.value = true;
      dragStart.value = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      dragOffset.value = { x: translateX.value, y: translateY.value };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.value || e.touches.length !== 1) return;
      e.preventDefault();
      translateX.value = dragOffset.value.x + (e.touches[0].clientX - dragStart.value.x);
      translateY.value = dragOffset.value.y + (e.touches[0].clientY - dragStart.value.y);
    };

    const onOverlayClick = () => {
      if (scale.value > 1) {
        resetZoom();
      } else {
        emit("close");
      }
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (!props.visible) return;
      if (e.key === "Escape") {
        if (scale.value > 1) { resetZoom(); } else { emit("close"); }
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") {
        scale.value = Math.min(MAX_SCALE, scale.value + 0.5);
      }
      if (e.key === "-") {
        const newScale = Math.max(MIN_SCALE, scale.value - 0.5);
        if (newScale === MIN_SCALE) { resetZoom(); } else { scale.value = newScale; }
      }
    };

    onMounted(() => window.addEventListener("keydown", onKeydown));
    onUnmounted(() => {
      window.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
    });

    return {
      currentIndex, scale, imgTransform, dragging,
      prev, next, toggleZoom, onWheel,
      onMouseDown, onMouseMove, onMouseUp,
      onTouchStart, onTouchMove, onOverlayClick,
    };
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
  overflow: hidden;
}

.fullscreen-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
  transition: transform 0.2s ease;
  cursor: zoom-in;
  user-select: none;
}

.fullscreen-img.zoomed {
  cursor: grab;
  transition: none;
}

.fullscreen-img.grabbing {
  cursor: grabbing;
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

.bottom-bar {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  z-index: 3;
}

.counter {
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
}

.zoom-hint {
  color: rgba(255, 255, 255, 0.45);
  font-size: 13px;
}
</style>
