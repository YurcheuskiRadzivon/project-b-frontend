<template>
  <section id="schedule" class="schedule-section">
    <div class="container">
      <h2>Расписание работы</h2>
      <p class="schedule-subtitle">Посмотрите свободные даты и выберите удобное время для бронирования.</p>
      
      <div class="calendar-container">
        <div class="calendar-header">
          <button class="calendar-nav" @click="prevMonth">&lt;</button>
          <h3>{{ currentMonthName }} {{ currentYear }}</h3>
          <button class="calendar-nav" @click="nextMonth">&gt;</button>
        </div>
        
        <div class="calendar-grid">
          <div 
            v-for="day in dayHeaders" 
            :key="day" 
            class="calendar-day-header"
          >
            {{ day }}
          </div>
          
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            :class="[
              'calendar-day',
              {
                'other-month': !day.isCurrentMonth,
                'booked': day.isBooked,
                'selected': day.isSelected,
                'disabled': day.isPast
              }
            ]"
            @click="selectDate(day)"
          >
            {{ day.date ? day.date.getDate() : '' }}
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="loader"></div>
      
      <div v-if="showTimeSlots" class="time-slots" id="timeSlots">
        <h3>Выберите время:</h3>
        <div class="slots-grid">
          <div 
            v-for="time in timeSlots" 
            :key="time"
            :class="[
              'time-slot',
              {
                'booked': isTimeBooked(time),
                'selected': time === selectedTime
              }
            ]"
            @click="selectTime(time)"
          >
            {{ time }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ScheduleSection',
  data() {
    return {
      currentDate: new Date(), // Текущий месяц в календаре
      selectedDate: null,      // Выбранная пользователем дата
      selectedTime: null,      // Выбранное пользователем время
      bookedSlots: {},         // Забронированные слоты
      loading: false,          // Состояние загрузки
      showTimeSlots: false,    // Показывать ли временные слоты
      busyTimes: [],           // Занятые времена для выбранной даты
      dayHeaders: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      timeSlots: [
        '09:00', '10:00', '11:00', '12:00', 
        '13:00', '14:00', '15:00', '16:00', 
        '17:00', '18:00', '19:00', '20:00'
      ],
      monthNames: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ]
    }
  },
  computed: {
    currentMonthName() {
      return this.monthNames[this.currentDate.getMonth()];
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    calendarDays() {
      const days = [];
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      
      // Первый день месяца
      const firstDay = new Date(year, month, 1);
      // Последний день месяца
      const lastDay = new Date(year, month + 1, 0);
      
      // День недели первого дня (0 - воскресенье, 1 - понедельник и т.д.)
      const firstDayOfWeek = firstDay.getDay();
      // Корректировка: делаем понедельник первым днем недели
      const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
      
      // Пустые дни в начале календаря (предыдущий месяц)
      for (let i = 0; i < startDay; i++) {
        days.push({
          date: null,
          isCurrentMonth: false
        });
      }
      
      // Дни текущего месяца
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dateKey = this.formatDate(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Сбрасываем время для сравнения
        
        const isSelected = this.selectedDate && 
          this.selectedDate.getTime() === date.getTime();
        
        days.push({
          date,
          dateKey,
          isCurrentMonth: true,
          isPast: date < today,
          isBooked: this.isDateFullyBooked(dateKey),
          isSelected
        });
      }
      
      return days;
    }
  },
  mounted() {
    this.loadBookedSlots();
  },
  methods: {
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    loadBookedSlots() {
      const saved = localStorage.getItem('bookedSlots');
      this.bookedSlots = saved ? JSON.parse(saved) : {};
    },
    saveBookedSlots() {
      localStorage.setItem('bookedSlots', JSON.stringify(this.bookedSlots));
    },
    isDateFullyBooked(dateKey) {
      return this.bookedSlots[dateKey] && 
        this.bookedSlots[dateKey].length === this.timeSlots.length;
    },
    isTimeBooked(time) {
      return this.busyTimes.includes(time);
    },
    prevMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
      this.resetSelection();
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
      this.resetSelection();
    },
    resetSelection() {
      this.selectedDate = null;
      this.selectedTime = null;
      this.showTimeSlots = false;
      this.busyTimes = [];
    },
    async selectDate(day) {
      // Проверяем, можно ли выбрать эту дату
      if (!day.date || !day.isCurrentMonth || day.isPast || day.isBooked) {
        return;
      }
      
      this.selectedDate = day.date;
      this.selectedTime = null;
      this.showTimeSlots = false;
      this.loading = true;
      
      const year = day.date.getFullYear();
      const month = day.date.getMonth() + 1; // Месяцы в JS: 0-11
      const dayNum = day.date.getDate();

      try {
      this.busyTimes = await this.fetchBookedSlotsForDate(year, month, dayNum);
      this.showTimeSlots = true;
      
     this.$nextTick(() => {
      const element = document.getElementById('timeSlots');
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' // или 'center', 'end' - в зависимости от нужного положения
        });
      }
    });
      } catch (error) {
        console.error('Ошибка при загрузке времени:', error);
        alert('Не удалось загрузить доступное время');
      } finally {
        this.loading = false;
      }
    },
    async fetchBookedSlotsForDate(year, month, day) {
      // Симуляция запроса к API
      return new Promise(resolve => {
        setTimeout(() => {
          const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          
          // Получаем сохраненные бронирования
          const storedBookings = this.bookedSlots[dateKey] || [];
          
          // Для демонстрации добавляем случайные бронирования
          const busyTimes = [...storedBookings];
          this.timeSlots.forEach(time => {
            if (Math.random() > 0.7 && !busyTimes.includes(time)) {
              busyTimes.push(time);
            }
          });
          
          resolve(busyTimes);
        }, 500);
      });
    },
    selectTime(time) {
      if (this.isTimeBooked(time)) return;
      
      this.selectedTime = time;
      
      // Эмитим событие с выбранными датой и временем
      this.$emit('time-selected', {
        date: this.selectedDate,
        time
      });
      
      // Прокрутка к форме бронирования
      this.$nextTick(() => {
        const element = document.getElementById('booking');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      });
    },
    // Метод для добавления бронирования (вызывается из родителя)
    addBooking(booking) {
      const dateKey = this.formatDate(booking.date);
      
      // Добавляем бронирование в локальное состояние
      if (!this.bookedSlots[dateKey]) {
        this.bookedSlots[dateKey] = [];
      }
      
      if (!this.bookedSlots[dateKey].includes(booking.time)) {
        this.bookedSlots[dateKey].push(booking.time);
      }
      
      // Обновляем список занятых слотов
      if (this.selectedDate && this.formatDate(this.selectedDate) === dateKey) {
        this.busyTimes = [...this.busyTimes, booking.time];
      }
      
      // Сохраняем в localStorage
      this.saveBookedSlots();
      
      // Сбрасываем выбор
      this.resetSelection();
    }
  }
}
</script>

