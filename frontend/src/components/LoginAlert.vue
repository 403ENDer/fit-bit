<template>
  <v-dialog v-model="isShowLogDialog" max-height="900" max-width="500" class="pa-4 color='primary'">
    <v-card>
      <v-text class="text-center text-h4 pa-12">{{ message }}</v-text>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login" class="text-h5 mb-2 text-center" variant="outlined"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import router from '@/router'
import { ref, onBeforeUnmount, defineProps } from 'vue'

const props = defineProps({
  message: String
})

const message = props.message || 'Please Login to Continue!!'
const isShowLogDialog = ref(true)

function login() {
  isShowLogDialog.value = false
  router.push('/login')
}
</script>
