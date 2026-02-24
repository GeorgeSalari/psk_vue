<template>
  <AppLayout>
    <div class="page-content">
      <div class="breadcrumb">
        <router-link to="/">Lorem</router-link>
        <span> → </span>
        <span>Consect</span>
      </div>

      <h1 class="page-title">Lorem ipsum dolor sit amet</h1>

      <div class="contacts-grid">
        <div class="contact-info">
          <h2>Lorem "Ipsum Dolor"</h2>
          <p><a href="#">+0 (000) 000-00-00</a></p>
          <p><a href="#">lorem@ipsum.dolor</a></p>
        </div>

        <form class="contact-form" @submit.prevent>
          <p class="form-note">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
          </p>
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
          <button type="submit" class="btn-submit">Lorem Ipsum</button>
        </form>
      </div>
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
.page-content {
  max-width: 900px;
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

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-info {
  h2 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 0.5rem;

    a {
      color: #333;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.contact-form {
  .form-note {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #666;
  }

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
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.25rem;
  }

  .btn-submit {
    margin-top: 1rem;
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
}

@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
