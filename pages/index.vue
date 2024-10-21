<template>
  <ion-page>
    <ion-header class="ion-no-border border-b bg-white">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">PhysicalMind Institute</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container" class="max-w-full mx-auto mt-10">
        <div id="filter-tags"
          class="z-10 m-auto flex flex-row gap-2 justify-start md:justify-center pr-4 items-center flex-grow overflow-x-auto scrollbar-hide overflow-visible px-4 mt-2 md:mt-0 mb-2 w-full">
          <UBadge @click="updateSelectedBadge('New')" :class="badgeClass('New')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            New
          </UBadge>
          <UBadge @click="updateSelectedBadge('all')" :class="badgeClass('all')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            All Videos
          </UBadge>
          <UBadge @click="updateSelectedBadge('pilates')" :class="badgeClass('pilates')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            Pilates
          </UBadge>
          <UBadge @click="updateSelectedBadge('dance')" :class="badgeClass('dance')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            Dance
          </UBadge>
          <UBadge @click="updateSelectedBadge('golf')" :class="badgeClass('golf')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            Golf
          </UBadge>
          <UBadge @click="updateSelectedBadge('yoga')" :class="badgeClass('yoga')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            Yoga
          </UBadge>
          <UBadge @click="updateSelectedBadge('posture')" :class="badgeClass('posture')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            Posture
          </UBadge>
          <UBadge @click="updateSelectedBadge('aging')" :class="badgeClass('aging')"
            class="cursor-pointer py-2 px-4 rounded-full border-2 tracking-wide whitespace-nowrap text-stone-600">
            Active Aging
          </UBadge>
        </div>
        <VideoList :tag="selectedBadge" class="max-w-5xl mx-auto" />
        <!-- <VideoList :tag="selectedBadge" :instructor="selectedInstructor" class="max-w-5xl mx-auto" /> -->
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { instructorData } from '/data/instructorData.js';

const route = useRoute();

const selectedBadge = ref('all');
// const selectedInstructor = ref('All');

// const handleInstructorQueryParam = () => {
//   const instructorQueryParam = route.query.instructor;
//   if (instructorQueryParam) {
//     console.log('URL instructor parameter value:', instructorQueryParam);
//     selectedInstructor.value = instructorQueryParam;
//   } else {
//     console.log('No instructor query parameter found.');
//   }
// };

// onMounted(() => {
//   handleInstructorQueryParam();
// });

// watch(() => route.query.instructor, (newValue) => {
//   console.log('URL instructor parameter value changed to:', newValue);
//   selectedInstructor.value = newValue || 'All';
// });


watch(() => route.query, () => {
  selectedBadge.value = 'all';
});

const updateSelectedBadge = (badgeLabel: string) => {
  selectedBadge.value = badgeLabel;
};

const badgeClass = (badgeLabel: string) => {
  return selectedBadge.value === badgeLabel ? 'badge-selected' : 'badge-default';
};
</script>


<style>
.video-container {
  min-height: 100vh;
  overflow-y: auto;
}

.custom-select .select-wrapper-inner {
  background-color: #290303;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
}

.badge-default {
  background-color: white !important;
}

.badge-selected {
  opacity: 1;
  color: white !important;
  border: #d6d3d1 solid 1px;
}

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


#container {
  text-align: center;

}

#container {
  position: relative;
  text-align: center;
}

ion-select {
  --background: transparentf;
  --border-color: #cccccc;
  --border-radius: 4px;
  --placeholder-color: #888888;
}

ion-item {
  --background: transparent;
  --ion-item-background: transparent;
  --border-color: transparent;
}

ion-item:hover,
ion-item:active,
ion-item.item-interactive:item-interactive-hover {
  --background: transparent;
  --ion-item-background-hover: transparent;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
