<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">Pilates Matwork Certification Materials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-card class="px-0">
              <TheSwiper />

              <ion-card-content class="py-4">
                <p class="py-4">
                  Access to this app gives you access to the PhysicalMind Pilates Matwork Certification Manual.
                  There are 35 exercises with movement cues, fundamentals, purpose and principles.
                  It is the same as all other companies and schools for these specific exercises.
                </p>
                <p>
                  Email us at <a href="mailto:info@pmiemail.com" class="text-blue-600">info@pmiemail.com</a> if you want
                  to own it.
                  If you want to use it to also become certified by PhysicalMind, include that in the email.
                </p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
// No need for FileOpener anymore since we're not downloading the manual directly
</script>

<style lang="css">
swiper-container {
  width: 100%;
  height: 400px;
  /* Set a fixed height or use a responsive value */
}

swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}

.swiper-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* This preserves aspect ratio */
  display: block;
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
}
</style>
