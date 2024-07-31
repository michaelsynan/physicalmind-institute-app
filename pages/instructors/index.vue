<script lang="ts" setup></script>

<template>
  <ion-page>
    <ion-header  class="ion-no-border border-b-2 bg-white">
      <ion-toolbar>
        <ion-buttons slot="start" class="absolute">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center"></ion-title>


      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-sm="12" size-xs="12">
     <InstructorList />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped>

ion-col {
  padding: 0px !important;
}

ion-card {
  margin: 0px !important;
}

</style>
