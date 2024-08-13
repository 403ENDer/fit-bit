<template>
  <div v-if="logged">
    <v-card class="pivot-card">
      <h1>Profile page</h1>
      <v-card-text>
        <table class="pivot-table">
          <tr v-for="(value, key) in data" :key="key">
            <td>{{ key }}</td>
            <td>{{ value }}</td>
          </tr>
        </table>
      </v-card-text>

      <button class="btn-update" @click="ageUpdateDialog">
        <v-icon>mdi-pencil</v-icon>Update age
      </button>
      <button class="btn-update" @click="passUpdateDialog">
        <v-icon>mdi-pencil</v-icon>Change Password
      </button>
    </v-card>
    <v-dialog v-model="isShowAgeDialog" width="500">
      <v-card class="navy-card">
        <v-card-title>Age Update</v-card-title>
        <v-text-field type="number" v-model="age" class="input-field"></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <h1></h1>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-card-actions class="actions" max-width="600">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="hideDialog" class="action-button1--text" variant="flat"
            >Cancel</v-btn
          >
          <v-btn color="primary" @click="updateAge" class="action-button2--text" variant="flat"
            >Update age</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isShowPassDialog" width="500">
      <v-card class="navy-card">
        <v-card-title>Change Password</v-card-title>
        <v-card-text>Old Password</v-card-text>
        <v-text-field type="password" v-model="oldPass" class="input-field" required></v-text-field>
        <v-card-text>New Password</v-card-text>
        <v-text-field type="password" v-model="newPass" class="input-field" required>
        </v-text-field>
        <v-card-text>Re enter new Password</v-card-text>
        <v-text-field
          type="password"
          v-model="reNewPass"
          class="input-field"
          required
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <h1></h1>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-card-actions class="actions" max-width="600">
          <v-spacer></v-spacer>
          <v-btn color="danger" @click="hideDialog" class="action-button1--text" variant="flat"
            >Cancel</v-btn
          >
          <v-btn color="primary" @click="updatePass" class="action-button2--text" variant="flat"
            >Update age</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <LoginAlert />
  </div>
</template>
<script setup>
import axiosObj from '@/axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import LogStore from '@/stores/LogDetail'
import LoginAlert from '@/components/LoginAlert.vue'

const data = ref()
const email = ref()
const logged = ref()
const isShowAgeDialog = ref(false)
const isShowPassDialog = ref(false)
const age = ref()
const oldPass = ref()
const newPass = ref()
const reNewPass = ref()

const store = new LogStore()
onMounted(async () => {
  const token = localStorage.getItem('token')
  console.log(token)
  logged.value = sessionStorage.getItem('logged')
  email.value = sessionStorage.getItem('email')
  try {
    const response = await axiosObj.get('/', {
      params: {
        email: email.value,
        page: 1
      }
    })

    data.value = response.data.userData
  } catch (err) {
    console.log(err)
  }
})

function ageUpdateDialog() {
  isShowAgeDialog.value = true
}

function passUpdateDialog() {
  isShowPassDialog.value = true
}

async function updateAge() {
  try {
    const response = await store.updateAge({ age: age.value, email: email.value })
    if (response.status === 1) {
      data.value = response.data.data
      isShowAgeDialog.value = false
      age.value = ''
    } else {
      alert(response.data.response.data.messages.errors[0].message)
    }
  } catch (error) {
    console.log(error)
    alert(error)
  }
}

async function updatePass(params) {
  if (newPass.value === reNewPass.value) {
    try {
      const response = await store.updatePass({
        oldPass: oldPass.value,
        newPass: newPass.value,
        email: email.value
      })
      console.log(response)
      if (response.status === 1) {
        data.value = response.data.data
        isShowPassDialog.value = false
        oldPass.value = ''
        newPass.value = ''
        reNewPass.value = ''
        alert(response.data.data.message)
      } else {
        console.log(response)
        if (response.data.response.status === 401) {
          alert(response.data.response.data.message)
        } else {
          alert(response.data.response.data.messages.errors[0].message)
        }
      }
    } catch (error) {
      alert(error)
    }
  } else {
    alert('New Password does match with the confrim password')
  }
}
function hideDialog() {
  isShowAgeDialog.value = false
  isShowPassDialog.value = false
}
</script>

<style scoped>
.table-view {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 5px 8px 5px black;
  border-radius: 10px;
}

.table-view th,
.table-view td {
  border: 1px solid #000;
  text-align: center;
  padding: 10px;
  color: white;
  font-weight: 600;
  font-size: 20px;
}

.table-view th {
  background-color: navy;
}

.table-view tr:nth-child(even) {
  background-color: #0070ff;
}

.table-view tr:nth-child(odd) {
  background-color: navy;
}

.table-view tr:hover {
  background-color: #005bb5;
}

.btn-update {
  margin: 20px;
  background-color: rgb(6, 154, 90);
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  color: white;
  box-shadow: 4px 5px 5px rgb(119, 116, 116);
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.btn-update:hover {
  background-color: rgb(135, 54, 216);
  box-shadow: 4px 5px 5px rgb(119, 116, 116);
}

.navy-card {
  background-color: navy;
  color: white;
  padding: 10px;
  font-weight: 900;
  font-size: 18px;
}

.input-field {
  padding: 0px 10px;
}

.action-button1--text {
  color: white !important;
  background-color: red !important;
}

.action-button2--text {
  background-color: rgb(0, 159, 103) !important;
  color: electricblue;
}

.pivot-card {
  padding: 20px;
  width: 100%;
  background-color: #0070ff;
  color: white;
  box-shadow: 5px 6px 5px rgb(119, 116, 116);
  border-radius: 10px;
  font-weight: 900;
  font-size: 20px;
  opacity: 0;
  animation: fadeIn 0.6s both;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.pivot-table {
  width: 100%;
  border-collapse: collapse;
}

.pivot-table th,
.pivot-table td {
  border: 1px solid #000;
  text-align: center;
  padding: 10px;
  color: white;
  font-weight: 600;
  font-size: 20px;
}

.pivot-table th {
  background-color: navy;
}

.pivot-table tr:nth-child(even) {
  background-color: #0070ff;
}

.pivot-table tr:nth-child(odd) {
  background-color: navy;
}

.pivot-table tr:hover {
  background-color: #005bb5;
}
</style>
