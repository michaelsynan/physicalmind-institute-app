<script setup>
import { ref } from 'vue'
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const password = ref('***********')
const editingPassword = ref(false)
const message = ref('')
const loading = ref(false)

const requirements = ref({
  length: false,
  uppercase: false,
  lowercase: false,
  number: false
})

function validatePassword(value) {
  // Validate the password and set requirements accordingly
  requirements.value.length = value.length >= 8
  requirements.value.uppercase = /[A-Z]/.test(value)
  requirements.value.lowercase = /[a-z]/.test(value)
  requirements.value.number = /[0-9]/.test(value)

  // Check if all requirements are met
  const allValid = Object.values(requirements.value || {}).every(Boolean)
  message.value = allValid ? '' : 'Password must include:'
}

async function updatePassword() {
  if (!editingPassword.value) {
    editingPassword.value = true;
    password.value = '';
    return;
  }

  // Check if all requirements are met before updating the password
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
    password.value = '***********'; // Reset password input field
  } catch (error) {
    message.value = error.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <ion-card class="max-w-xl p-4 border-2 !border-stone-500 mx-auto">
    <div class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <ion-text>{{ user.email }}</ion-text>
    </div>

    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
      <UInput color="primary" type="password" id="password" v-model="password" :readonly="!editingPassword"
        @input="validatePassword(password)"
        class="placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

      <div class="mt-2 text-xs text-gray-500 cursor-pointer" @click="updatePassword">
        {{ editingPassword ? 'Save Password' : 'Update Password' }}
      </div>

      <!-- Add ion-button to submit password -->
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
  </ion-card>
</template>

<style scoped></style>
