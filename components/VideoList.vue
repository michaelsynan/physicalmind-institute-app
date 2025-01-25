<script setup>
const supabase = useSupabaseClient()
const loading = ref('');
const allVideos = ref([]);
const visibleVideos = ref([]);

const props = defineProps({
  tag: {
    type: String,
    default: 'all',
  },
});

const fetchVideos = async () => {
  loading.value = true;
  const { data, error } = await supabase
    .from('videos')
    .select(`name, videoid, placeholder, description, tags, visible`)

  if (error) {
    console.error('Error fetching videos:', error);
  } else {
    console.log('Fetched videos:', data);
    allVideos.value = data.filter(video => video.visible === true);
    console.log('All visible videos from database:', allVideos.value);
    showAllVideos();
  }
  loading.value = false;
}

fetchVideos()

const showAllVideos = () => {
  const videosToShow = allVideos.value.filter(video => video.visible);
  if (props.tag !== 'all') {
    console.log("Filtering videos by tag:", props.tag);
    const filteredVideos = videosToShow.filter(video => video.tags.includes(props.tag));
    visibleVideos.value = [...filteredVideos];
  } else {
    console.log("Showing all visible videos");
    visibleVideos.value = [...videosToShow];
  }
};

// Watcher to update visible videos when 'tag' prop changes
watch(() => props.tag, (newVal, oldVal) => {
  console.log(`Tag changed from ${oldVal} to ${newVal}`);
  showAllVideos(); // Call showAllVideos to update the video list based on the new tag
}, { immediate: true });

</script>


<template>
  <div class="video-container">
    <div v-if="loading" class="loading-screen flex justify-center items-center inset-0 fixed h-full w-full">
      <ion-spinner name="lines"></ion-spinner>
    </div>
    <div v-else>
      <div v-if="visibleVideos.length > 0" class="">
        <transition-group name="fade">
          <ion-grid>
            <ion-row class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ion-col size="12" v-for="(video) in visibleVideos" :key="video.videoid">
                <ion-card>
                  <NuxtLink prefetch :to="`/video/${video.videoid}`">
                    <div class="video-list cursor-pointer border-2 rounded-lg">
                      <img v-if="video.placeholder" :src="video.placeholder" :alt="video.name"
                        class="video-placeholder rounded-lg">
                    </div>
                    <ion-card-header class="pt-3 pb-0">
                      <ion-card-title class="text-lg md:text-xl text-left">{{ video.name }}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content class="text-left pb-1">
                      <p class="text-base truncate text-left">{{ video.description }}</p>
                    </ion-card-content>
                  </NuxtLink>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </transition-group>
      </div>
      <div v-else class="ion-padding">
        <p>Sorry, no videos exist for this query.</p>
      </div>
    </div>
    <!-- <ion-infinite-scroll @ionInfinite="ionInfinite" :disabled="!infiniteScrollEnabled" threshold="20px" class="mt-10">
      <ion-infinite-scroll-content loading-spinner="bubbles">
      </ion-infinite-scroll-content>
    </ion-infinite-scroll> -->
  </div>
</template>

<style scoped>
.video-container {
  overscroll-behavior-y: contain;
}

.video-container {
  min-height: 100vh;
}

.infinite-scroll-base {
  margin-top: 10px;
  margin-bottom: 60px;
}

.video-list {
  position: relative;
  /* width: 100%; */
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
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

ion-card-header,
ion-card-content {
  padding-inline: 0px;
}

.loading-screen {
  text-align: center;
  padding: 20px;
}
</style>
