<template>
  <AdminLayout>
    <div class="certs-page">
      <div class="certs-header">
        <h1>Сертификаты</h1>
        <button class="btn btn-primary" @click="openCreateModal">+ Добавить</button>
      </div>

      <div v-if="loading" class="loading">Загрузка...</div>

      <div v-else-if="certificates.length === 0" class="empty-state">
        Сертификаты не найдены
      </div>

      <div v-else class="certs-grid">
        <div v-for="cert in certificates" :key="cert.id" class="cert-card">
          <img
            v-if="cert.photo_url"
            :src="cert.photo_url"
            :alt="cert.name"
            class="cert-thumb"
          />
          <div v-else class="cert-thumb cert-placeholder">Нет фото</div>
          <div class="cert-info">
            <span class="cert-name">{{ cert.name }}</span>
            <div class="cert-actions">
              <button class="btn btn-small btn-outline" @click="openEditModal(cert)">
                Редактировать
              </button>
              <button class="btn btn-small btn-danger" @click="openDeleteConfirm(cert)">
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create / Edit Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h2>{{ editingCert ? "Редактировать сертификат" : "Новый сертификат" }}</h2>
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
        <p>Вы уверены, что хотите удалить «{{ deletingCert?.name }}»?</p>
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
import { defineComponent, ref, onMounted } from "vue";
import AdminLayout from "@/components/AdminLayout.vue";
import { get, post, put, del } from "@/services/api";

interface Certificate {
  id: number;
  name: string;
  photo_url: string | null;
  created_at: string;
}

export default defineComponent({
  name: "AdminCertificatesView",
  components: { AdminLayout },
  setup() {
    const certificates = ref<Certificate[]>([]);
    const loading = ref(true);

    const showModal = ref(false);
    const editingCert = ref<Certificate | null>(null);
    const formName = ref("");
    const formFile = ref<File | null>(null);
    const previewUrl = ref<string | null>(null);
    const formError = ref("");
    const saving = ref(false);

    const showDeleteConfirm = ref(false);
    const deletingCert = ref<Certificate | null>(null);
    const deleting = ref(false);

    const fetchCertificates = async () => {
      loading.value = true;
      const result = await get<Certificate[]>("/certificates");
      if (result.ok && result.data) {
        certificates.value = result.data;
      }
      loading.value = false;
    };

    onMounted(fetchCertificates);

    const openCreateModal = () => {
      editingCert.value = null;
      formName.value = "";
      formFile.value = null;
      previewUrl.value = null;
      formError.value = "";
      showModal.value = true;
    };

    const openEditModal = (cert: Certificate) => {
      editingCert.value = cert;
      formName.value = cert.name;
      formFile.value = null;
      previewUrl.value = cert.photo_url;
      formError.value = "";
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const onFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0] || null;
      formFile.value = file;
      if (file) {
        previewUrl.value = URL.createObjectURL(file);
      }
    };

    const handleSave = async () => {
      formError.value = "";
      saving.value = true;

      const fd = new FormData();
      fd.append("name", formName.value);
      if (formFile.value) {
        fd.append("photo", formFile.value);
      }

      let result;
      if (editingCert.value) {
        result = await put<Certificate>(
          `/certificates/${editingCert.value.id}`,
          fd
        );
      } else {
        result = await post<Certificate>("/certificates", fd);
      }

      saving.value = false;

      if (result.ok) {
        closeModal();
        await fetchCertificates();
      } else {
        formError.value = result.error || "Ошибка сохранения";
      }
    };

    const openDeleteConfirm = (cert: Certificate) => {
      deletingCert.value = cert;
      showDeleteConfirm.value = true;
    };

    const closeDeleteConfirm = () => {
      showDeleteConfirm.value = false;
      deletingCert.value = null;
    };

    const handleDelete = async () => {
      if (!deletingCert.value) return;
      deleting.value = true;
      const result = await del(`/certificates/${deletingCert.value.id}`);
      deleting.value = false;
      if (result.ok) {
        closeDeleteConfirm();
        await fetchCertificates();
      }
    };

    return {
      certificates,
      loading,
      showModal,
      editingCert,
      formName,
      previewUrl,
      formError,
      saving,
      showDeleteConfirm,
      deletingCert,
      deleting,
      openCreateModal,
      openEditModal,
      closeModal,
      onFileChange,
      handleSave,
      openDeleteConfirm,
      closeDeleteConfirm,
      handleDelete,
    };
  },
});
</script>

<style scoped>
.certs-page {
  padding: 32px;
}

.certs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.certs-header h1 {
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

.certs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.cert-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.cert-thumb {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.cert-placeholder {
  background: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
}

.cert-info {
  padding: 16px;
}

.cert-name {
  font-weight: 600;
  color: #1a1a2e;
  display: block;
  margin-bottom: 12px;
}

.cert-actions {
  display: flex;
  gap: 8px;
}

/* Buttons */
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

/* Modal */
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

.image-preview {
  margin-top: 12px;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
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
