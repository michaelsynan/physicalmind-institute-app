<script lang="ts" setup></script>

<template>
      <div id="container" class="my-10 max-w-5xl mx-auto p-5">
        <Swiper
  :pagination="true"
  :modules="[SwiperAutoplay, SwiperEffectCreative, Pagination]"
  :slides-per-view="1"
  :loop="true"
  :effect="'creative'"
  :autoplay="{
    delay: 2500,
    disableOnInteraction: false,
  }"
  :creative-effect="{
    prev: {
      shadow: false,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  }"
>
<SwiperSlide class="relative bg-cover bg-center text-white" style="background-image: url('/yoga.jpg');">
  <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
  <strong class="absolute bottom-10 !text-5xl z-10 p-5">YOGA</strong>
</SwiperSlide>
<SwiperSlide class="relative bg-cover bg-center text-white" style="background-image: url('/backyard.jpg');">
  <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
  <strong class="absolute bottom-10 !text-5xl z-10 p-5">PILATES</strong>
</SwiperSlide>
<SwiperSlide class="relative bg-cover bg-center text-white" style="background-image: url('/golf.jpg');">
  <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
  <strong class="absolute bottom-10 !text-5xl z-10 p-5">SHOP</strong>
</SwiperSlide>

</Swiper>

  </div>
</template>

<style scoped>
.swiper-pagination-bullet-active {
  background-color: #810867 !important; /* Updated color for active bullet, can adjust if you want a different color for active state */
}

.swiper {
  width: 100%;
  height: 50vh; /* Default height for larger screens */
  border-radius: 10px;
}

/* Adjustments for mobile screens */
@media (max-width: 768px) {
  .swiper {
    height: 25vh; /* Smaller height on mobile devices */
  }
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover; /* Cover the entire slide */
  background-position: center bottom; /* Center horizontally and align to bottom */
}


/* Custom styles for Swiper pagination bullets */

</style>

<script setup>
import { Pagination } from 'swiper/modules';
</script>
