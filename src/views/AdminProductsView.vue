<template>
  <AdminLayout>
    <div class="admin-page">
      <div class="page-header">
        <h1>Продукция</h1>
        <button class="btn btn-primary" @click="openCreateModal">+ Добавить</button>
      </div>

      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'published' }" @click="activeTab = 'published'">
          Опубликованные ({{ published.length }})
        </button>
        <button class="tab" :class="{ active: activeTab === 'hidden' }" @click="activeTab = 'hidden'">
          Спрятанные ({{ hidden.length }})
        </button>
      </div>

      <div v-if="loading" class="loading">Загрузка...</div>

      <template v-else>
        <div v-if="activeTab === 'published'">
          <div v-if="published.length === 0" class="empty-state">Нет опубликованной продукции</div>
          <div v-else class="items-grid">
            <div
              v-for="(item, idx) in published"
              :key="item.id"
              class="item-card"
              draggable="true"
              @dragstart="onDragStart(idx)"
              @dragover.prevent="onDragOver(idx)"
              @drop="onDrop(idx)"
              @dragend="onDragEnd"
              :class="{ dragging: dragIdx === idx, 'drag-over': dragOverIdx === idx }"
            >
              <div class="drag-handle">⠿</div>
              <img v-if="item.photo_urls && item.photo_urls.length > 0" :src="item.photo_urls[0]" :alt="item.name" class="item-thumb" />
              <div v-else class="item-thumb item-placeholder">Нет фото</div>
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <span v-if="item.photo_urls" class="photo-count">{{ item.photo_urls.length }} фото</span>
                <p class="item-desc-preview" v-html="truncate(item.description)"></p>
                <div class="item-actions">
                  <button class="btn btn-small btn-warning" @click="toggleDisplay(item)">Спрятать</button>
                  <button class="btn btn-small btn-outline" @click="openEditModal(item)">Редактировать</button>
                  <button class="btn btn-small btn-danger" @click="openDeleteConfirm(item)">Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === 'hidden'">
          <div v-if="hidden.length === 0" class="empty-state">Нет спрятанной продукции</div>
          <div v-else class="items-grid">
            <div v-for="item in hidden" :key="item.id" class="item-card">
              <img v-if="item.photo_urls && item.photo_urls.length > 0" :src="item.photo_urls[0]" :alt="item.name" class="item-thumb" />
              <div v-else class="item-thumb item-placeholder">Нет фото</div>
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <p class="item-desc-preview" v-html="truncate(item.description)"></p>
                <div class="item-actions">
                  <button class="btn btn-small btn-success" @click="toggleDisplay(item)">Показать</button>
                  <button class="btn btn-small btn-outline" @click="openEditModal(item)">Редактировать</button>
                  <button class="btn btn-small btn-danger" @click="openDeleteConfirm(item)">Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal modal-wide">
        <h2>{{ editingItem ? "Редактировать продукт" : "Новый продукт" }}</h2>
        <form @submit.prevent="handleSave">
          <div class="form-group">
            <label>Название</label>
            <input v-model="formName" type="text" placeholder="Название продукта" />
          </div>
          <div class="form-group">
            <label>Описание</label>
            <div ref="editorContainer" class="quill-editor"></div>
          </div>
          <div class="form-group">
            <label>Фото</label>
            <input type="file" accept="image/*" multiple @change="onFilesChange" />
            <div v-if="formImages.length > 0" class="images-preview">
              <div
                v-for="(img, idx) in formImages"
                :key="img.key"
                class="preview-item"
                draggable="true"
                @dragstart="onImgDragStart(idx)"
                @dragover.prevent="onImgDragOver(idx)"
                @drop="onImgDrop(idx)"
                @dragend="onImgDragEnd"
                :class="{ dragging: imgDragIdx === idx, 'drag-over': imgDragOverIdx === idx }"
              >
                <img :src="img.url" alt="Preview" />
                <button type="button" class="remove-btn" @click="removeImage(idx)">&times;</button>
                <span class="position-badge">{{ idx + 1 }}</span>
              </div>
            </div>
          </div>
          <div v-if="formError" class="form-error">{{ formError }}</div>
          <div class="modal-actions">
            <button type="button" class="btn btn-outline" @click="closeModal">Отмена</button>
            <button type="submit" class="btn btn-primary" :disabled="saving">
              {{ saving ? "Сохранение..." : "Сохранить" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="closeDeleteConfirm">
      <div class="modal modal-small">
        <h2>Удалить продукт?</h2>
        <p>Вы уверены, что хотите удалить «{{ deletingItem?.name }}»?</p>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="closeDeleteConfirm">Нет</button>
          <button class="btn btn-danger" :disabled="deleting" @click="handleDelete">
            {{ deleting ? "Удаление..." : "Да, удалить" }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch, nextTick } from "vue";
import AdminLayout from "@/components/AdminLayout.vue";
import { get, post, put, del, patch } from "@/services/api";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Product {
  id: number;
  name: string;
  description: string | null;
  photo_urls: string[];
  photo_ids: number[];
  display: boolean;
  position: number;
  created_at: string;
}

interface FormImage {
  key: string;
  url: string;
  file: File | null;
  existingId: number | null;
}

let keyCounter = 0;

export default defineComponent({
  name: "AdminProductsView",
  components: { AdminLayout },
  setup() {
    const items = ref<Product[]>([]);
    const loading = ref(true);
    const activeTab = ref("published");

    const published = computed(() =>
      items.value.filter((i) => i.display).sort((a, b) => a.position - b.position)
    );
    const hidden = computed(() => items.value.filter((i) => !i.display));

    const showModal = ref(false);
    const editingItem = ref<Product | null>(null);
    const formName = ref("");
    const formImages = ref<FormImage[]>([]);
    const formError = ref("");
    const saving = ref(false);

    const showDeleteConfirm = ref(false);
    const deletingItem = ref<Product | null>(null);
    const deleting = ref(false);

    const editorContainer = ref<HTMLElement | null>(null);
    let quillInstance: Quill | null = null;

    const dragIdx = ref<number | null>(null);
    const dragOverIdx = ref<number | null>(null);
    const imgDragIdx = ref<number | null>(null);
    const imgDragOverIdx = ref<number | null>(null);

    const fetchItems = async () => {
      loading.value = true;
      const result = await get<Product[]>("/products");
      if (result.ok && result.data) items.value = result.data;
      loading.value = false;
    };

    onMounted(fetchItems);

    const initQuill = () => {
      if (editorContainer.value && !quillInstance) {
        quillInstance = new Quill(editorContainer.value, {
          theme: "snow",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          },
          placeholder: "Описание продукта...",
        });
      }
    };

    watch(showModal, async (val) => {
      if (val) {
        await nextTick();
        initQuill();
        if (quillInstance) quillInstance.root.innerHTML = editingItem.value?.description || "";
      } else {
        quillInstance = null;
      }
    });

    const truncate = (html: string | null): string => {
      if (!html) return "";
      const div = document.createElement("div");
      div.innerHTML = html;
      const text = div.textContent || "";
      return text.length > 100 ? text.substring(0, 100) + "..." : text;
    };

    const toggleDisplay = async (item: Product) => {
      await patch(`/products/${item.id}/toggle_display`);
      await fetchItems();
    };

    const onDragStart = (idx: number) => { dragIdx.value = idx; };
    const onDragOver = (idx: number) => { dragOverIdx.value = idx; };
    const onDrop = async (idx: number) => {
      if (dragIdx.value === null || dragIdx.value === idx) return;
      const list = [...published.value];
      const [moved] = list.splice(dragIdx.value, 1);
      list.splice(idx, 0, moved);
      dragIdx.value = null;
      dragOverIdx.value = null;
      await patch("/products/reorder", { ids: list.map((i) => i.id) });
      await fetchItems();
    };
    const onDragEnd = () => { dragIdx.value = null; dragOverIdx.value = null; };

    const onImgDragStart = (idx: number) => { imgDragIdx.value = idx; };
    const onImgDragOver = (idx: number) => { imgDragOverIdx.value = idx; };
    const onImgDrop = (idx: number) => {
      if (imgDragIdx.value === null || imgDragIdx.value === idx) return;
      const list = [...formImages.value];
      const [moved] = list.splice(imgDragIdx.value, 1);
      list.splice(idx, 0, moved);
      formImages.value = list;
      imgDragIdx.value = null;
      imgDragOverIdx.value = null;
    };
    const onImgDragEnd = () => { imgDragIdx.value = null; imgDragOverIdx.value = null; };

    const openCreateModal = () => {
      editingItem.value = null;
      formName.value = "";
      formImages.value = [];
      formError.value = "";
      showModal.value = true;
    };

    const openEditModal = (item: Product) => {
      editingItem.value = item;
      formName.value = item.name;
      formImages.value = (item.photo_urls || []).map((url, i) => ({
        key: `existing-${keyCounter++}`,
        url,
        file: null,
        existingId: item.photo_ids?.[i] || null,
      }));
      formError.value = "";
      showModal.value = true;
    };

    const closeModal = () => { showModal.value = false; };

    const onFilesChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (!files) return;
      for (let i = 0; i < files.length; i++) {
        formImages.value.push({
          key: `new-${keyCounter++}`,
          url: URL.createObjectURL(files[i]),
          file: files[i],
          existingId: null,
        });
      }
      target.value = "";
    };

    const removeImage = (idx: number) => { formImages.value.splice(idx, 1); };

    const handleSave = async () => {
      formError.value = "";
      saving.value = true;
      const description = quillInstance ? quillInstance.root.innerHTML : "";
      const fd = new FormData();
      fd.append("name", formName.value);
      fd.append("description", description);

      if (editingItem.value) {
        const originalIds = editingItem.value.photo_ids || [];
        const currentExistingIds = formImages.value.filter((img) => img.existingId !== null).map((img) => img.existingId as number);
        const removedIds = originalIds.filter((id) => !currentExistingIds.includes(id));
        removedIds.forEach((id) => fd.append("remove_photo_ids[]", String(id)));
        formImages.value.filter((img) => img.file !== null).forEach((img) => fd.append("photos[]", img.file as File));
        fd.append("photo_positions", JSON.stringify(formImages.value.map((img) => img.existingId !== null ? img.existingId : 0)));
      } else {
        formImages.value.forEach((img) => { if (img.file) fd.append("photos[]", img.file); });
      }

      const result = editingItem.value
        ? await put<Product>(`/products/${editingItem.value.id}`, fd)
        : await post<Product>("/products", fd);

      saving.value = false;
      if (result.ok) { closeModal(); await fetchItems(); }
      else { formError.value = result.error || "Ошибка сохранения"; }
    };

    const openDeleteConfirm = (item: Product) => {
      deletingItem.value = item;
      showDeleteConfirm.value = true;
    };

    const closeDeleteConfirm = () => {
      showDeleteConfirm.value = false;
      deletingItem.value = null;
    };

    const handleDelete = async () => {
      if (!deletingItem.value) return;
      deleting.value = true;
      const result = await del(`/products/${deletingItem.value.id}`);
      deleting.value = false;
      if (result.ok) { closeDeleteConfirm(); await fetchItems(); }
    };

    return {
      loading, activeTab, published, hidden,
      showModal, editingItem, formName, formImages, formError, saving,
      showDeleteConfirm, deletingItem, deleting,
      editorContainer, dragIdx, dragOverIdx, imgDragIdx, imgDragOverIdx,
      truncate, toggleDisplay,
      onDragStart, onDragOver, onDrop, onDragEnd,
      onImgDragStart, onImgDragOver, onImgDrop, onImgDragEnd,
      openCreateModal, openEditModal, closeModal, onFilesChange, removeImage, handleSave,
      openDeleteConfirm, closeDeleteConfirm, handleDelete,
    };
  },
});
</script>

<style scoped src="@/assets/admin-crud.css"></style>
