<script setup lang="ts">

// access to public tables
const client = useSupabaseClient();

// access to authenticated user
const user = useSupabaseUser();

const access = ref('');


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

</script>

<template>
  <div id="limited-container" class="max-w-5xl mx-auto">

    <ion-card>
      <ion-grid class="ion-justify-content-center">
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="8" size-lg="6" size-xs="12">
            <ion-text>
              <SingleVideo />
              <h2>To gain access to this material please confirm that you have purchased TYE4X or Parasetter</h2>

            </ion-text>
            <ion-text>
              <p>
                To gain access you can upload a photo, supply the email address used to purchase the product, if from
                amazon
                you may provide your Purchase Number, or call our office.
              </p>

            </ion-text>
            <ion-list class="mt-10">
              <ion-item>
                <ion-select placeholder="Select a Fruit">
                  <div slot="label">Select Verification Method</div>
                  <ion-select-option value="apple">Upload Photo</ion-select-option>
                  <ion-select-option value="banana">Provide Email Address</ion-select-option>
                  <ion-select-option value="orange">Call Us</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-list>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-card>
  </div>
</template>

<style scoped></style>
