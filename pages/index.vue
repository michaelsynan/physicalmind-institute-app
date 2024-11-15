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

      <!-- Show loading while data is being fetched -->
      <div v-if="loading" class="my-4 flex items-center justify-center">
        <p>Loading...</p>
      </div>

      <!-- Show LimitedAccess if access is denied -->
      <LimitedAccess v-else-if="!access" class="my-4" />

      <!-- Show videos if access is granted -->
      <div v-else id="container" class="max-w-full mx-auto mt-10">
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

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
// import { instructorData } from '/data/instructorData.js';
import { useVideoData } from '~/composables/useVideoData';

const loading = ref(true); // Initialize loading as true
const videos = ref([]); // To store the fetched video data
const { fetchVideoData } = useVideoData(); // Use your composable
const user = useSupabaseUser()
const client = useSupabaseClient()
const route = useRoute();
const access = ref('');

onMounted(async () => {
  loading.value = true; // Set loading to true before fetching data

  try {
    videos.value = await fetchVideoData(); // Fetch video data
    console.log('Fetched videos:', videos.value);
    await fetchUserProfile(); // Fetch user profile
  } catch (error) {
    console.error('Error during data fetching:', error);
  } finally {
    loading.value = false; // Set loading to false after fetching is done
  }
});

async function fetchUserProfile() {
  if (user.value) {
    const { data, error } = await client
      .from('profiles')
      .select('access')
      .eq('id', user.value.id)
      .single();  // Assumes there is only one profile per user

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    access.value = data.access;
  }
}

onMounted(fetchUserProfile);

const selectedBadge = ref('all');

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
ion-backdrop {
  background: var(--ion-color-dark);
  opacity: 0.3;
}

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


.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<style scoped>
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
</style>