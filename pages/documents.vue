<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">Documents & Manuals</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <h2>Documents & Manuals</h2>
              <p class="mb-2">
                This is where you view documents and manuals.
              </p>
              <ion-button @click="viewPdf">View Manual</ion-button>
            </ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { FileOpener } from '@capacitor-community/file-opener';

const viewPdf = async () => {
  await FileOpener.open({
    filePath: 'https://physicalmindinstitute.s3.us-east-1.amazonaws.com/pdfs/Parasetter%C2%AE_Manual.pdf',
    contentType: 'application/pdf',
  });
};
</script>
