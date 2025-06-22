<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">Баня</div>
      <button class="mobile-menu-toggle" @click="toggleMobileMenu">☰</button>
      <ul class="nav-menu" :class="{ 'mobile-open': isMenuOpen }">
        <li><a href="#home" @click="smoothScroll">Главная</a></li>
        <li><a href="#schedule" @click="smoothScroll">Расписание</a></li>
        <li><a href="#services" @click="smoothScroll">Услуги</a></li>
        <li><a href="#contact" @click="smoothScroll">Контакты</a></li>
        <li class="nav-book-li">
          <button class="nav-book-btn" @click="scrollToBooking">Записаться</button>
        </li>
        <li class="switcher"><LanguageSwitcher/></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import LanguageSwitcher from './LanguageSwitcher.vue';

export default {
  components:{LanguageSwitcher},
  name: 'Navbar',
  data() {
    return {
      isMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    scrollToBooking() {
      this.smoothScroll('#schedule');
      this.isMenuOpen = false;
    },
    smoothScroll(event) {
      // Если событие пришло от клика
      if (event instanceof Event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href');
        this.scrollToTarget(targetId);
      } 
      // Если вызываем напрямую с селектором
      else if (typeof event === 'string') {
        this.scrollToTarget(event);
      }
    },
    scrollToTarget(targetId) {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      this.isMenuOpen = false;
    }
  }
}
</script>

<style scoped>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    height: 72px ;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-brown);
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    align-items: center;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: var(--primary-brown);
}

/* Mobile menu styles */
.mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--primary-brown);
}

.nav-menu.mobile-open {
    position: fixed;
    top: 70px; /* Adjust based on navbar height */
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    align-items: flex-start;
}

.nav-book-btn {
    background: var(--primary-brown);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s;
}

.nav-book-btn:hover {
    background: var(--dark-brown);
}

/* Добавим для совместимости мобильной кнопки */
.nav-book-btn.mobile-show {
    display: none;
}

/* --- Navigation updates for responsive booking button --- */

.nav-book-li {
    display: flex;
    align-items: center;
    margin-left: auto;
}

li.switcher{
   position: relative;
    height: 30px; /* Фиксированная высота для li */
    display: flex;
    align-items: center;
}

/* Responsive Navigation */
@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: block;
        order: 1;
    }
 .logo {
        order: 0; /* Лого слева */
    }
    .nav-menu {
        display: none; /* Hide menu by default on mobile */
    }

    .nav-menu.mobile-open {
        display: flex; /* Show menu when toggled */
    }
    
     li.switcher {
         position: absolute;
        right: 60px; /* Отступ от правого края */
        /* top: 50%; */
        /* transform: translateY(-50%); */
        margin: 0;
        order: 2;
    }

    .nav-book-li {
        margin-top: 1rem;
        margin-left: 0;
    }

    .nav-book-btn {
        /* width: 100%; was here */
    }
}
</style>