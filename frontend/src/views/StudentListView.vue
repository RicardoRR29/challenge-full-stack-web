<template>
  <v-container>
    <v-row class="justify-space-between align-center mb-4">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="search"
          label="Search by name or RA"
          prepend-inner-icon="mdi-magnify"
          clearable
        />
      </v-col>
      <v-col cols="12" md="3" class="text-right">
        <v-btn color="primary" @click="goToCreate" v-if="isAdmin">
          <v-icon left>mdi-plus</v-icon>
          New Student
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="visibleHeaders"
      :items="filteredStudents"
      :loading="loading"
      loading-text="Loading students..."
      class="elevation-1"
    >
      <template #item.actions="{ item }" v-if="isAdmin">
        <v-btn icon @click="editStudent(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="red" @click="confirmDelete(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="text-h6">Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete student <strong>{{ selected?.name }}</strong
          >?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red" @click="deleteStudent">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { isAdmin as checkIsAdmin } from '@/utils/roles'

const isAdmin = checkIsAdmin()
const router = useRouter()

interface Student {
  id: number
  ra: string
  name: string
  cpf: string
}

const students = ref<Student[]>([])
const search = ref('')
const loading = ref(false)
const dialog = ref(false)
const selected = ref<any>(null)

const headers = [
  { title: 'RA', key: 'ra' },
  { title: 'Name', key: 'name' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Actions', key: 'actions', sortable: false },
]

const visibleHeaders = computed(() => {
  return isAdmin ? headers : headers.filter((h) => h.key !== 'actions')
})

const fetchStudents = async () => {
  loading.value = true
  try {
    const res = await api.get('/students')
    students.value = res.data
  } catch (err) {
    console.error('Failed to load students', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchStudents)

const filteredStudents = computed(() => {
  if (!search.value) return students.value
  const term = search.value.toLowerCase()
  return students.value.filter(
    (s) => s.name.toLowerCase().includes(term) || s.ra.toLowerCase().includes(term),
  )
})

const goToCreate = () => {
  router.push('/students/create')
}

const editStudent = (id: number) => {
  router.push(`/students/${id}/edit`)
}

const confirmDelete = (student: any) => {
  selected.value = student
  dialog.value = true
}

const deleteStudent = async () => {
  if (!selected.value) return
  try {
    await api.delete(`/students/${selected.value.id}`)
    dialog.value = false
    selected.value = null
    await fetchStudents()
  } catch (err) {
    console.error('Error deleting student', err)
  }
}
</script>
