<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Главная</router-link>
        <span> → </span>
        <span>Вакансии</span>
      </div>

      <h1 class="page-title">Вакансии</h1>

      <div v-if="loading" class="loading-text">Загрузка...</div>

      <div v-else-if="vacancies.length === 0" class="empty-state">
        На данный момент открытых вакансий нет.
      </div>

      <div v-else class="vacancies-list">
        <div v-for="vacancy in vacancies" :key="vacancy.id" class="vacancy-card">
          <div class="vacancy-image">
            <img v-if="vacancy.photo_url" :src="vacancy.photo_url" :alt="vacancy.name" />
          </div>
          <div class="vacancy-body">
            <h3>{{ vacancy.name }}</h3>
            <div v-if="vacancy.description" class="vacancy-description" v-html="vacancy.description"></div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import { get } from "@/services/api";

interface Vacancy {
  id: number;
  name: string;
  description: string | null;
  photo_url: string | null;
  created_at: string;
}

export default defineComponent({
  name: "VacanciesView",
  components: { AppLayout },
  setup() {
    const vacancies = ref<Vacancy[]>([]);
    const loading = ref(true);

    onMounted(async () => {
      const result = await get<Vacancy[]>("/vacancies?published=true");
      if (result.ok && result.data) {
        vacancies.value = result.data;
      }
      loading.value = false;
    });

    return { vacancies, loading };
  },
});
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.breadcrumb {
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #333;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.page-title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.loading-text {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.empty-state {
  text-align: center;
  color: #6b7280;
  padding: 3rem;
  font-size: 1.05rem;
}

.vacancies-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.vacancy-card {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .vacancy-image {
    flex-shrink: 0;
    width: 200px;
    height: 150px;
    border-radius: 4px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .vacancy-body {
    flex: 1;

    h3 {
      font-size: 1.25rem;
      margin: 0 0 0.75rem;
    }

    .vacancy-description {
      color: #4b5563;
      line-height: 1.6;
      font-size: 0.95rem;

      :deep(p) {
        margin: 0 0 0.5rem;
      }

      :deep(ul),
      :deep(ol) {
        margin: 0 0 0.5rem;
        padding-left: 1.5rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .vacancy-card {
    flex-direction: column;

    .vacancy-image {
      width: 100%;
      height: 200px;
    }
  }
}
</style>
