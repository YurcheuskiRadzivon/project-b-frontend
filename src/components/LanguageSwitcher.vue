<template>
  <div class="select" @mouseleave="closeMenu">
    <div
      class="selected"
      :data-current="currentLanguage"
      @mouseover="openMenu"
    >
      <span class="current-lang">{{ currentLanguage }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 512 512"
        class="arrow"
        :class="{ rotated: isMenuOpen }"
      >
        <path
          d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
        ></path>
      </svg>
    </div>
    <div class="options" v-show="isMenuOpen">
      <div title="en" @click="setLanguage('en')">
        <input id="en" name="option" type="radio" :checked="currentLanguage === 'en'" />
        <label class="option" for="en" data-txt="en"></label>
      </div>
      <div title="sw" @click="setLanguage('sw')">
        <input id="sw" name="option" type="radio" :checked="currentLanguage === 'sw'" />
        <label class="option" for="sw" data-txt="sw"></label>
      </div>
    </div>
  </div>
</template>

<script>
import { changeLanguage, i18n } from '../plugins/i18n'; // Импортируем i18n

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      isMenuOpen: false,
      currentLanguage: 'en' // Начальное значение
    }
  },
  mounted() {
    // При загрузке компонента проверяем сохраненный язык
    const savedLang = localStorage.getItem('locale');
    if (savedLang) {
      this.currentLanguage = savedLang;
    } else {
      // Если нет сохраненного, используем язык по умолчанию
      this.currentLanguage = i18n.global.locale.value;
    }
  },
  methods: {
    openMenu() {
      this.isMenuOpen = true;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    setLanguage(lang) {
      // Устанавливаем язык в компоненте
      this.currentLanguage = lang;
      
      // Сохраняем в localStorage
      localStorage.setItem('locale', lang);
      
      // Устанавливаем язык во всем приложении
      changeLanguage(lang);
      
      // Закрываем меню
      this.closeMenu();
    }
  }
}
</script>

<style scoped>
.select {
    width: fit-content;
    cursor: pointer;
    transition: 300ms;
    color: black;
    overflow: visible; /* Изменено с hidden */
    position: relative; /* Изменено с absolute */
    height: 30px; /* Фиксированная высота */
}

.selected {
    
    padding: 5px;
    margin-bottom: 3px;
    border-radius: 5px;
    position: relative;
    z-index: 100000;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
}

.arrow {
  position: relative;
  right: 0px;
  height: 10px;
  transform: rotate(-90deg);
  width: 25px;
  fill: black;
  z-index: 100000;
  transition: 300ms;
}

.options {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 5px;
    background-color: rgba(255, 255, 255, 0.95);
    position: absolute;
    top: 100%; /* Изменено с -100px */
    left: 0;
    opacity: 0;
    transition: 300ms;
    z-index: 1001;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}

.select:hover > .options {
    opacity: 1;
    top: 100%; /* Остается на месте при открытии */
}

.select:hover > .selected .arrow {
  transform: rotate(0deg);
}

.option {
  border-radius: 5px;
  padding: 5px;
  transition: 300ms;
  background-color: rgba(255, 255, 255, 0.95);
  width: 40px;
  font-size: 15px;
}
.option:hover {
  background-color: #8b6f47;
  color: #fff;
}

.options input[type="radio"] {
  display: none;
}

.options label {
  display: inline-block;
}
.options label::before {
  content: attr(data-txt);
}

.options input[type="radio"]:checked + label {
  display: none;
}

.options input[type="radio"]#all:checked + label {
  display: none;
}

.select:has(.options input[type="radio"]#en:checked) .selected::before {
  content: attr(data-default);
}
.select:has(.options input[type="radio"]#sw:checked) .selected::before {
  content: attr(data-one);
}


/* Обновили селектор для отображения текущего языка */
.selected::before {
  content: attr(data-current);
}
</style>