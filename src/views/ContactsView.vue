<template>
  <AppLayout>
    <div class="contacts-page">
      <!-- Hero / CTA section -->
      <section class="contact-hero">
        <h2 class="contact-hero-title">Свяжитесь с нами</h2>
        <div class="contact-hero-links">
          <a href="tel:+79180301137" class="contact-hero-link" @click="trackPhone('89180301137')">8 (918) 030-11-37</a>
          <a href="tel:+79627667256" class="contact-hero-link" @click="trackPhone('89627667256')">8 (962) 766-72-56</a>
        </div>
        <a href="mailto:PSKMontag23@yandex.ru" class="contact-hero-email">PSKMontag23@yandex.ru</a>
      </section>

      <div class="page-content">
        <div class="breadcrumb">
          <router-link to="/">Главная</router-link>
          <span> » </span>
          <span>Контактная информация</span>
        </div>

        <h1 class="page-title">Контактная информация</h1>

        <div class="contacts-grid">
          <div class="contact-info">
            <h2 class="contact-company">Завод стальных дверей «ПСК Монтаж»</h2>
            <p class="contact-address">Республика Адыгея, хутор Новый Сад, ул. Дорожная, 1</p>
            <p class="contact-tax">ИНН 2312338712, КПП 231201001</p>
            <p class="contact-phone">
              <a href="tel:+79180301137" @click="trackPhone('89180301137')">8 (918) 030-11-37</a>,
              <a href="tel:+79627667256" @click="trackPhone('89627667256')">8 (962) 766-72-56</a>
            </p>
            <p class="contact-email">
              <a href="mailto:PSKMontag23@yandex.ru">PSKMontag23@yandex.ru</a>
            </p>
            <p class="contact-site">
              <a href="https://PSK-montag.ru" target="_blank" rel="noopener noreferrer">PSK-montag.ru</a>
            </p>
          </div>

          <div class="contact-form-wrapper">
            <p class="form-note">Заполните форму и мы свяжемся с вами в ближайшее время</p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import ContactForm from "@/components/ContactForm.vue";
import { trackClick } from "@/services/analytics";

export default defineComponent({
  components: { AppLayout, ContactForm },
  methods: {
    trackPhone(phone: string) {
      trackClick("phone_click", { phone, page: "/contacts" });
    },
  },
});
</script>

<style lang="scss" scoped>
.contacts-page {
  min-height: 100vh;
}

.contact-hero {
  background: #1a1a1a;
  color: #fff;
  padding: 2.5rem 2rem;
  text-align: center;
}

.contact-hero-title {
  font-size: 1.5rem;
  margin: 0 0 1rem;
  font-weight: 600;
}

.contact-hero-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.contact-hero-link {
  color: #fff;
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.contact-hero-email {
  display: block;
  color: #fff;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
}

.page-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}

.breadcrumb {
  margin-bottom: 1.5rem;
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
  font-size: 1.75rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
}

.contact-info {
  .contact-company {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    margin: 0 0 0.75rem;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: #333;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.contact-form-wrapper {
  .form-note {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
    color: #555;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 2rem 1rem;
  }

  .contact-hero-links {
    flex-direction: column;
  }

  .page-content {
    padding: 1.5rem;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
