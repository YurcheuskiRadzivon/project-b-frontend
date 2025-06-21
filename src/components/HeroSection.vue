<template>
  <section id="home" class="hero">
    <div class="hero-content">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <button class="cta-button" @click="scrollToBooking">Записаться на сеанс</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    title: {
      type: String,
      default: 'Русская баня — настоящий отдых для души и тела'
    },
    description: {
      type: String,
      default: 'Традиционная русская баня с березовыми вениками и парной премиум-класса'
    }
  },
  methods: {
    scrollToBooking() {
      this.$emit('scroll-to-booking');
      // Или напрямую, если не используется событие:
      // const target = document.getElementById('schedule');
      // if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
</script>

<style scoped>
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 100vh;
  padding: 100px 20px 50px;
  position: relative;
  background-image: url('../../public/sauna_background.png');
  background-size: cover;
  background-position: center center;
  color: white;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.cta-button {
  background: var(--primary-brown);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.cta-button:hover {
  background: var(--dark-brown);
  transform: translateY(-2px);
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content p {
    font-size: 1rem;
  }
  
  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
}
</style>