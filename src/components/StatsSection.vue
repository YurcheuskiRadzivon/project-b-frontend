<template>
  <section class="stats-section">
    <div class="stats-card" :style="statsCardStyle">
      <div class="stats-content">
        <div class="stats-number">{{ statsNumber }}</div>
        <p>{{ statsText }}</p>
      </div>
    </div>
    
    <div class="quality-card" :style="qualityCardStyle">
      <h3>{{ qualityTitle }}</h3>
      <button class="quality-btn" @click="handleButtonClick">{{ buttonText }}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'StatsSection',
  props: {
    statsNumber: {
      type: String,
      default: '150+'
    },
    statsText: {
      type: String,
      default: 'Довольных клиентов каждый месяц'
    },
    qualityTitle: {
      type: String,
      default: 'Высшее качество обслуживания'
    },
    buttonText: {
      type: String,
      default: 'Узнать больше'
    },
    statsColor: {
      type: String,
      default: 'var(--primary-brown)'
    },
    qualityColor: {
      type: String,
      default: 'var(--light-brown)'
    },
    buttonColor: {
      type: String,
      default: 'white'
    },
    textColor: {
      type: String,
      default: 'white'
    }
  },
  computed: {
    statsCardStyle() {
      return {
        backgroundColor: this.statsColor,
        color: this.textColor
      };
    },
    qualityCardStyle() {
      return {
        backgroundColor: this.qualityColor,
        color: this.textColor
      };
    }
  },
  methods: {
    handleButtonClick() {
      this.$emit('quality-click');
    }
  }
}
</script>

<style scoped>
.stats-section {
  display: flex;
  gap: 2rem;
  padding: 2rem 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.stats-card {
  padding: 3rem 2rem;
  border-radius: 16px;
  flex: 1;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.stats-number {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1;
}

.stats-content p {
  font-size: 1.2rem;
  line-height: 1.5;
}

.quality-card {
  padding: 3rem 2rem;
  border-radius: 16px;
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.quality-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.quality-card h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
  line-height: 1.3;
}

.quality-btn {
  background: white;
  color: var(--primary-brown);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
  transition: all 0.3s ease;
}

.quality-btn:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

/* Адаптивность */
@media (max-width: 992px) {
  .stats-section {
    flex-direction: column;
  }
  
  .stats-card, .quality-card {
    flex: auto;
  }
  
  .stats-number {
    font-size: 3.5rem;
  }
  
  .quality-card h3 {
    font-size: 1.8rem;
  }
}

@media (max-width: 768px) {
  .stats-section {
    padding: 1.5rem 15px;
    gap: 1.5rem;
  }
  
  .stats-card, .quality-card {
    padding: 2rem 1.5rem;
  }
  
  .stats-number {
    font-size: 3rem;
  }
  
  .stats-content p {
    font-size: 1.1rem;
  }
  
  .quality-card h3 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-number {
    font-size: 2.5rem;
  }
  
  .quality-card h3 {
    font-size: 1.4rem;
  }
  
  .quality-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}
</style>