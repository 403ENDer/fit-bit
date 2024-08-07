<template>
  <div class="loginForm">
    <h3>Welcome to the App!</h3>
    <form class="form-input" @submit.prevent="handleSubmit">
      <h3 class="err-class" v-show="errShow">{{ err }}</h3>
      <div class="inputs">
        <h3 class="input-head">Username</h3>
        <input class="input-content" type="text" required v-model="username" />
      </div>
      <div class="inputs">
        <h3 class="input-head">Email</h3>
        <input class="input-content" type="text" required v-model="emailId" />
      </div>
      <div class="inputs">
        <h3 class="input-head">Age</h3>
        <input class="input-content" type="number" required v-model="age" />
      </div>
      <div class="inputs">
        <h3 class="input-head">Password</h3>
        <input class="input-content" type="password" required v-model="pass" />
      </div>
      <div class="inputs">
        <h3 class="input-head">Confrim Password</h3>
        <input class="input-content" type="password" required v-model="confirmPass" />
      </div>
      <h3>
        Already a user? <span> <RouterLink to="/login" class="route-link">Login</RouterLink></span>
      </h3>
      <button type="submit" class="btn-submit">Register</button>
    </form>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axiosObj from '@/axios'

const url = import.meta.env.VITE_APP_URL
const username = ref(),
  emailId = ref(),
  pass = ref(),
  confirmPass = ref(),
  err = ref(),
  errShow = ref(false),
  age = ref()

const route = useRouter()

async function dataPush() {
  try {
    const response = await axiosObj.post(`${url}/api/register `, {
      name: username.value,
      email: emailId.value,
      password: pass.value,
      age: age.value
    })
    if (response.status === 200) {
      alert(`User name ${username.value} added successfully`)
      console.log(response.data)
      sessionStorage.setItem('token', response.data.token.token)
      sessionStorage.setItem('logged', true)
      sessionStorage.setItem('email', emailId.value)
      route.push('/')
    }
  } catch (error) {
    errShow.value = true
    if (error.response.status === 400) {
      console.log('hi')
      err.value = response.data.message
    } else {
      err.value = err.messages
    }
  }
}

function handleSubmit() {
  if (pass.value.length >= 6) {
    if (pass.value === confirmPass.value) {
      dataPush()
    } else {
      errShow.value = true
      err.value = 'Password does not match'
    }
  } else {
    errShow.value = true
    err.value = 'Minimum password length is 6'
  }
}
</script>

<style scoped>
.loginForm {
  background-color: #000080;
  width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

.form-input {
  padding: 10px 0;
}

.input-content {
  margin-bottom: 15px;
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #000000;
  font-size: 16px;
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
  color: #61db53;
}
.btn-submit {
  padding: 15px;
  font-size: 18px;
  color: white;
  background-color: #19b108;
  border: 1px solid #000080;
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
