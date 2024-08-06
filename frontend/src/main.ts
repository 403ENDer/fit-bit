// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import 'vuetify/styles'
import router from './router'

loadFonts()

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
