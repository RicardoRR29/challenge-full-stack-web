<template>
  <v-container fluid class="fill-height d-flex align-center justify-center">
    <v-card width="400">
      <v-card-title class="text-h5 justify-center">Register</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="username"
            label="Username"
            prepend-inner-icon="mdi-account"
            required
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock"
            required
          />
          <v-text-field
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
            prepend-inner-icon="mdi-lock-check-outline"
            :rules="[rules.match]"
            required
          />
          <v-btn type="submit" color="primary" class="mt-4" block>
            Register
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <span>Already have an account?</span>
        <v-btn text color="primary" @click="goLogin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const rules = {
  match: (value: string) => value === password.value || "Passwords don't match",
}

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) return
  try {
    await register({ username: username.value, password: password.value })
    router.push('/login')
  } catch (err) {
    console.error('Register failed', err)
  }
}

const goLogin = () => {
  router.push('/login')
}
</script>