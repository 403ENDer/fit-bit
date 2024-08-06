<template>
  <v-app>
    <v-app-bar app style="background-color: #1f3b73; color: white">
      <v-app-bar-nav-icon @click="toggleDrawer" color="white" />
      <v-spacer />
      <v-toolbar-title><h3>Fit Bit</h3></v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      :temporary="true"
      style="background-color: #1f3b73; color: white"
    >
      <v-list>
        <v-list-item>
          <RouterLink to="/" class="routes">Dash Board</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/details" class="routes">Activities</RouterLink>
        </v-list-item>
        <v-list-item>
          <RouterLink to="/login" class="routes" v-if="logged">Login</RouterLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import LoginAlert from './components/LoginAlert.vue'

const drawer = ref(false)
const logged = ref(false)
const toggleDrawer = () => {
  console.log('hi')
  drawer.value = !drawer.value
}

onMounted(() => {
  logged.value = sessionStorage.getItem('logged')
})
</script>

<style>
.routes {
  color: white;
  text-decoration: none;
  font-weight: 600;
}

.routes:hover {
  color: bisque;
}
</style>
