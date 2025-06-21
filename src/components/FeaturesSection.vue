<template>
  <section class="features">
    <div class="feature-card" :class="{ 'main-feature': isMain }">
      <div class="feature-content">
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
        <button class="feature-btn" @click="handleButtonClick">{{ buttonText }}</button>
      </div>
      <div class="feature-image" :class="imageClass"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FeatureSection',
  props: {
    title: {
      type: String,
      default: 'Премиум качество в каждой детали'
    },
    description: {
      type: String,
      default: 'Наша баня оборудована по последнему слову техники. Натуральное дерево, традиционная печь и все необходимое для идеального отдыха.'
    },
    buttonText: {
      type: String,
      default: 'Узнать больше'
    },
    isMain: {
      type: Boolean,
      default: true
    },
    imageClass: {
      type: String,
      default: 'blue-chair'
    }
  },
  methods: {
    handleButtonClick() {
      this.$emit('feature-click');
    }
  }
}
</script>

<style scoped>
.features {
  padding: 4rem 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  display: flex;
  background: var(--cream);
  border-radius: 20px;
  overflow: hidden;
  min-height: 400px;
}

.feature-content {
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feature-content h2 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.feature-content p {
  font-size: 1.1rem;
  color: var(--gray);
  margin-bottom: 2rem;
}

.feature-btn {
  background: transparent;
  color: var(--primary-brown);
  border: 2px solid var(--primary-brown);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  width: fit-content;
  transition: all 0.3s;
}

.feature-btn:hover {
  background: var(--primary-brown);
  color: white;
}

.feature-image {
  flex: 1;
  min-height: 400px;
}

.blue-chair {
  background: linear-gradient(135deg, var(--blue), #5A7B8C);
  position: relative;
}

.blue-chair::before {
  content: '';
  position: absolute;
  top: 30%;
  left: 30%;
  width: 40%;
  height: 40%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

/* Адаптивность */
@media (max-width: 992px) {
  .feature-card {
    flex-direction: column;
  }
  
  .feature-content {
    padding: 2rem;
  }
  
  .feature-content h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .features {
    padding: 2rem 15px;
  }
  
  .feature-content h2 {
    font-size: 1.8rem;
  }
  
  .feature-content p {
    font-size: 1rem;
  }
}
</style>