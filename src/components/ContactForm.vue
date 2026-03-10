<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <input
        v-model="form.contact_name"
        type="text"
        placeholder="Ваше имя *"
        class="form-input"
        :class="{ 'input-error': errors.contact_name }"
      />
      <span v-if="errors.contact_name" class="field-error">{{ errors.contact_name }}</span>
    </div>
    <div class="form-group">
      <input
        v-model="form.phone"
        type="tel"
        placeholder="Телефон *"
        class="form-input"
        :class="{ 'input-error': errors.phone }"
      />
      <span v-if="errors.phone" class="field-error">{{ errors.phone }}</span>
    </div>
    <div class="form-group">
      <textarea
        v-model="form.comment"
        placeholder="Комментарий"
        class="form-input form-textarea"
        rows="3"
      ></textarea>
    </div>
    <label class="form-consent">
      <input v-model="form.consent" type="checkbox" />
      <span>Даю согласие на обработку персональных данных и соглашаюсь с политикой конфиденциальности</span>
    </label>
    <span v-if="errors.consent" class="field-error consent-error">{{ errors.consent }}</span>
    <div v-if="submitError" class="form-error">{{ submitError }}</div>
    <div v-if="submitSuccess" class="form-success">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
    <button type="submit" class="btn-submit" :disabled="submitting">
      {{ submitting ? "Отправка..." : "Отправить" }}
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { post } from "@/services/api";
import { trackClick } from "@/services/analytics";

const RUSSIAN_PHONE_REGEX = /^(\+7|8)\d{10}$/;

function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-()]+/g, "");
}

export default defineComponent({
  name: "ContactForm",
  setup() {
    const form = reactive({
      contact_name: "",
      phone: "",
      comment: "",
      consent: true,
    });
    const errors = reactive<Record<string, string>>({});
    const submitting = ref(false);
    const submitError = ref("");
    const submitSuccess = ref(false);

    const clearErrors = () => {
      errors.contact_name = "";
      errors.phone = "";
      errors.consent = "";
      submitError.value = "";
    };

    const validate = (): boolean => {
      clearErrors();
      let valid = true;

      if (!form.contact_name.trim()) {
        errors.contact_name = "Введите ваше имя";
        valid = false;
      }

      const normalized = normalizePhone(form.phone);
      if (!normalized) {
        errors.phone = "Введите номер телефона";
        valid = false;
      } else if (!RUSSIAN_PHONE_REGEX.test(normalized)) {
        errors.phone = "Введите корректный российский номер (например +79181234567)";
        valid = false;
      }

      if (!form.consent) {
        errors.consent = "Необходимо согласие на обработку данных";
        valid = false;
      }

      return valid;
    };

    const handleSubmit = async () => {
      submitSuccess.value = false;
      if (!validate()) return;

      submitting.value = true;
      submitError.value = "";

      const result = await post("/call_requests", {
        contact_name: form.contact_name.trim(),
        phone: normalizePhone(form.phone),
        comment: form.comment.trim() || undefined,
      });

      submitting.value = false;

      if (result.ok) {
        trackClick("form_submit", { page: window.location.pathname });
        submitSuccess.value = true;
        form.contact_name = "";
        form.phone = "";
        form.comment = "";
        form.consent = true;
      } else {
        submitError.value = result.error || "Произошла ошибка. Попробуйте позже.";
      }
    };

    return { form, errors, submitting, submitError, submitSuccess, handleSubmit };
  },
});
</script>

<style lang="scss" scoped>
.contact-form {
  .form-group {
    margin-bottom: 1rem;
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border-color: #1a1a1a;
    }
  }

  .form-textarea {
    resize: vertical;
    font-family: inherit;
  }

  .input-error {
    border-color: #dc2626;
  }

  .field-error {
    display: block;
    color: #dc2626;
    font-size: 0.8rem;
    margin-top: 4px;
  }

  .consent-error {
    margin-bottom: 0.5rem;
  }

  .form-consent {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    margin: 1rem 0 0.5rem;
    font-size: 0.85rem;
    color: #666;
    cursor: pointer;

    input {
      flex-shrink: 0;
      margin-top: 0.2rem;
    }
  }

  .form-error {
    color: #dc2626;
    font-size: 0.9rem;
    margin: 0.75rem 0;
  }

  .form-success {
    color: #16a34a;
    font-size: 0.95rem;
    margin: 0.75rem 0;
    font-weight: 500;
  }

  .btn-submit {
    margin-top: 1rem;
    padding: 0.75rem 2rem;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;

    &:hover:not(:disabled) {
      background: #333;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
