<template>
  <div class="layout">
    <header class="header">
      <div class="header-container">
        <router-link to="/" class="logo-link">
          <img :src="logoUrl" alt="ПСК МОНТАЖ" class="logo" />
        </router-link>
        <nav class="nav">
          <router-link to="/about" class="nav-link">О компании</router-link>
          <router-link to="/product" class="nav-link">Продукция</router-link>
<router-link to="/catalog" class="nav-link">Каталог</router-link>
        <router-link to="/certificates" class="nav-link">Сертификаты</router-link>
          <router-link to="/contacts" class="nav-link">Контакты</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer-main">
        <div class="footer-section footer-brand">
          <router-link to="/" class="footer-logo-link">
            <img :src="logoUrl" alt="ПСК МОНТАЖ" class="footer-logo" />
          </router-link>
        </div>
        <div class="footer-section footer-contact">
          <p class="footer-company">Завод стальных дверей «ПСК Монтаж»</p>
          <p>
            <a href="tel:+79180301137">8 (918) 030-11-37</a>,
            <a href="tel:+79627667256">8 (962) 766-72-56</a>
          </p>
          <p>
            <a href="mailto:PSKMontag23@yandex.ru">PSKMontag23@yandex.ru</a>
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-bottom-links">
          <a href="#">Условия использования сайта</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import logoUrl from "@/assets/logo.png";

export default {
  data() {
    return { logoUrl };
  },
};
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, sans-serif;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: #1a1a1a;
  color: #fff;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  flex-wrap: wrap;
  gap: 1rem;

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-left: -2.4rem;
  }

  .logo {
    height: 130px;
    width: auto;
    display: block;
    object-fit: contain;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .nav-link {
      color: #fff;
      text-decoration: none;
      font-size: 0.95rem;

      &:hover,
      &.router-link-active {
        text-decoration: underline;
      }
    }
  }
}

.main-content {
  flex: 1;
}

.footer {
  background: #1a1a1a;
  color: rgba(255, 255, 255, 0.9);
  margin-top: auto;
}

.footer-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem 4rem;
}

.footer-section {
  a {
    color: #fff;
    text-decoration: none;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
}

.footer-brand {
  .footer-logo-link {
    display: block;
  }

  .footer-logo {
    height: 80px;
    width: auto;
    object-fit: contain;
    display: block;
  }
}

.footer-contact {
  text-align: left;
  font-size: 0.9rem;

  .footer-company {
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #fff;
  }

  p {
    margin: 0 0 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding: 1rem 2rem;
}

.footer-bottom-links {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;

  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.8rem;

    &:hover {
      color: #fff;
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;

    .logo {
      height: 100px;
    }
  }

  .footer .footer-main {
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
    text-align: center;
  }

  .footer .footer-logo {
    height: 70px;
    margin: 0 auto;
  }

  .footer .footer-contact {
    text-align: center;
  }

  .footer .footer-bottom-links {
    flex-direction: column;
    align-items: center;
  }
}
</style>
