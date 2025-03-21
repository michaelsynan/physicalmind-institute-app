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
/* For web component version of Swiper */
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  color: #810867 !important;
}

/* Your existing pagination styling works fine */
:root {
  --swiper-theme-color: #810867 !important;
  --swiper-pagination-color: #810867 !important;
}

.swiper-pagination-bullet {
  background: #d1d5db !important;
  opacity: 0.6;
}

.swiper-pagination-bullet-active {
  background: #810867 !important;
  opacity: 1;
}

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
  background-color: #810867;
  border: 1px solid #d1d5db;
  border-radius: 9999px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

</style>
