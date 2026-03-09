<template>
  <AdminLayout>
    <div class="products-page">
      <div class="products-header">
        <h1>Продукция</h1>
        <button class="btn btn-primary" @click="openCreateModal">+ Добавить</button>
      </div>

      <div v-if="loading" class="loading">Загрузка...</div>

      <div v-else-if="products.length === 0" class="empty-state">
        Продукция не найдена
      </div>

      <div v-else class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <img
            v-if="product.photo_urls && product.photo_urls.length > 0"
            :src="product.photo_urls[0]"
            :alt="product.name"
            class="product-thumb"
          />
          <div v-else class="product-thumb product-placeholder">Нет фото</div>
          <div class="product-info">
            <span class="product-name">{{ product.name }}</span>
            <span v-if="product.photo_urls" class="photo-count">{{ product.photo_urls.length }} фото</span>
            <p class="product-desc-preview" v-html="truncate(product.description)"></p>
            <div class="product-actions">
              <button class="btn btn-small btn-outline" @click="openEditModal(product)">
                Редактировать
              </button>
              <button class="btn btn-small btn-danger" @click="openDeleteConfirm(product)">
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal modal-wide">
        <h2>{{ editingProduct ? "Редактировать продукт" : "Новый продукт" }}</h2>
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
                @dragstart="onDragStart(idx)"
                @dragover.prevent="onDragOver(idx)"
                @drop="onDrop(idx)"
                @dragend="onDragEnd"
                :class="{ dragging: dragIdx === idx, 'drag-over': dragOverIdx === idx }"
              >
                <img :src="img.url" alt="Preview" />
                <button type="button" class="remove-btn" @click="removeImage(idx)" title="Удалить">&times;</button>
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
        <p>Вы уверены, что хотите удалить «{{ deletingProduct?.name }}»?</p>
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
import { defineComponent, ref, onMounted, watch, nextTick } from "vue";
import AdminLayout from "@/components/AdminLayout.vue";
import { get, post, put, del } from "@/services/api";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface Product {
  id: number;
  name: string;
  description: string | null;
  photo_urls: string[];
  photo_ids: number[];
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
    const products = ref<Product[]>([]);
    const loading = ref(true);

    const showModal = ref(false);
    const editingProduct = ref<Product | null>(null);
    const formName = ref("");
    const formImages = ref<FormImage[]>([]);
    const formError = ref("");
    const saving = ref(false);

    const showDeleteConfirm = ref(false);
    const deletingProduct = ref<Product | null>(null);
    const deleting = ref(false);

    const editorContainer = ref<HTMLElement | null>(null);
    let quillInstance: Quill | null = null;

    const dragIdx = ref<number | null>(null);
    const dragOverIdx = ref<number | null>(null);

    const fetchProducts = async () => {
      loading.value = true;
      const result = await get<Product[]>("/products");
      if (result.ok && result.data) {
        products.value = result.data;
      }
      loading.value = false;
    };

    onMounted(fetchProducts);

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
        if (quillInstance) {
          quillInstance.root.innerHTML = editingProduct.value?.description || "";
        }
      } else {
        quillInstance = null;
      }
    });

    const truncate = (html: string | null): string => {
      if (!html) return "";
      const div = document.createElement("div");
      div.innerHTML = html;
      const text = div.textContent || "";
      return text.length > 120 ? text.substring(0, 120) + "..." : text;
    };

    const openCreateModal = () => {
      editingProduct.value = null;
      formName.value = "";
      formImages.value = [];
      formError.value = "";
      showModal.value = true;
    };

    const openEditModal = (product: Product) => {
      editingProduct.value = product;
      formName.value = product.name;
      formImages.value = (product.photo_urls || []).map((url, i) => ({
        key: `existing-${keyCounter++}`,
        url,
        file: null,
        existingId: product.photo_ids?.[i] || null,
      }));
      formError.value = "";
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

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

    const removeImage = (idx: number) => {
      formImages.value.splice(idx, 1);
    };

    const onDragStart = (idx: number) => {
      dragIdx.value = idx;
    };
    const onDragOver = (idx: number) => {
      dragOverIdx.value = idx;
    };
    const onDrop = (idx: number) => {
      if (dragIdx.value === null || dragIdx.value === idx) return;
      const items = [...formImages.value];
      const [moved] = items.splice(dragIdx.value, 1);
      items.splice(idx, 0, moved);
      formImages.value = items;
      dragIdx.value = null;
      dragOverIdx.value = null;
    };
    const onDragEnd = () => {
      dragIdx.value = null;
      dragOverIdx.value = null;
    };

    const handleSave = async () => {
      formError.value = "";
      saving.value = true;

      const description = quillInstance ? quillInstance.root.innerHTML : "";
      const fd = new FormData();
      fd.append("name", formName.value);
      fd.append("description", description);

      if (editingProduct.value) {
        const originalIds = editingProduct.value.photo_ids || [];
        const currentExistingIds = formImages.value
          .filter((img) => img.existingId !== null)
          .map((img) => img.existingId as number);
        const removedIds = originalIds.filter((id) => !currentExistingIds.includes(id));
        removedIds.forEach((id) => fd.append("remove_photo_ids[]", String(id)));

        const newFiles = formImages.value.filter((img) => img.file !== null);
        newFiles.forEach((img) => fd.append("photos[]", img.file as File));

        const positionOrder = formImages.value.map((img) => {
          if (img.existingId !== null) return img.existingId;
          return 0;
        });
        fd.append("photo_positions", JSON.stringify(positionOrder));
      } else {
        formImages.value.forEach((img) => {
          if (img.file) fd.append("photos[]", img.file);
        });
      }

      let result;
      if (editingProduct.value) {
        result = await put<Product>(`/products/${editingProduct.value.id}`, fd);
      } else {
        result = await post<Product>("/products", fd);
      }

      saving.value = false;

      if (result.ok) {
        closeModal();
        await fetchProducts();
      } else {
        formError.value = result.error || "Ошибка сохранения";
      }
    };

    const openDeleteConfirm = (product: Product) => {
      deletingProduct.value = product;
      showDeleteConfirm.value = true;
    };

    const closeDeleteConfirm = () => {
      showDeleteConfirm.value = false;
      deletingProduct.value = null;
    };

    const handleDelete = async () => {
      if (!deletingProduct.value) return;
      deleting.value = true;
      const result = await del(`/products/${deletingProduct.value.id}`);
      deleting.value = false;
      if (result.ok) {
        closeDeleteConfirm();
        await fetchProducts();
      }
    };

    return {
      products,
      loading,
      showModal,
      editingProduct,
      formName,
      formImages,
      formError,
      saving,
      showDeleteConfirm,
      deletingProduct,
      deleting,
      editorContainer,
      dragIdx,
      dragOverIdx,
      truncate,
      openCreateModal,
      openEditModal,
      closeModal,
      onFilesChange,
      removeImage,
      onDragStart,
      onDragOver,
      onDrop,
      onDragEnd,
      handleSave,
      openDeleteConfirm,
      closeDeleteConfirm,
      handleDelete,
    };
  },
});
</script>

