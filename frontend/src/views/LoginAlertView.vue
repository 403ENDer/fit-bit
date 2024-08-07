<template>
  <div>
    <LoginAlert
      message="Currently Logged out from your session,if you want continue please Login"
    />
  </div>
</template>
<script setup>
import LoginAlert from '@/components/LoginAlert.vue'
import { onMounted } from 'vue'

onMounted(() => {
  sessionStorage.removeItem('logged')
})
</script>
