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
  <ion-card class="max-w-xl p-4 border-2 !border-stone-500 mx-auto">
    <form class="form-widget" @submit.prevent="updateProfile">
      <div class="mb-2">Hello {{ full_name }}</div>


      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <UInput color="primary" type="email" id="email" placeholder="Enter your email" v-model="user.email" required
          class="placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Password</label>
        <UInput color="primary" type="email" id="email" placeholder="***********" required
          class="placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs">
              <UIcon name="i-mdi-pencil" class="w-5 h-5" />
            </span>
          </template>
        </UInput>
      </div>







      <div>
        <ion-button v-if="isEditing" type="submit" expand="block" :disabled="loading">
          {{ loading ? 'Loading ...' : 'Update' }}
        </ion-button>
        <ion-button v-else @click="editProfile" expand="block" :disabled="loading">Edit Profile</ion-button>
      </div>
    </form>
  </ion-card>
</template>

<style scoped></style>