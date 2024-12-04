<style scoped>
::v-deep button span {
  text-align: left !important;
  display: inline-block !important;
  white-space: normal !important;
  align-items: flex-start !important;
}
</style>

<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center font-bold">Certification FAQ</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <UAccordion id="certification-accordion" class="!text-left" color="primary" variant="soft" size="lg"
              :items="[{ label: 'How can I become a certified instructor?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: 'How can I bridge my certification from another program?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: 'My certification has lapsed—how do I apply for Amnesty?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: 'How can I get my CECs?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }]" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
