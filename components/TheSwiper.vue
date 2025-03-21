<script setup lang="ts">
// Create slides for your images
const containerRef = ref(null)
// Change to 4 slides for the 4 images
const images = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg']
const slides = ref(images)

const swiper = useSwiper(containerRef)

onMounted(() => {
  // Access Swiper instance
  console.log(swiper.instance)
})
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" initial-slide="0" pagination="true" navigation="true">
      <swiper-slide v-for="(image, idx) in slides" :key="idx">
        <img :src="image" :alt="`Manual page ${idx + 1}`" class="swiper-image" />
      </swiper-slide>
    </swiper-container>
  </ClientOnly>


</template>

<style lang="css">
swiper-container {
  width: 100%;
  height: auto;
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.swiper-image {
  width: 100%;
  height: auto;
  object-fit: contain;
}

.navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.swiper-button {
  background-color: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.swiper-button:hover {
  background-color: #e5e7eb;
}
</style>
