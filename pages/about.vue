<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">About</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <h2>About PhysicalMind Studio</h2>
              <div class="grid grid-cols-2 gap-4 my-4">
                <img src="/studio-1-compressed.jpg" class="rounded-sm" />
                <img src="/studio-2-compressed.jpg" class="rounded-sm" />
              </div>
              <p class="mb-4">
                The PhysicalMind Studio app is for individuals who own PhysicalMind Institute equipment and would like
                to watch instructional content. If you are interested in being certified by PhysicalMind Institute,
                please contact us at <a href="mailto:info@pmiemail.com">info@pmiemail.com</a>.
              </p>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
