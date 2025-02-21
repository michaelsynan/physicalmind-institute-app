<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const password = ref('***********')
const editingPassword = ref(false)
const message = ref('')
const loading = ref(false)
const showDeleteConfirm = ref(false)
const deleteInput = ref('')

const requirements = ref({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false
})

function validatePassword(value) {
  requirements.value.length = value.length >= 8
  requirements.value.uppercase = /[A-Z]/.test(value)
  requirements.value.lowercase = /[a-z]/.test(value)
  requirements.value.number = /[0-9]/.test(value)

  const allValid = Object.values(requirements.value || {}).every(Boolean)
  message.value = allValid ? '' : 'Password must include:'
}

async function updatePassword() {
  if (!editingPassword.value) {
    editingPassword.value = true;
    password.value = '';
    return;
  }

  if (!Object.values(requirements.value || {}).every(Boolean)) {
    message.value = 'Password does not meet the requirements';
    return;
  }

  try {
    loading.value = true;

    const { error } = await supabase.auth.updateUser({
      password: password.value
    });

    if (error) throw error;

    message.value = 'Password updated successfully.';
    editingPassword.value = false;
    password.value = '***********';
  } catch (error) {
    message.value = error.message;
  } finally {
    loading.value = false;
  }
}

async function deleteAccount() {
  try {
    loading.value = true

    // Corrected to match function's expected argument name (uid)
    const { error } = await supabase.rpc('delete_user', { uid: user.value.id })
    if (error) throw error

    await supabase.auth.signOut()

    router.push('/login')
  } catch (error) {
    message.value = error.message
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <ion-card class="max-w-xl p-4 border-2 !border-stone-500 mx-auto">
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <ion-text>{{ user.email }}</ion-text>
    </div>

    <div class="mb-4 pb-4 border-b border-gray-300">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <UInput color="primary" type="password" id="password" v-model="password" :readonly="!editingPassword"
        @input="validatePassword(password)"
        class="placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

      <div class="mt-2 text-xs text-gray-500 cursor-pointer" @click="updatePassword">
        {{ editingPassword ? 'Save Password' : 'Update Password' }}
      </div>

      <ion-button v-if="editingPassword" expand="block" @click="updatePassword"
        :disabled="loading || !Object.values(requirements.value || {}).every(Boolean)">
        Submit New Password
      </ion-button>

      <div v-if="message" class="text-xs mt-1"
        :class="{ 'text-red-500': message !== 'Password updated successfully.', 'text-green-500': message === 'Password updated successfully.' }">
        {{ message }}
      </div>

      <ul v-if="editingPassword" class="text-xs text-gray-500 mt-1">
        <li :class="requirements.length ? 'text-green-500' : 'text-red-500'">- At least 8 characters</li>
        <li :class="requirements.uppercase ? 'text-green-500' : 'text-red-500'">- At least one uppercase letter</li>
        <li :class="requirements.lowercase ? 'text-green-500' : 'text-red-500'">- At least one lowercase letter</li>
        <li :class="requirements.number ? 'text-green-500' : 'text-red-500'">- At least one number</li>
      </ul>
    </div>

    <div class="text-center text-red-600 font-semibold text-sm mt-4 cursor-pointer"
      @click="showDeleteConfirm = !showDeleteConfirm">
      DELETE ACCOUNT
    </div>

    <div v-if="showDeleteConfirm" class="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg">
      <p class="text-red-700 text-sm font-medium">Are you sure you want to delete your account?</p>
      <p class="text-xs text-gray-600 mt-2">Type <span class="font-semibold">"delete"</span> below to confirm.</p>

      <UInput color="red" type="text" v-model="deleteInput"
        class="mt-2 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />

      <ion-button color="danger" expand="block" class="mt-3" @click="deleteAccount"
        :disabled="deleteInput !== 'delete' || loading">
        Confirm Delete
      </ion-button>
    </div>
  </ion-card>
</template>
