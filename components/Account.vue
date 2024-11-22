<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(true)
const website = ref('')
const avatar_path = ref('')
const full_name = ref('')

const isEditing = ref(false)

function editProfile() {
  isEditing.value = !isEditing.value
}

loading.value = true

const { data } = await supabase
  .from('profiles')
  .select(`full_name, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  website.value = data.website
  avatar_path.value = data.avatar_url
  full_name.value = data.full_name
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true

    const updates = {
      id: user.value.id,

      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <ion-card class="max-w-xl p-4 border-2 border-stone-500 bg-stone-100 mx-auto">
    <form class="form-widget" @submit.prevent="updateProfile">
      <div>Hello {{ full_name }}</div>
      <div>add password update</div>
      <ion-item>
        <ion-label position="stacked" for="email">Email</ion-label>
        <ion-input color="primary" id="email" type="text" :value="user.email" readonly fill="solid"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked" for="website">Website</ion-label>
        <ion-input id="website" type="url" v-model="website" fill="outline"></ion-input>
      </ion-item>
      <ion-item lines="none">
        <ion-button v-if="isEditing" type="submit" expand="block" :disabled="loading">
          {{ loading ? 'Loading ...' : 'Update' }}
        </ion-button>
        <ion-button v-else @click="editProfile" expand="block" :disabled="loading">Edit Profile</ion-button>
      </ion-item>
    </form>
  </ion-card>
</template>

<style scoped></style>