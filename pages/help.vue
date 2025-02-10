<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">Support</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <h2>PhysicalMind Studio Support</h2>
              <p>
                Do you have questions or need help with the PhysicalMind Studio app or any of the content? Please feel
                free to call during business hours or send an email.
              </p>
            </ion-text>
            <div class="!bottom-0 pt-6 flex-grow mt-auto mx-auto flex flex-col gap-0.5">
              <ion-button expand="block" href="tel:+12123432150" class="">
                <ion-icon slot="start" :md="ioniconsCall" :ios="ioniconsCall"
                  class="text-white pr-1 -ml-1"></ion-icon>Call</ion-button>
              <ion-button expand="block" href="mailto:info@pmiemail.com">
                <ion-icon slot="start" :md="ioniconsMail" :ios="ioniconsMail"
                  class="text-white pr-1"></ion-icon>Email</ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
