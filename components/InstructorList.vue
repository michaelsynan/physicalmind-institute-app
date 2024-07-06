<template>
  <div>
    <ion-grid>
      <div v-if="filteredInstructors.length > 0">
        <transition-group name="fade" tag="ion-row">
          <ion-col size="12" size-md="6" v-for="(instructor, index) in filteredInstructors" :key="index">
            <ion-card>
              <NuxtLink prefetch :to="`/instructors/${instructor.slug}`">
                <div class="flex flex-row items-center space-x-4">
                  <!-- Instructor Image with conditional rendering and rounded-full for round images -->
                  <div class="h-20 w-20 m-2.5">
                    <img :src="instructor.photo ? instructor.photo : 'path/to/default/image'" alt="Instructor Photo" class="object-cover h-full w-full rounded-full border border-opacity-50 border-stone-400">
                  </div>
                  <!-- Instructor Name and Video Count -->
                  <div class="flex flex-col">
                    <ion-card-title>{{ instructor.fullName }}</ion-card-title>
                    <p>{{ instructor.videoCount }} videos</p>
                  </div>
                </div>
              </NuxtLink>
            </ion-card>
          </ion-col>
        </transition-group>
      </div>
      <div v-else class="ion-padding">
        <p>Sorry, no instructors exist for this query.</p>
      </div>
    </ion-grid>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { instructorData } from '/data/instructorData.js'
import { videoData } from '/data/videoData.js' // Ensure this path is correct

const props = defineProps({
  tag: String,
  instructor: String
});

const filteredInstructors = computed(() => {
  let result = instructorData.map(instructor => {
    const videoCount = videoData.filter(video => video.instructor === instructor.name).length;
    return {
      ...instructor,
      videoCount
    };
  });

  // Check for 'new' tag which corresponds to a boolean in the data
  if (props.tag === 'new') {
    result = result.filter(instructor => instructor.new === true);
  } else if (props.tag && props.tag !== 'All' && props.tag !== 'new') {
    // Handle other tags normally if any (assuming tag matches some other string property in instructor data)
    result = result.filter(instructor => instructor.tags && instructor.tags.includes(props.tag));
  }

  // Filter by instructor name, if provided and not 'All'
  if (props.instructor && props.instructor !== 'All') {
    result = result.filter(instructor => instructor.name === props.instructor);
  }

  // Sort instructors alphabetically by name
  result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
});
</script>

<style scoped>
/* Add any additional styles you need here */
</style>
