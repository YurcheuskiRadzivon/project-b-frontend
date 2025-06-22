<script>
import Navbar from './Navbar.vue';
import HeroSection from './HeroSection.vue';
import FeaturesSection from './FeaturesSection.vue';
import ServicesGrid from './ServicesGrid.vue';
import StatsSection from './StatsSection.vue';
import ScheduleSection from './ScheduleSection.vue';
import BookingSection  from './BookingSection.vue';
import ContactSection  from './ContactSection.vue';
export default {
  components: {
    ScheduleSection,
    BookingSection,
    Navbar,
    HeroSection,
    ServicesGrid,
    StatsSection,
    BookingSection,
    ContactSection
  },
  data() {
    return {
      selectedDateTime: null
    }
  },
  methods: {
    handleTimeSelected(dateTime) {
      this.selectedDateTime = {
        date: new Date(dateTime.date),
        time: dateTime.time
      };
    },
    handleBooking(bookingData) {
      this.$refs.schedule.addBooking({
        date: bookingData.date,
        time: bookingData.time
      });
      
      // Показываем подтверждение
      alert(`Спасибо, ${bookingData.name}! Ваша бронь подтверждена.`);
      
      // Сбрасываем выбранное время
      this.selectedDateTime = null;
    }
  }
}

</script>

<template>
    <Navbar />
    <HeroSection @scroll-to-booking="handleScrollToBooking" />
    <FeaturesSection />
    <ServicesGrid :services="servicesList" />
    <StatsSection
    :statsNumber="statsNumber"
    :statsText="statsText"
    :qualityTitle="qualityTitle"
    @quality-click="handleQualityClick"
    />
    <ScheduleSection 
      ref="schedule"
      @time-selected="handleTimeSelected"
    />
    
    <BookingSection 
      :selected-date-time="selectedDateTime"
      @booking-submitted="handleBooking"
    />

    <ContactSection />

</template>