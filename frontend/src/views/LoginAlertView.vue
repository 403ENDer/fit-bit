<template>
  <div style="text-align: center; padding: 20px">
    <h1>Thank you for using ZenFit</h1>
    <h2>
      If you want to continue our services?
      <RouterLink to="/login" class="routes"><strong>&nbsp;Login</strong></RouterLink>
    </h2>
  </div>
</template>

<script setup>
import LoginAlert from '@/components/LoginAlert.vue'
import { onMounted } from 'vue'

onMounted(() => {
  sessionStorage.removeItem('logged')
})
</script>

<style scoped>
h1,
h2 {
  color: #1f3b73;
  margin-bottom: 20px;
}

.routes {
  color: blue;
  text-decoration: none;
}

.routes:hover {
  text-decoration: underline;
}
</style>
