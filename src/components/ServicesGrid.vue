<template>
  <section class="services-grid">
    <div 
      v-for="(service, index) in services" 
      :key="index"
      class="service-item"
      :class="{
        'large': service.size === 'large',
        'reverse': service.layout === 'reverse'
      }"
    >
      <div class="service-image" :class="service.imageClass"></div>
      <div class="service-content">
        <span v-if="service.label" class="service-label">{{ service.label }}</span>
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServicesGrid',
  props: {
    services: {
      type: Array,
      required: true,
      default: () => [
        {
          size: 'large',
          layout: 'normal',
          label: 'Парная',
          title: 'Традиционная русская парная',
          description: 'Высокие потолки, натуральная древесина, идеальная температура',
          imageClass: 'yellow-item'
        },
        {
          size: 'normal',
          layout: 'reverse',
          title: 'Комната отдыха',
          description: 'Уютное место для релаксации после парной',
          imageClass: 'orange-chair'
        }
      ]
    }
  }
}
</script>

<style scoped>
.services-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    padding: 2rem 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.service-item {
    background: var(--light-gray);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 400px;
}

.service-item.large {
    flex-direction: row;
}

.service-content {
    padding: 2rem;
    flex: 1;
}

.service-label {
    background: var(--orange);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
}

.service-content h3 {
    font-size: 1.8rem;
    margin: 1rem 0;
    color: #333;
}

.service-content p {
    color: var(--gray);
    font-size: 1rem;
}

.service-image {
    min-height: 200px;
    flex: 1;
}

.yellow-item {
    background: linear-gradient(135deg, #F4D03F, #F7DC6F);
}

.orange-chair {
    background: linear-gradient(135deg, var(--orange), #E8B870);
}

</style>