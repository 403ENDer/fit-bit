<template>
  <div class="loginForm">
    <form class="form-input" @submit.prevent="checkpass">
      <h3>Welcome back!</h3>
      <h3 class="err-class" v-show="errShow">{{ err }}</h3>
      <div class="inputs">
        <h3 class="input-head">Email id</h3>
        <input class="input-content" type="email" required v-model="emailId" />
      </div>
      <div class="inputs">
        <h3 class="input-head">Password</h3>
        <input class="input-content" type="password" required v-model="pass" />
      </div>
      <h3>
        Not a user?
        <span> <RouterLink to="/register" class="route-link">Register</RouterLink></span>
      </h3>
      <button type="submit" class="btn-submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const emailId = ref('')
const pass = ref('')
const err = ref('')
const errShow = ref(false)

async function checkpass() {
  try {
    const response = await axios.get('http://127.0.0.1:3333/api/login', {
      params: {
        email: emailId.value,
        password: pass.value
      }
    })

    localStorage.setItem('token', response.data.token.token)
    sessionStorage.setItem('logged', true)
    sessionStorage.setItem('email', emailId.value)
    router.push('/')
  } catch (error) {
    errShow.value = true
    err.value = 'Invalid username or password'
    console.error(error)
  }
}
</script>

<style scoped>
.loginForm {
  background-color: #1f3b73;
  width: 30%;
  margin-bottom: 20%;
  margin-top: 10%;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

.form-input {
  padding: 10px 30px;
}

.input-content {
  margin-bottom: 10px;
  width: 100%;
  padding: 4% 5px 5px 10px;
  border: 1px solid #000000;
  font-size: 18px;
  border-radius: 4px;
  font-weight: 600;
  background-color: white;
  color: black;
}

.input-head {
  text-align: left;
  color: white;
}

.route-link {
  color: #19b108;
}
.route-link:hover {
  color: #1aff00;
}
.btn-submit {
  padding: 15px;
  font-size: 18px;
  color: white;
  background-color: #19b108;
  border: 1px solid #1f3b73;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #1e90ff;
}

.err-class {
  color: red;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
</style>
