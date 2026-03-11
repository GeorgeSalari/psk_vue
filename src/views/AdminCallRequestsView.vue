<template>
  <AdminLayout>
    <div class="admin-page">
      <div class="page-header">
        <h1>Запросы на звонок</h1>
      </div>

      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'pending' }" @click="switchTab('pending')">
          Новые ({{ pendingCount }})
        </button>
        <button class="tab" :class="{ active: activeTab === 'processed' }" @click="switchTab('processed')">
          Обработанные ({{ processedCount }})
        </button>
      </div>

      <div v-if="loading" class="loading">Загрузка...</div>

      <template v-else>
        <div v-if="items.length === 0" class="empty-state">
          {{ activeTab === 'pending' ? 'Нет новых запросов' : 'Нет обработанных запросов' }}
        </div>

        <div v-else class="requests-list">
          <div v-for="item in items" :key="item.id" class="request-card">
            <div class="request-info">
              <div class="request-row">
                <span class="request-label">Имя:</span>
                <span class="request-value">{{ item.contact_name }}</span>
              </div>
              <div class="request-row">
                <span class="request-label">Телефон:</span>
                <a :href="`tel:${item.phone}`" class="request-value request-phone">{{ item.phone }}</a>
              </div>
              <div v-if="item.comment" class="request-row">
                <span class="request-label">Комментарий:</span>
                <span class="request-value">{{ item.comment }}</span>
              </div>
              <div class="request-row request-meta">
                <span>{{ formatDate(item.created_at) }}</span>
                <span v-if="item.email_sent_at" class="email-sent">✓ Email отправлен</span>
                <span v-else class="email-pending">Email в очереди</span>
              </div>
            </div>
            <div class="request-actions">
              <button
                v-if="activeTab === 'pending'"
                class="btn btn-small btn-success"
                @click="confirmChangeState(item)"
              >
                Связался
              </button>
              <button
                v-else
                class="btn btn-small btn-warning"
                @click="confirmChangeState(item)"
              >
                Взять снова в работу
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirm" class="modal-overlay" @click.self="closeConfirm">
      <div class="modal modal-small">
        <h2>{{ confirmTitle }}</h2>
        <p>{{ confirmMessage }}</p>
        <div class="modal-actions">
          <button class="btn btn-outline" @click="closeConfirm">Нет</button>
          <button class="btn btn-primary" :disabled="saving" @click="handleChangeState">
            {{ saving ? "Сохранение..." : "Да" }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import AdminLayout from "@/components/AdminLayout.vue";
import { get, post } from "@/services/api";

interface CallRequest {
  id: number;
  contact_name: string;
  phone: string;
  comment: string | null;
  called: boolean;
  email_sent_at: string | null;
  created_at: string;
}

export default defineComponent({
  name: "AdminCallRequestsView",
  components: { AdminLayout },
  setup() {
    const items = ref<CallRequest[]>([]);
    const loading = ref(true);
    const activeTab = ref("pending");
    const pendingCount = ref(0);
    const processedCount = ref(0);

    const showConfirm = ref(false);
    const confirmItem = ref<CallRequest | null>(null);
    const saving = ref(false);

    const confirmTitle = computed(() =>
      confirmItem.value?.called ? "Взять снова в работу?" : "Отметить как обработанный?"
    );
    const confirmMessage = computed(() =>
      confirmItem.value?.called
        ? `Вернуть запрос от «${confirmItem.value?.contact_name}» в новые?`
        : `Отметить запрос от «${confirmItem.value?.contact_name}» как обработанный?`
    );

    const fetchItems = async () => {
      loading.value = true;
      const result = await get<CallRequest[]>(`/call_requests?filter=${activeTab.value}`);
      if (result.ok && result.data) {
        items.value = result.data;
      }
      loading.value = false;
    };

    const fetchCounts = async () => {
      const [pendingRes, processedRes] = await Promise.all([
        get<CallRequest[]>("/call_requests?filter=pending"),
        get<CallRequest[]>("/call_requests?filter=processed"),
      ]);
      pendingCount.value = pendingRes.ok && pendingRes.data ? pendingRes.data.length : 0;
      processedCount.value = processedRes.ok && processedRes.data ? processedRes.data.length : 0;
    };

    const switchTab = async (tab: string) => {
      activeTab.value = tab;
      await fetchItems();
    };

    const confirmChangeState = (item: CallRequest) => {
      confirmItem.value = item;
      showConfirm.value = true;
    };

    const closeConfirm = () => {
      showConfirm.value = false;
      confirmItem.value = null;
    };

    const handleChangeState = async () => {
      if (!confirmItem.value) return;
      saving.value = true;
      await post(`/call_requests/${confirmItem.value.id}/change_state`, {});
      saving.value = false;
      closeConfirm();
      await fetchItems();
      await fetchCounts();
    };

    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      return d.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    onMounted(async () => {
      await Promise.all([fetchItems(), fetchCounts()]);
    });

    return {
      items, loading, activeTab, pendingCount, processedCount,
      showConfirm, confirmItem, confirmTitle, confirmMessage, saving,
      switchTab, confirmChangeState, closeConfirm, handleChangeState, formatDate,
    };
  },
});
</script>

<style scoped src="@/assets/admin-crud.css"></style>

<style scoped>
.requests-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px 24px;
}

.request-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.request-info {
  flex: 1;
  min-width: 0;
}

.request-row {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
  font-size: 14px;
}

.request-row:last-child {
  margin-bottom: 0;
}

.request-label {
  color: #888;
  flex-shrink: 0;
  min-width: 100px;
}

.request-value {
  color: #333;
  word-break: break-word;
}

.request-phone {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
}

.request-phone:hover {
  text-decoration: underline;
}

.request-meta {
  margin-top: 8px;
  font-size: 12px;
  color: #999;
  display: flex;
  gap: 12px;
}

.email-sent {
  color: #16a34a;
}

.email-pending {
  color: #f59e0b;
}

.request-actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .requests-list {
    padding: 0;
    gap: 10px;
  }

  .request-card {
    flex-direction: column;
    gap: 12px;
    padding: 14px;
  }

  .request-row {
    flex-direction: column;
    gap: 2px;
    margin-bottom: 8px;
  }

  .request-label {
    min-width: unset;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .request-value {
    font-size: 15px;
  }

  .request-phone {
    font-size: 17px;
    display: inline-block;
    padding: 6px 0;
  }

  .request-meta {
    flex-wrap: wrap;
  }

  .request-actions {
    width: 100%;
    border-top: 1px solid #f0f0f0;
    padding-top: 12px;
  }

  .request-actions .btn {
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 14px;
  }
}
</style>
