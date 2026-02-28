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
          <router-link to="/downloads" class="nav-link">Downloads</router-link>
          <router-link to="/certificates" class="nav-link">Сертификаты</router-link>
          <router-link to="/contacts" class="nav-link">Контакты</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <router-link to="/" class="footer-logo-link">
          <img :src="logoUrl" alt="ПСК МОНТАЖ" class="footer-logo" />
        </router-link>
        <div class="footer-links">
          <a href="#">Lorem ipsum dolor</a>
          <a href="#">Lorem ipsum</a>
          <a href="#">Lorem ipsum</a>
        </div>
        <div class="footer-contact">
          <a href="#">+0 (000) 000-00-00</a>
          <a href="#">lorem@ipsum.dolor</a>
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
  color: #fff;
  padding: 0 2rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
  }

  .footer-logo-link {
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-left: -2.4rem;
  }

  .footer-logo {
    height: 130px;
    width: auto;
    object-fit: contain;
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 0.875rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .footer-contact {
    display: flex;
    gap: 1.5rem;

    a {
      color: #fff;
      text-decoration: none;
      font-size: 0.875rem;

      &:hover {
        text-decoration: underline;
      }
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

  .footer .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer .footer-logo {
    height: 90px;
  }
}
</style>
