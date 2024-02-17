<script setup lang="ts">
definePageMeta({
  middleware: ["logger"]
  }
)

const selectedBadge = ref('')

// Method to update selectedBadge
const updateSelectedBadge = (badgeLabel: string) => {
  selectedBadge.value = badgeLabel
}

</script>
<template>
  <ion-page class="!bg-green-500">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Fitness Studio App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="!bg-green-500">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Nuxt Ionic</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container" class="my-10 max-w-5xl mx-auto">
        <div class="flex justify-center items-center">
          <nuxt-img provider="cloudinary" src="/v1708006480/physicalmind-logo-french-blue_hoitel.png" height="60" />
        </div>
        <div class="flex flex-row gap-4 justify-center my-8">
          <UBadge @click="updateSelectedBadge('New')" :ui="{ rounded: 'rounded-full' }" size="lg" class="cursor-pointer">New</UBadge>
          <UBadge @click="updateSelectedBadge('All Videos')" :ui="{ rounded: 'rounded-full' }" size="lg" class="cursor-pointer">All Videos</UBadge>
          <UBadge @click="updateSelectedBadge('Dance')" :ui="{ rounded: 'rounded-full' }" size="lg" class="cursor-pointer">Dance</UBadge>
          <UBadge @click="updateSelectedBadge('Golf')" :ui="{ rounded: 'rounded-full' }" size="lg" class="cursor-pointer">Golf</UBadge>
        </div>
        
      <VideoList :tag="selectedBadge"/>
      </div>
    </ion-content>
  </ion-page>
</template>


<style scoped>
#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}

.video-responsive {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 56.25%;
  /* 16:9 Aspect Ratio */
}

.video-responsive iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#container {
  text-align: center;

}
</style>
