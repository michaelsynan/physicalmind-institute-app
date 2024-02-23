<template>
  <div>
    <ion-grid>
      <div v-if="filteredInstructors.length > 0">
        <transition-group name="fade" tag="ion-row">
          <ion-col size="12" size-md="6" v-for="(instructor, index) in filteredInstructors" :key="index">
            <ion-card>
              <div class="flex flex-row items-center space-x-4">
                <!-- Instructor Image with conditional rendering -->
                <div class="h-24 w-24">
                  <img :src="instructor.photo ? instructor.photo : 'path/to/default/image'" alt="Instructor Photo" class="object-cover h-full w-full">
                </div>
                <!-- Instructor Name and Link -->
                <div class="flex flex-col">
                  <ion-card-title>{{ instructor.name }}</ion-card-title>
                  <a :href="instructor.website" target="_blank">Visit Website</a>
                  <NuxtLink :to="`/?instructor=${instructor.name}`">View Videos</NuxtLink>
                </div>
              </div>
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
import { instructorData } from '/data/instructorData.js' // Ensure this path is correct

// Accept the `tag` and `instructor` props
const props = defineProps({
  tag: String,
  instructor: String
});

const filteredInstructors = computed(() => {
  // Filter by instructor name, if necessary
  let result = instructorData;
  if (props.instructor && props.instructor !== 'All') {
    result = instructorData.filter(instructor => instructor.name === props.instructor);
  }
  return result;
});
</script>

<style scoped>
/* Add any additional styles you need here */
</style>
