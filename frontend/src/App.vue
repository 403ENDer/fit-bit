<template>
  <v-app>
    <v-app-bar app style="background-color: navy; color: white">
      <v-app-bar-nav-icon @click="toggleDrawer" color="white" />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />
      <v-spacer />

      <v-toolbar-title
        ><RouterLink to="/about"
          ><h3 style="font-weight: 900; font-size: 32px; color: white">
            <v-icon>mdi-dumbbell</v-icon>&nbsp;ZenFit
          </h3></RouterLink
        ></v-toolbar-title
      >
      <v-toolbar-title style="margin-left: 40%"
        ><RouterLink to="/profile"
          ><v-icon color="white">mdi-account-circle</v-icon></RouterLink
        ></v-toolbar-title
      >
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
      :temporary="true"
      style="background-color: navy; color: white"
    >
      <v-list>
        <v-list-item>
          <RouterLink to="/" class="routes" style="font-weight: 900; font-size: 20px"
            >Dash Board</RouterLink
          >
        </v-list-item>
        <v-list-item>
          <RouterLink to="/details" class="routes" style="font-weight: 900; font-size: 20px"
            >Activities</RouterLink
          >
        </v-list-item>
        <v-list-item>
          <RouterLink to="/loginAlert" class="routes" style="font-weight: 900; font-size: 20px"
            >Logout</RouterLink
          >
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

const drawer = ref(false)
const logged = ref(false)
const toggleDrawer = () => {
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
