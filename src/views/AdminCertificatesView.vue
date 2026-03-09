<template>
  <AdminLayout>
    <div class="admin-page">
      <div class="page-header">
        <h1>Сертификаты</h1>
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
        <!-- Published Tab -->
        <div v-if="activeTab === 'published'">
          <div v-if="published.length === 0" class="empty-state">Нет опубликованных сертификатов</div>
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
              <img v-if="item.photo_url" :src="item.photo_url" :alt="item.name" class="item-thumb" />
              <div v-else class="item-thumb item-placeholder">Нет фото</div>
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
                <div class="item-actions">
                  <button class="btn btn-small btn-warning" @click="toggleDisplay(item)">Спрятать</button>
                  <button class="btn btn-small btn-outline" @click="openEditModal(item)">Редактировать</button>
                  <button class="btn btn-small btn-danger" @click="openDeleteConfirm(item)">Удалить</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Hidden Tab -->
        <div v-if="activeTab === 'hidden'">
          <div v-if="hidden.length === 0" class="empty-state">Нет спрятанных сертификатов</div>
          <div v-else class="items-grid">
            <div v-for="item in hidden" :key="item.id" class="item-card">
              <img v-if="item.photo_url" :src="item.photo_url" :alt="item.name" class="item-thumb" />
              <div v-else class="item-thumb item-placeholder">Нет фото</div>
              <div class="item-info">
                <span class="item-name">{{ item.name }}</span>
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
      <div class="modal">
        <h2>{{ editingItem ? "Редактировать сертификат" : "Новый сертификат" }}</h2>
        <form @submit.prevent="handleSave">
          <div class="form-group">
            <label>Название</label>
            <input v-model="formName" type="text" placeholder="Название сертификата" />
          </div>
          <div class="form-group">
            <label>Фото</label>
            <input type="file" accept="image/*" @change="onFileChange" />
            <div v-if="previewUrl" class="image-preview">
              <img :src="previewUrl" alt="Preview" />
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
        <h2>Удалить сертификат?</h2>
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
import { defineComponent, ref, computed, onMounted } from "vue";
import AdminLayout from "@/components/AdminLayout.vue";
import { get, post, put, del, patch } from "@/services/api";

interface Certificate {
  id: number;
  name: string;
  photo_url: string | null;
  display: boolean;
  position: number;
  created_at: string;
}

export default defineComponent({
  name: "AdminCertificatesView",
  components: { AdminLayout },
  setup() {
    const items = ref<Certificate[]>([]);
    const loading = ref(true);
    const activeTab = ref("published");

    const published = computed(() =>
      items.value.filter((i) => i.display).sort((a, b) => a.position - b.position)
    );
    const hidden = computed(() => items.value.filter((i) => !i.display));

    const showModal = ref(false);
    const editingItem = ref<Certificate | null>(null);
    const formName = ref("");
    const formFile = ref<File | null>(null);
    const previewUrl = ref<string | null>(null);
    const formError = ref("");
    const saving = ref(false);

    const showDeleteConfirm = ref(false);
    const deletingItem = ref<Certificate | null>(null);
    const deleting = ref(false);

    const dragIdx = ref<number | null>(null);
    const dragOverIdx = ref<number | null>(null);

    const fetchItems = async () => {
      loading.value = true;
      const result = await get<Certificate[]>("/certificates");
      if (result.ok && result.data) items.value = result.data;
      loading.value = false;
    };

    onMounted(fetchItems);

    const toggleDisplay = async (item: Certificate) => {
      await patch(`/certificates/${item.id}/toggle_display`);
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
      await patch("/certificates/reorder", { ids: list.map((i) => i.id) });
      await fetchItems();
    };
    const onDragEnd = () => { dragIdx.value = null; dragOverIdx.value = null; };

    const openCreateModal = () => {
      editingItem.value = null;
      formName.value = "";
      formFile.value = null;
      previewUrl.value = null;
      formError.value = "";
      showModal.value = true;
    };

    const openEditModal = (item: Certificate) => {
      editingItem.value = item;
      formName.value = item.name;
      formFile.value = null;
      previewUrl.value = item.photo_url;
      formError.value = "";
      showModal.value = true;
    };

    const closeModal = () => { showModal.value = false; };

    const onFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0] || null;
      formFile.value = file;
      if (file) previewUrl.value = URL.createObjectURL(file);
    };

    const handleSave = async () => {
      formError.value = "";
      saving.value = true;
      const fd = new FormData();
      fd.append("name", formName.value);
      if (formFile.value) fd.append("photo", formFile.value);

      const result = editingItem.value
        ? await put<Certificate>(`/certificates/${editingItem.value.id}`, fd)
        : await post<Certificate>("/certificates", fd);

      saving.value = false;
      if (result.ok) { closeModal(); await fetchItems(); }
      else { formError.value = result.error || "Ошибка сохранения"; }
    };

    const openDeleteConfirm = (item: Certificate) => {
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
      const result = await del(`/certificates/${deletingItem.value.id}`);
      deleting.value = false;
      if (result.ok) { closeDeleteConfirm(); await fetchItems(); }
    };

    return {
      loading, activeTab, published, hidden,
      showModal, editingItem, formName, previewUrl, formError, saving,
      showDeleteConfirm, deletingItem, deleting,
      dragIdx, dragOverIdx,
      toggleDisplay, onDragStart, onDragOver, onDrop, onDragEnd,
      openCreateModal, openEditModal, closeModal, onFileChange, handleSave,
      openDeleteConfirm, closeDeleteConfirm, handleDelete,
    };
  },
});
</script>

<style scoped src="@/assets/admin-crud.css"></style>
