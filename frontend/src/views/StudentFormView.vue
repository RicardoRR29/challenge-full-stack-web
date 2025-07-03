<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ isEditMode ? 'Edit Student' : 'Register Student' }}
      </v-card-title>

      <v-card-text>
        <StudentForm
          :mode="isEditMode ? 'edit' : 'create'"
          :student="student"
          @submit="handleSubmit"
          @cancel="goBack"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import StudentForm from '@/components/StudentForm.vue'
import { isAdmin } from '@/utils/roles'

const route = useRoute()
const router = useRouter()

const student = ref<any>(null)
const isEditMode = computed(() => !!route.params.id)

const fetchStudent = async () => {
  try {
    const res = await api.get(`/students/${route.params.id}`)
    student.value = res.data
  } catch (err) {
    console.error('Failed to load student', err)
  }
}

const handleSubmit = async (data: any) => {
  if (!isAdmin()) {
    alert('You do not have permission to perform this action.')
    return
  }

  try {
    if (isEditMode.value) {
      await api.put(`/students/${route.params.id}`, data)
    } else {
      await api.post('/students', data)
    }
    router.push('/students')
  } catch (err) {
    console.error('Failed to save student', err)
  }
}

const goBack = () => {
  router.push('/students')
}

onMounted(() => {
  if (isEditMode.value) fetchStudent()
})
</script>
