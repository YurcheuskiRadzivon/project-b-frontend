<script setup>
import Navbar from './Navbar.vue';
import HeroSection from './HeroSection.vue';
import FeaturesSection from './FeaturesSection.vue';
import ServicesGrid from './ServicesGrid.vue';
import StatsSection from './StatsSection.vue';
import ScheduleSection from './ScheduleSection.vue';
import BookingSection  from './BookingSection.vue';


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

</template>