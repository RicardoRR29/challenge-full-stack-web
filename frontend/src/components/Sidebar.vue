<template>
  <aside class="sidebar">
    <div class="sidebar-header">Academic Module</div>
    <ul class="nav-list">
      <li :class="{ active: isActive('/students') }" @click="goTo('/students')">Students</li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function goTo(path: string) {
  router.push(path)
}

function isActive(path: string) {
  return route.path === path
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #424242;
  color: #fff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sidebar-header {
  padding: 1rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-list li {
  padding: 0.75rem 1rem;
  cursor: pointer;
}

.nav-list li.active {
  background-color: #e3f2fd;
  color: #000;
}
</style>
