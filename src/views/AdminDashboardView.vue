<template>
  <AdminLayout>
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Аналитика</h1>
        <div class="period-selector">
          <button
            v-for="p in periods"
            :key="p.value"
            class="period-btn"
            :class="{ active: period === p.value }"
            @click="changePeriod(p.value)"
          >
            {{ p.label }}
          </button>
        </div>
      </div>

      <div v-if="loading" class="loading-state">Загрузка...</div>

      <template v-else>
        <div class="summary-cards">
          <div class="summary-card">
            <div class="card-value">{{ overview.unique_visitors }}</div>
            <div class="card-label">Уникальных посетителей</div>
          </div>
          <div class="summary-card">
            <div class="card-value">{{ overview.total_views }}</div>
            <div class="card-label">Просмотров страниц</div>
          </div>
          <div class="summary-card">
            <div class="card-value">{{ overview.total_events }}</div>
            <div class="card-label">Действий (клики)</div>
          </div>
        </div>

        <div class="charts-row">
          <div class="chart-card chart-wide">
            <h3>Посетители по дням</h3>
            <div class="chart-container">
              <Line v-if="visitorsChartData" :data="visitorsChartData" :options="lineOptions" />
              <div v-else class="no-data">Нет данных</div>
            </div>
          </div>
        </div>

        <div class="charts-row">
          <div class="chart-card">
            <h3>Популярные страницы</h3>
            <div class="chart-container">
              <Bar v-if="pagesChartData" :data="pagesChartData" :options="barOptions" />
              <div v-else class="no-data">Нет данных</div>
            </div>
          </div>

          <div class="chart-card">
            <h3>Действия пользователей</h3>
            <div class="events-table" v-if="events.length > 0">
              <div class="events-row events-header">
                <span class="events-name">Событие</span>
                <span class="events-count">Кол-во</span>
              </div>
              <div v-for="evt in events" :key="evt.name" class="events-row">
                <span class="events-name">{{ eventLabel(evt.name) }}</span>
                <span class="events-count">{{ evt.count }}</span>
              </div>
            </div>
            <div v-else class="no-data">Нет данных</div>
          </div>
        </div>
      </template>
    </div>
  </AdminLayout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import AdminLayout from "@/components/AdminLayout.vue";
import { get } from "@/services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Line, Bar } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Filler);

interface Overview {
  unique_visitors: number;
  total_views: number;
  total_events: number;
}

interface PageStat {
  page: string;
  views: number;
}

interface EventStat {
  name: string;
  count: number;
}

interface ChartPoint {
  day: string;
  visitors: number;
}

const EVENT_LABELS: Record<string, string> = {
  product_click: "Клик на продукт",
  form_submit: "Отправка формы",
  phone_click: "Клик на телефон",
  hero_cta_click: "Клик на баннер",
};

const PAGE_LABELS: Record<string, string> = {
  "/": "Главная",
  "/about": "О компании",
  "/products": "Продукция",
  "/catalog": "Каталог",
  "/certificates": "Сертификаты",
  "/contacts": "Контакты",
  "/vacancies": "Вакансии",
  "/downloads": "Загрузки",
};

