<template>
  <div class="layout">
    <header class="header">
      <router-link to="/" class="logo-link">
        <img :src="logoUrl" alt="ПСК МОНТАЖ" class="logo" />
      </router-link>
      <nav class="nav">
        <router-link to="/" class="nav-link">Lorem</router-link>
        <router-link to="/about" class="nav-link">Ipsum</router-link>
        <router-link to="/product" class="nav-link">Dolor</router-link>
        <router-link to="/catalog" class="nav-link">Sit</router-link>
        <router-link to="/downloads" class="nav-link">Amet</router-link>
        <router-link to="/certificates" class="nav-link">Elit</router-link>
        <router-link to="/contacts" class="nav-link">Consect</router-link>
      </nav>
      <div class="header-contact">
        <a href="#" class="contact-link">+0 (000) 000-00-00</a>
        <a href="#" class="contact-link">lorem@ipsum.dolor</a>
      </div>
    </header>

    <main class="main-content">
      <slot />
    </main>

    <footer class="footer">
      <div class="footer-content">
        <p class="footer-company">Lorem "Ipsum Dolor"</p>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: #fff;
  flex-wrap: wrap;
  gap: 1rem;

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .logo {
    height: 48px;
    width: auto;
    display: block;
  }

  .nav {
    display: flex;
    gap: 1.5rem;

    .nav-link {
      color: #fff;
      text-decoration: none;

      &:hover,
      &.router-link-active {
        text-decoration: underline;
      }
    }
  }

  .header-contact {
    display: flex;
    gap: 1.5rem;

    .contact-link {
      color: #fff;
      text-decoration: none;

      &:hover {
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
  padding: 2rem;

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
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
  .header {
    flex-direction: column;
    gap: 1rem;

    .logo {
      height: 40px;
    }
  }

  .footer .footer-content {
    flex-direction: column;
  }
}
</style>