<style scoped>
.products-page {
  padding: 32px;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.products-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.loading,
.empty-state {
  text-align: center;
  padding: 48px;
  color: #6b7280;
  font-size: 15px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.product-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.product-thumb {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.product-placeholder {
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
}

.product-info {
  padding: 16px;
}

.product-name {
  font-weight: 600;
  color: #1a1a2e;
  display: block;
  margin-bottom: 4px;
  font-size: 16px;
}

.photo-count {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 6px;
  display: block;
}

.product-desc-preview {
  color: #6b7280;
  font-size: 13px;
  line-height: 1.4;
  margin: 0 0 12px;
}

.product-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: all 0.15s;
}

.btn-primary {
  background: #4f46e5;
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  background: #4338ca;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-outline {
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn-outline:hover {
  background: #f9fafb;
}

.btn-danger {
  background: #dc2626;
  color: #fff;
}

.btn-danger:hover:not(:disabled) {
  background: #b91c1c;
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-small {
  padding: 6px 12px;
  font-size: 13px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-wide {
  max-width: 720px;
}

.modal-small {
  max-width: 400px;
}

.modal h2 {
  margin: 0 0 20px;
  font-size: 20px;
  color: #1a1a2e;
}

.modal p {
  color: #4b5563;
  margin: 0 0 20px;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.form-group input[type="text"] {
  width: 100%;
  padding: 10px 14px;
  font-size: 15px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-group input[type="text"]:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group input[type="file"] {
  font-size: 14px;
}

.quill-editor {
  min-height: 150px;
  background: #fff;
  border-radius: 0 0 8px 8px;
}

.images-preview {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.preview-item {
  position: relative;
  width: 110px;
  height: 110px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
  cursor: grab;
  transition: border-color 0.15s, opacity 0.15s;
}

.preview-item:active {
  cursor: grabbing;
}

.preview-item.dragging {
  opacity: 0.4;
}

.preview-item.drag-over {
  border-color: #4f46e5;
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.remove-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.9);
  color: #fff;
  border: none;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.position-badge {
  position: absolute;
  bottom: 4px;
  left: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-error {
  background: #fef2f2;
  color: #dc2626;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  border: 1px solid #fecaca;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>
