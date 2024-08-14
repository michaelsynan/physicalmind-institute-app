<template>
  <ion-page>
    <ion-header  class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">Certification</ion-title>

      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <h2 class="mb-6">Certification FAQ</h2>
         
  <UAccordion
    color="primary"
    variant="soft"
    size="md"
    :items="[{ label: 'How can I become a certified instructor?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: 'How can I bridge my certification from another program?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: 'My certification has lapsed—how do I apply for Amnesty?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }, { label: 'How can I get my CECs?', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit' }]"
  />


            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>
