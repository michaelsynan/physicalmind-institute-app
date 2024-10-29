<script setup>
const supabase = useSupabaseClient()

const loading = ref(true)
const username = ref('')
const website = ref('')
const avatar_path = ref('')

loading.value = true
const user = useSupabaseUser()

const { data } = await supabase
  .from('profiles')
  .select(`username, website, avatar_url`)
  .eq('id', user.value.id)
  .single()

if (data) {
  username.value = data.username
  website.value = data.website
  avatar_path.value = data.avatar_url
}

loading.value = false

async function updateProfile() {
  try {
    loading.value = true
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      username: username.value,
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

async function signOut() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    user.value = null
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <ion-item>
      <ion-label position="stacked" for="email">Email</ion-label>
      <ion-input id="email" type="text" :value="user.email" readonly fill="solid"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked" for="username">Username</ion-label>
      <ion-input id="username" type="text" v-model="username" fill="solid"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked" for="website">Website</ion-label>
      <ion-input id="website" type="url" v-model="website" fill="outline"></ion-input>
    </ion-item>

    <ion-item lines="none">
      <ion-button type="submit" expand="block" :disabled="loading">
        {{ loading ? 'Loading ...' : 'Update' }}
      </ion-button>
    </ion-item>

    <ion-item lines="none">
      <ion-button expand="block" @click="signOut" :disabled="loading">Sign Out</ion-button>
    </ion-item>
  </form>
</template>

<style scoped></style>