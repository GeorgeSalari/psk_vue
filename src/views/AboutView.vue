<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Главная</router-link>
        <span> → </span>
        <span>О компании</span>
      </div>

      <h1 class="page-title">О компании</h1>

      <p class="intro-text">
        Двери производства «ПСК Монтаж» — это прекрасно зарекомендовавшая себя продукция премиум класса. Качество является корпоративной идеей компании.
      </p>

      <section class="content-section">
        <h2>Наша философия</h2>
        <p>
          Постоянное развитие оригинальных идей и решений всегда было характерной чертой компании. Предприятие за время работы освоило выпуск десятков наименований продукции с различными функциями, но обязательно выполненной по индивидуальным размерам.
        </p>
      </section>

      <section class="content-section">
        <h2>Индивидуальный подход</h2>
        <p>
          Учитывая разнообразие специальных комплектующих и отделочных материалов, трудно найти среди тысяч выполненных объектов два одинаковых. Весь персонал компании нацелен на поиск и освоение нового продукта, постоянно изучаются достижения в разработке инновационных технологий, комплектующих и материалов, а индивидуальность позволяет гарантировать выполнение заказа любой сложности.
        </p>
      </section>

      <section class="content-section cta-section">
        <p class="cta-text">
          Ознакомьтесь с нашим <router-link to="/catalog">каталогом продукции</router-link> или перейдите в раздел <router-link to="/contacts">контактов</router-link> для уточнения деталей и оформления заказа.
        </p>
      </section>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";

export default defineComponent({
  components: { AppLayout },
});
</script>

<style lang="scss" scoped>
.page-content {
  max-width: 800px;
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
  margin-bottom: 0.5rem;
}

.intro-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #444;
  margin-bottom: 2rem;
}

.content-section {
  margin-bottom: 3rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: #555;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin-bottom: 0.75rem;
      line-height: 1.6;
      color: #555;
    }
  }
}

.cta-section {
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;

  .cta-text {
    margin: 0;
    text-align: center;
    font-size: 1.05rem;

    a {
      color: #1a1a1a;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
