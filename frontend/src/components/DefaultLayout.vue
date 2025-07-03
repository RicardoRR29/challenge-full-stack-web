<template>
  <div class="default-layout">
    <header class="header">
      <h1>{{ title }}</h1>
      <v-btn text color="primary" @click="handleLogout"> Logout </v-btn>
    </header>
    <div class="main">
      <Sidebar />
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { logout } from '@/services/auth'

const route = useRoute()
const router = useRouter()

const title = computed(() => {
  switch (route.path) {
    case '/students':
      return 'Student List'
    case '/students/create':
      return 'Register Student'
    default:
      if (route.path.includes('/students/') && route.path.includes('/edit')) {
        return 'Edit Student'
      }
      return 'Academic System'
  }
})

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  display: flex;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.header h1 {
  margin: 0;
  font-size: 1.25rem;
}

.content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}
</style>
