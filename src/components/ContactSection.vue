<template>
  <footer id="contact" class="contact-section">
    <div class="container">
      <h2>Контакты</h2>
      <p class="contact-subtitle">Мы всегда на связи, чтобы ответить на ваши вопросы и помочь с бронированием.</p>
      
      <div class="contact-details">
        <div class="contact-item">
          <h3>Адрес</h3>
          <p>{{ address }}</p>
        </div>
        
        <div class="contact-item">
          <h3>Телефон</h3>
          <p><a :href="`tel:${phone}`">{{ formattedPhone }}</a></p>
        </div>
        
        <div class="contact-item">
          <h3>Email</h3>
          <p><a :href="`mailto:${email}`">{{ email }}</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      address: 'г. Варшава',
      phone: '+48 798 412 578',
      email: 'booking@banya.pl'
    }
  },
  computed: {
    formattedPhone() {
      // Форматирование телефона: +7 (999) 123-45-67
      return this.phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    }
  }
}
</script>

<style scoped>
.contact-section {
  padding: 4rem 20px;
  background: var(--dark-brown);
  color: var(--white);
  text-align: center;
}

.contact-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--white);
}

.contact-subtitle {
  font-size: 1.1rem;
  color: var(--cream);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.contact-details {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  text-align: left;
}

.contact-item {
  flex: 1;
  min-width: 200px;
}

.contact-item h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--cream);
}

.contact-item p, 
.contact-item a {
  font-size: 1.1rem;
  color: var(--white);
  text-decoration: none;
  transition: color 0.3s;
}

.contact-item a:hover {
  color: var(--cream);
  text-decoration: underline;
}

/* Адаптивность */
@media (max-width: 768px) {
  .contact-details {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .contact-item {
    min-width: 100%;
  }
  
  .contact-section h2 {
    font-size: 2rem;
  }
  
  .contact-item h3 {
    font-size: 1.3rem;
  }
  
  .contact-item p, 
  .contact-item a {
    font-size: 1rem;
  }
}
</style>