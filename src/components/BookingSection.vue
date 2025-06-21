<template>
  <section id="booking" class="booking-section">
    <div class="container">
      <div class="booking-form-container">
        <h2>Запись на сеанс</h2>
        <form class="booking-form" @submit.prevent="submitBooking">
          <div v-if="selectedDateTime" class="selected-time">
            <p>Выбранное время: <span>{{ formattedDateTime }}</span></p>
          </div>
          
          <div class="form-group">
            <label for="name">Имя *</label>
            <input type="text" id="name" v-model="formData.name" required>
          </div>
          
          <div class="form-group">
            <label for="phone">Телефон *</label>
            <input type="tel" id="phone" v-model="formData.phone" required>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="formData.email">
          </div>
          
          <div class="form-group">
            <label for="telegram">Telegram</label>
            <input type="text" id="telegram" v-model="formData.telegram" placeholder="@username">
          </div>
          
          <button type="submit" class="submit-btn">Забронировать</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BookingSection',
  props: {
    selectedDateTime: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formData: {
        name: '',
        phone: '',
        email: '',
        telegram: ''
      }
    }
  },
  computed: {
    formattedDateTime() {
      if (!this.selectedDateTime || !this.selectedDateTime.date || !this.selectedDateTime.time) {
        return '';
      }
      
      return `${this.selectedDateTime.date.toLocaleDateString('ru-RU')} в ${this.selectedDateTime.time}`;
    }
  },
  methods: {
    submitBooking() {
      if (!this.selectedDateTime || !this.selectedDateTime.date || !this.selectedDateTime.time) {
        alert('Пожалуйста, выберите дату и время');
        return;
      }
      
      if (!this.formData.name || !this.formData.phone) {
        alert('Пожалуйста, заполните обязательные поля');
        return;
      }
      
      const bookingData = {
        ...this.formData,
        date: this.selectedDateTime.date,
        time: this.selectedDateTime.time
      };
      
      this.$emit('booking-submitted', bookingData);
      
      // Сброс формы
      this.formData = {
        name: '',
        phone: '',
        email: '',
        telegram: ''
      };
    }
  }
}
</script>

<style scoped>
/* Booking Section */
.booking-section {
  padding: 4rem 20px;
  background: var(--cream);
}

.booking-form-container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

.booking-form-container h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.selected-time {
  background: var(--light-gray);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-brown);
}

.submit-btn {
  width: 100%;
  background: var(--primary-brown);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: var(--dark-brown);
}
</style>