<style scoped>
.schedule-section {
  padding: 4rem 10px;
  background: var(--light-gray);
}

.schedule-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.schedule-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: var(--gray);
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.calendar-container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.calendar-nav {
  background: var(--primary-brown);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.calendar-nav:hover {
  background: var(--dark-brown);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-day-header {
  background: #f5f5f5;
  padding: 1rem;
  text-align: center;
  font-weight: bold;
}

.calendar-day {
  background: white;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-day:hover {
  background: var(--cream);
}

.calendar-day.booked {
  background: #ffebee;
  color: #c62828;
  cursor: not-allowed;
}

.calendar-day.selected {
  background: var(--primary-brown);
  color: white;
  transform: scale(1.05);
}

.calendar-day.other-month {
  color: #ccc;
  cursor: not-allowed;
  background: #fdfdfd;
}

.calendar-day.disabled {
  cursor: not-allowed;
  background: #f9f9f9;
  color: #999;
}

.time-slots {
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.time-slot {
  background: var(--light-gray);
  border: 2px solid transparent;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.time-slot:hover {
  border-color: var(--primary-brown);
  transform: translateY(-2px);
}

.time-slot.selected {
  background: var(--primary-brown);
  color: white;
  border-color: var(--primary-brown);
  transform: scale(1.05);
}

.time-slot.booked {
  background: #ffebee;
  color: #c62828;
  cursor: not-allowed;
  border-color: transparent;
  opacity: 0.7;
}

/* Loader */
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--primary-brown);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Адаптивность */
@media (max-width: 768px) {
  .calendar-day {
    padding: 0.5rem;
    min-height: 50px;
    font-size: 0.9rem;
  }
  
  .calendar-day-header {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
  
  .time-slot {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .calendar-container {
    padding: 0.8rem;
  }
  
  .calendar-day {
    min-height: 40px;
  }
}
</style>