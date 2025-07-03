<template>
  <v-form ref="formRef" v-model="valid" lazy-validation>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field v-model="localStudent.name" :rules="[rules.required]" label="Name" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="localStudent.email"
          :rules="[rules.required, rules.email]"
          label="E-mail"
          required
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="localStudent.ra"
          :disabled="mode === 'edit'"
          :rules="[rules.required]"
          label="RA"
          required
        />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="localStudent.cpf"
          :disabled="mode === 'edit'"
          :rules="[rules.required]"
          label="CPF"
          required
        />
      </v-col>
    </v-row>

    <v-row class="mt-4 justify-end">
      <v-btn text @click="$emit('cancel')">Cancel</v-btn>
      <v-btn color="primary" class="ml-2" :disabled="!valid" @click="onSubmit">Save</v-btn>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'

interface Student {
  id?: number
  name: string
  email: string
  ra: string
  cpf: string
}

const props = defineProps<{
  mode: 'create' | 'edit'
  student: Partial<Student> | null
}>()

const emit = defineEmits<{
  (e: 'submit', data: Student): void
  (e: 'cancel'): void
}>()

const formRef = ref()
const valid = ref(false)

const localStudent = reactive<Student>({
  name: '',
  email: '',
  ra: '',
  cpf: '',
})

watch(
  () => props.student,
  (val) => {
    if (val) {
      Object.assign(localStudent, val)
    }
  },
  { immediate: true },
)

const rules = {
  required: (v: string) => !!v || 'Required.',
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'E-mail must be valid.',
}

function onSubmit() {
  formRef.value.validate().then((success: boolean) => {
    if (success) {
      emit('submit', { ...localStudent })
    }
  })
}
</script>
