<template>
  <v-container fluid class="fill-height d-flex align-center justify-center">
    <v-card width="400">
      <v-card-title class="text-h5 justify-center">Login</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
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
          <v-btn type="submit" color="primary" class="mt-4" block>
            Login
          </v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <span>Don't have an account?</span>
        <v-btn text color="primary" @click="goRegister">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await login({ username: username.value, password: password.value })
    router.push('/students')
  } catch (err) {
    console.error('Login failed', err)
  }
}

const goRegister = () => {
  router.push('/register')
}
</script>