import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './plugins/i18n' // Импортируем ваш i18n

const app = createApp(App)

// Подключаем i18n к приложению
app.use(i18n)

// Добавляем глобальную функцию changeLanguage
app.config.globalProperties.$changeLanguage = (locale) => {
  i18n.global.locale.value = locale
  localStorage.setItem('locale', locale)
}

app.mount('#app')