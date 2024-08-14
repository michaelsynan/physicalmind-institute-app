<template>
  <div>
    <ion-grid>
      <!-- Directly check the length of allVideos -->
      <div v-if="allVideos.length > 0">
        <transition-group name="fade" tag="ion-row">
          <!-- Iterate over allVideos instead of filteredVideos -->
          <ion-col size="12" size-md="6" v-for="(video, index) in visibleVideos" :key="video.videoid">
            <ion-card>
              <NuxtLink :to="`/video/${video.videoid}`">
                <div class="video-list cursor-pointer border-2 rounded-lg">
                  <img v-if="video.placeholder" :src="video.placeholder" :alt="video.name" class="video-placeholder rounded-lg">
                </div>
                <ion-card-header class="pt-3 pb-0">
                  <div class="flex flex-col w-full h-full items-start">
                    <ion-card-title class="text-lg md:text-xl">{{ video.name }}</ion-card-title>
                  </div>
                </ion-card-header>
                <ion-card-content class="text-left pb-1">
                  <div class="text-base truncate">
                    <p>{{ video.description }}</p>
                  </div>
                </ion-card-content>
              </NuxtLink>
            </ion-card>
          </ion-col>
        </transition-group>
      </div>
      <div v-else class="ion-padding">
        <p>Sorry, no videos exist for this query.</p>
      </div>
      <ion-infinite-scroll @ionInfinite="ionInfinite" threshold="60px" class="mt-10 mb-20">
  <ion-infinite-scroll-content
    loading-spinner="bubbles"
    loading-text="Loading more videos...">
  </ion-infinite-scroll-content>
</ion-infinite-scroll>

    </ion-grid>

  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { videoData } from '~/data/videoData.js';

// Define properties received from the parent component or elsewhere
const props = defineProps({
  tag: String,
  instructor: String
});

const allVideos = ref(videoData);
const visibleVideos = ref([]);

// Computed property for filtering videos based on provided props
const filteredVideos = computed(() => {
  return allVideos.value.filter(video =>
    (!props.tag || props.tag === 'all videos' || video.tags.includes(props.tag)) &&
    (!props.instructor || props.instructor === 'All' || video.instructor === props.instructor)
  );
});

// Function to add videos; modifies to use filtered videos
const addVideos = (count = 1) => {
  const endIndex = Math.min(visibleVideos.value.length + count, filteredVideos.value.length);
  while (visibleVideos.value.length < endIndex) {
    visibleVideos.value.push(filteredVideos.value[visibleVideos.value.length]);
  }
  console.log('Visible Videos:', visibleVideos.value);
};

// Load 8 videos initially based on the filter
onMounted(() => {
  addVideos(8);
});

const ionInfinite = async (event) => {
  addVideos(); // Default adds one more video
  setTimeout(() => {
    if (event.target) {
      event.target.complete();
    }
  }, 500);
};
</script>


<style scoped>
.video-list {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.video-list .video-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.save-btn {
  opacity: 0;
  position: absolute;
  top: 5px;
  right: 0;
  margin: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  z-index: 10;
  transition: opacity 0.2s ease, top 0.2s ease;
}

.video-list:hover .save-btn {
  opacity: 1;
  top: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

ion-card {
  background: transparent;
  border: none;
  box-shadow: none;
}

ion-card:hover {
  box-shadow: none;
  transform: none;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

ion-card-header, ion-card-content {
  padding-inline: 0px;
}

</style>
