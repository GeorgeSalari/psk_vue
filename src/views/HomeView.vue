<template>
  <AppLayout>
    <div class="home-page">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <h1 class="hero-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.
          </h1>
          <a href="#" class="hero-cta">Lorem Ipsum</a>
        </div>
        <div class="hero-image">
          <img src="/images/placeholder.svg" alt="" />
        </div>
      </section>

      <!-- Why Choose Us -->
      <section class="features">
        <h2 class="section-title">Lorem ipsum dolor sit amet consectetur</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-image">
              <img src="/images/placeholder.svg" alt="" />
            </div>
            <h3 class="feature-title">Lorem ipsum dolor</h3>
            <p class="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="/images/placeholder.svg" alt="" />
            </div>
            <h3 class="feature-title">Consectetur adipiscing</h3>
            <p class="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="/images/placeholder.svg" alt="" />
            </div>
            <h3 class="feature-title">Sed do eiusmod tempor</h3>
            <p class="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamco laboris nisi.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-image">
              <img src="/images/placeholder.svg" alt="" />
            </div>
            <h3 class="feature-title">Incididunt ut labore</h3>
            <p class="feature-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor.
            </p>
          </div>
        </div>
      </section>

      <!-- News -->
      <section class="news">
        <h2 class="section-title">Lorem Ipsum</h2>
        <div class="news-content">
          <p class="news-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <a href="#" class="news-link">Lorem Ipsum →</a>
        </div>
      </section>

      <!-- Products -->
      <section class="products">
        <h2 class="section-title">Lorem ipsum dolor</h2>
        <div class="products-grid">
          <router-link to="/product/sliding-drives" class="product-card">
            <div class="product-image">
              <img src="/images/placeholder.svg" alt="" />
            </div>
            <h3 class="product-title">Lorem ipsum dolor sit amet consectetur</h3>
            <span class="product-link">Lorem Ipsum →</span>
          </router-link>
          <router-link to="/product/proff" class="product-card">
            <div class="product-image">
              <img src="/images/placeholder.svg" alt="" />
            </div>
            <h3 class="product-title">Consectetur adipiscing elit r. r.</h3>
            <span class="product-link">Lorem Ipsum →</span>
          </router-link>
          <router-link to="/product/telescopic" class="product-card">
            <div class="product-image">
              <img src="/images/placeholder.svg" alt="" />
            </div>
            <h3 class="product-title">Sed do eiusmod tempor r. r.</h3>
            <span class="product-link">Lorem Ipsum →</span>
          </router-link>
        </div>
      </section>

      <!-- Contact Form -->
      <section class="contact">
        <h2 class="section-title">Lorem ipsum dolor sit amet consectetur elit</h2>
        <form class="contact-form" @submit.prevent>
          <div class="form-group">
            <input type="text" placeholder="Lorem ipsum" class="form-input" />
          </div>
          <div class="form-group">
            <input type="email" placeholder="Lorem ipsum dolor" class="form-input" />
          </div>
          <div class="form-group">
            <input type="tel" placeholder="Lorem ipsum" class="form-input" />
          </div>
          <p class="form-hint">* Lorem ipsum dolor sit amet consectetur.</p>
          <p class="form-hint">* Lorem ipsum dolor sit amet consectetur elit.</p>
          <p class="form-hint">* Lorem ipsum dolor sit amet consectetur.</p>
          <div class="form-actions">
            <button type="submit" class="btn-submit">Lorem Ipsum</button>
          </div>
          <p class="form-privacy">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor.
          </p>
        </form>
      </section>
    </div>
  </AppLayout>
</template>

<script lang="ts">
import AppLayout from "@/components/AppLayout.vue";

export default {
  components: { AppLayout },
};
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
}

.hero {
  position: relative;
  text-align: center;
  background: #f0f0f0;

  .hero-image img {
    width: 100%;
    height: auto;
    max-height: 500px;
    object-fit: cover;
    display: block;
  }

  .hero-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  .hero-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    max-width: 800px;
  }

  .hero-cta {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: #333;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background: #555;
    }
  }
}

.section-title {
  font-size: 1.75rem;
  text-align: center;
  margin: 3rem 0 2rem;
}

.features {
  padding: 0 2rem 3rem;
  max-width: 1200px;
  margin: 0 auto;

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .feature-image img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .feature-title {
      padding: 1rem 1rem 0;
      font-size: 1.25rem;
    }

    .feature-text {
      padding: 0.5rem 1rem 1rem;
      color: #555;
      line-height: 1.5;
    }
  }
}

.news {
  padding: 2rem;
  background: #f5f5f5;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;

  .news-text {
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .news-link {
    color: #333;
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

.products {
  padding: 0 2rem 3rem;
  max-width: 1200px;
  margin: 0 auto;

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .product-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    display: block;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .product-image img {
      width: 100%;
      height: 220px;
      object-fit: cover;
    }

    .product-title {
      padding: 1rem;
      font-size: 1.1rem;
    }

    .product-link {
      display: block;
      padding: 0 1rem 1rem;
      color: #333;
      font-weight: 600;
    }
  }
}

.contact {
  padding: 2rem;
  background: #f5f5f5;
  max-width: 600px;
  margin: 0 auto 3rem;
  border-radius: 8px;

  .contact-form {
    .form-group {
      margin-bottom: 1rem;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .form-hint {
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.5rem;
    }

    .form-actions {
      margin: 1.5rem 0;
    }

    .btn-submit {
      padding: 0.75rem 2rem;
      background: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;

      &:hover {
        background: #555;
      }
    }

    .form-privacy {
      font-size: 0.75rem;
      color: #888;
      margin-top: 1rem;
    }
  }
}

@media (max-width: 768px) {
  .hero .hero-title {
    font-size: 1.25rem;
  }
}
</style>