export default defineComponent({
  name: "AdminDashboardView",
  components: { AdminLayout, Line, Bar },
  setup() {
    const periods = [
      { value: "today", label: "Сегодня" },
      { value: "week", label: "7 дней" },
      { value: "month", label: "30 дней" },
    ];
    const period = ref("month");
    const loading = ref(true);

    const overview = reactive<Overview>({ unique_visitors: 0, total_views: 0, total_events: 0 });
    const pages = ref<PageStat[]>([]);
    const events = ref<EventStat[]>([]);
    const visitorsChart = ref<ChartPoint[]>([]);

    const visitorsChartData = ref<any>(null);
    const pagesChartData = ref<any>(null);

    const lineOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { title: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } },
      },
    };

    const barOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y" as const,
      plugins: { title: { display: false } },
      scales: {
        x: { beginAtZero: true, ticks: { precision: 0 } },
      },
    };

    const fetchData = async () => {
      loading.value = true;
      const p = period.value;

      const [overviewRes, pagesRes, eventsRes, chartRes] = await Promise.all([
        get<Overview>(`/admin/analytics/overview?period=${p}`),
        get<PageStat[]>(`/admin/analytics/pages?period=${p}`),
        get<EventStat[]>(`/admin/analytics/events?period=${p}`),
        get<ChartPoint[]>(`/admin/analytics/visitors_chart?period=${p}`),
      ]);

      if (overviewRes.ok && overviewRes.data) {
        overview.unique_visitors = overviewRes.data.unique_visitors;
        overview.total_views = overviewRes.data.total_views;
        overview.total_events = overviewRes.data.total_events;
      }

      if (pagesRes.ok && pagesRes.data) {
        pages.value = pagesRes.data;
        buildPagesChart(pagesRes.data);
      }

      if (eventsRes.ok && eventsRes.data) {
        events.value = eventsRes.data;
      }

      if (chartRes.ok && chartRes.data) {
        visitorsChart.value = chartRes.data;
        buildVisitorsChart(chartRes.data);
      }

      loading.value = false;
    };

    const buildVisitorsChart = (data: ChartPoint[]) => {
      if (data.length === 0) {
        visitorsChartData.value = null;
        return;
      }
      visitorsChartData.value = {
        labels: data.map((d) => formatDay(d.day)),
        datasets: [
          {
            label: "Посетители",
            data: data.map((d) => d.visitors),
            borderColor: "#4f46e5",
            backgroundColor: "rgba(79, 70, 229, 0.1)",
            fill: true,
            tension: 0.3,
          },
        ],
      };
    };

    const buildPagesChart = (data: PageStat[]) => {
      if (data.length === 0) {
        pagesChartData.value = null;
        return;
      }
      const top = data.slice(0, 10);
      pagesChartData.value = {
        labels: top.map((d) => pageLabel(d.page)),
        datasets: [
          {
            label: "Просмотры",
            data: top.map((d) => d.views),
            backgroundColor: "#4f46e5",
            borderRadius: 4,
          },
        ],
      };
    };

    const formatDay = (day: string) => {
      const d = new Date(day);
      return d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
    };

    const pageLabel = (page: string): string => {
      if (!page) return "Неизвестная";
      const base = page.split("?")[0];
      if (PAGE_LABELS[base]) return PAGE_LABELS[base];
      if (base.startsWith("/products/")) return "Продукт: " + base.replace("/products/", "");
      return base;
    };

    const eventLabel = (name: string): string => {
      return EVENT_LABELS[name] || name;
    };

    const changePeriod = (p: string) => {
      period.value = p;
      fetchData();
    };

    onMounted(fetchData);

    return {
      periods, period, loading, overview, pages, events,
      visitorsChartData, pagesChartData,
      lineOptions, barOptions,
      changePeriod, eventLabel,
    };
  },
});
</script>

<style scoped>
.dashboard {
  padding: 24px;
  max-width: 1200px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.period-selector {
  display: flex;
  gap: 4px;
  background: #e5e7eb;
  border-radius: 8px;
  padding: 3px;
}

.period-btn {
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: #666;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.period-btn.active {
  background: #fff;
  color: #1a1a2e;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.period-btn:hover:not(.active) {
  color: #333;
}

.loading-state {
  text-align: center;
  padding: 60px;
  color: #999;
  font-size: 15px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.summary-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.card-value {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1.2;
}

.card-label {
  font-size: 13px;
  color: #888;
  margin-top: 4px;
}

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.chart-wide {
  grid-column: 1 / -1;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.chart-card h3 {
  font-size: 15px;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0 0 16px;
}

.chart-container {
  height: 280px;
  position: relative;
}

.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 14px;
}

.events-table {
  font-size: 14px;
}

.events-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.events-row:last-child {
  border-bottom: none;
}

.events-header {
  font-weight: 600;
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.events-name {
  color: #333;
}

.events-count {
  font-weight: 600;
  color: #4f46e5;
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .summary-cards {
    grid-template-columns: 1fr;
  }

  .charts-row {
    grid-template-columns: 1fr;
  }
}
</style>
