<script lang="ts" setup></script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="justify-center text-center">Instructors</ion-title>


      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
     <InstructorList />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<style scoped></style>
