<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useScreenOrientation } from '/composables/useScreenOrientation';

const route = useRoute();
const supabase = useSupabaseClient()
const { lockToLandscape, unlockOrientation } = useScreenOrientation();

const isLoading = ref(true);
const isVideoPlaying = ref(false);
const playInitiated = ref(false);
const videoElement = ref(null);
const video = ref(null);
const videoUrl = ref(null);

const videoId = 16

const fetchVideoData = async () => {
  const { data, error } = await supabase
    .from('videos')
    .select('id, name, description, instructor, tags, s3url, placeholder, associatedAssets')
    .eq('id', videoId.value)
    .single();
  if (error) {
    console.error('Error fetching video data:', error);
  } else {
    return video.value = data;
  }
};

fetchVideoData();

const loadVideoData = async () => {
  await fetchVideoData();
  videoUrl.value = video.value?.s3url || '';
};

loadVideoData();

const onVideoLoaded = () => {
  isLoading.value = false;
  console.log('Video Loaded');
};

const onVideoPlaying = () => {
  isVideoPlaying.value = true;
  console.log('Video Playing');
};

const onVideoPaused = () => {
  isVideoPlaying.value = false;
  console.log('Video Paused');
};

const playVideo = () => {
  playInitiated.value = true;
  videoElement.value?.play();
  console.log('Play Video pressed');
};

const handleFullScreenChange = () => {
  if (document.fullscreenElement) {
    lockToLandscape();
  } else {
    unlockOrientation();
  }
};

onMounted(() => {
  videoElement.value = document.querySelector('.video-element');
  document.addEventListener('fullscreenchange', handleFullScreenChange);
});

onBeforeUnmount(() => {
  document.removeEventListener('fullscreenchange', handleFullScreenChange);
});
</script>

<template>

  <div id="container" class="max-w-5xl mx-auto">
    <div type="medium">
      <div class="video-responsive bg-stone-300 border-2 rounded-lg">
        <!-- Custom Play Button -->
        <div v-if="!playInitiated" class="custom-play-button" @click="playVideo">
          <img v-if="video?.placeholder" :src="video.placeholder" alt="Placeholder" class="placeholder-img" />
          <ion-icon :md="ioniconsPlayCircleOutline" :ios="ioniconsPlayCircleOutline" name="play-circle"
            class="play-icon text-lg"></ion-icon>
        </div>
        <!-- Video Element -->
        <video ref="videoElement" v-if="videoUrl" @loadeddata="onVideoLoaded" @playing="onVideoPlaying"
          @pause="onVideoPaused" class="video-element" controlsList="nodownload" controls preload="auto">
          <source :src="videoUrl" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <!-- Video Details -->
      <ion-card-header v-if="video" class="px-0 mx-0">
        <div class="flex flex-col items-start w-full gap-1">
          <div class="flex flex-wrap">
            <UBadge v-for="tag in video.tags" :key="tag"
              class="px-3 rounded border !border-opacity-80 border-primary !text-stone-100 mr-2 mb-2 font-bold tracking-wide shadown-sm">
              {{ tag }}
            </UBadge>
          </div>
          <ion-card-title>{{ video.name }}</ion-card-title>
          <ion-card-subtitle v-if="video.instructor" class="text-left">{{ video.instructor }}</ion-card-subtitle>
        </div>
      </ion-card-header>
      <ion-card-content class="text-left text-base mx-0 px-0 border-t" v-if="video">
        <div class="mt-4">{{ video.description }}</div>
        <!-- Display Download Link for Manual -->
        <div class="pt-4" v-if="video.associatedAssets">
          <span>Associated Assets: </span>
          <a :href="video.associatedAssets[0]" download="Parasetter_Manual.pdf">Manual (PDF)</a>
        </div>
      </ion-card-content>
    </div>
  </div>
</template>


<style scoped>
.video-responsive {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
}

.video-responsive .video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-play-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 10;
}

.placeholder-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}

.play-icon {
  color: #f1f1f1;
  font-size: 60px;
  z-index: 20;
  position: absolute;
}

.save-icon {
  font-size: 40px !important;
  color: white;
  z-index: 20;
  position: absolute;
}

.hidden {
  display: none;
}

ion-card {
  background: transparent;
  border: none;
  box-shadow: none;
}

ion-card-header,
ion-card-content {
  background: transparent;
}

.video-element {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid #ccc;
}
</style>
