<template>
  <v-container v-if="logged">
    <div class="main-container">
      <div class="history-head">
        <h1>History of Logs</h1>
        <form @submit.prevent="searchByDate">
          <label class="date-head">Start Date: </label>
          <input type="date" id="start_date" class="date-input" v-model="start_date" />
          <label class="date-head">End Date: </label>
          <input type="date" id="end_date" class="date-input" v-model="end_date" />
          <button type="submit" class="btn-submit"><v-icon>mdi-magnify</v-icon>Search</button>
        </form>
        <form>
          <v-select :items="type_unique" v-model="type_val" class="text-field"></v-select>
        </form>
        <button class="btn-get" @click="getData"><v-icon>mdi-refresh</v-icon>Refresh</button>
        <button class="btn-add" @click="addData"><v-icon>mdi-bookmark-plus</v-icon>Add Log</button>
      </div>
      <div class="content">
        <v-dialog v-model="isShowDialog" max-width="600">
          <v-card class="navy-card" v-bind:style="{ backgroundColor: bg }">
            <v-card-title class="white--text">{{ action }} the details</v-card-title>
            <v-card-text>
              <v-row dense class="mb-3">
                <v-col cols="12">
                  <v-text class="white--text">Activity Name </v-text>
                  <v-text-field v-model="activity_name"></v-text-field>
                </v-col>
              </v-row>
              <v-row dense class="mb-3">
                <v-col cols="12">
                  <v-text class="white--text">Calories Burn:</v-text>
                  <v-text-field v-model="calories_burn"> </v-text-field>
                </v-col>
              </v-row>
              <v-row dense class="mb-3">
                <v-col cols="12">
                  <v-text class="white--text">Date:</v-text>
                  <v-text-field type="date" v-model="date"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="actions">
              <v-spacer></v-spacer>
              <v-btn color="danger" @click="hideDialog" class="action-button1--text" variant="flat"
                >Cancel</v-btn
              >
              <v-btn color="primary" @click="addItem" class="action-button2--text"
                >{{ action }} data</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <br />
        <br />

        <div class="grid-container" v-if="filteredData.length !== 0">
          <div v-for="item in filteredData" :key="item.id" class="activity-item">
            <p>Activity Name: {{ item.activity }}</p>
            <p>Calories Burned: {{ item.calories_burn }}</p>
            <p>Date: {{ formatDateToDMY(item.created_at) }}</p>
            <button class="btn-update" @click="updateData(item)">
              <v-icon>mdi-pencil</v-icon>Update
            </button>
            <button class="btn-delte" @click="deleteData(item)">
              <v-icon>mdi-delete</v-icon>Delete
            </button>
            <br />
          </div>
        </div>
        <div v-else>
          <h1>No data Found</h1>
        </div>
      </div>
    </div>
  </v-container>
  <div v-else>
    <LoginAlert />
  </div>
</template>

<script setup>
import axiosObj from '@/axios'
import { computed, onMounted, ref } from 'vue'
import LogStore from '@/stores/LogDetail'
import LoginAlert from '@/components/LoginAlert.vue'

const data = ref([])
const start_date = ref('')
const end_date = ref('')
const isShowDialog = ref(false)
const email = ref()
const updateId = ref()
const activity_name = ref('')
const calories_burn = ref('')
const date = ref('')
const action = ref('Add')
const type_val = ref('Select Activity')
const storeObj = LogStore()
const logged = ref()
const bg = ref()

onMounted(async () => {
  logged.value = sessionStorage.getItem('logged')
  email.value = sessionStorage.getItem('email')
  const result = await storeObj.getData(email.value)
  if (result.status) {
    data.value = result.data
  } else {
    alert(result.data.response.data.error.messages.errors[0].message)
  }
})

//Data Filtering based on type
const filteredData = computed(() => {
  if (data.value.length !== 0) {
    if (type_val.value === 'Select Activity' || !type_val.value) {
      return data.value
    }
    return data.value.filter((item) => item.activity === type_val.value)
  } else {
    return ''
  }
})

const type_unique = computed(() => {
  if (filteredData.value.length !== 0) {
    return [...new Set(data.value.map((item) => item.activity))].sort()
  } else {
    return ''
  }
})

//Date based Search
async function searchByDate() {
  const email = sessionStorage.getItem('email')
  try {
    const endDate = end_date.value || formatDateToYMD(new Date())
    const response = await axiosObj.get('/searchBydate', {
      params: {
        email: email,
        start: start_date.value,
        end: endDate
      }
    })
    if (response.data.length === 0) {
      data.value = ''
    } else {
      data.value = response.data
    }
  } catch (err) {
    data.value = err.response.data.data
    if (err.response.status === 400) {
      alert(err.response.data.error)
    } else if (err.response.status === 401) {
      alert(err.response.data.error.messages.errors[0].message)
    }
  }
}

//Feature - Get data,Add data,Update data,Delete data
async function getData() {
  const result = await storeObj.getData(email.value)
  if (result.status) {
    data.value = result.data
    type_val.value = 'Select Activity'
    start_date.value = ''
    end_date.value = ''
  } else {
    alert(result.data.response.data.error.messages.errors[0].message)
  }
}

async function addItem() {
  try {
    if (action.value === 'add') {
      const result = await storeObj.addData(
        email.value,
        activity_name.value,
        calories_burn.value,
        date.value
      )
      if (result.status) {
        alert('Data added successfully')
        data.value = result.data
      } else {
        alert(result.data.response.data.error.messages.errors[0].message)
      }
    } else if (action.value === 'update') {
      const result = await storeObj.updateData(
        updateId.value,
        email.value,
        activity_name.value,
        calories_burn.value,
        date.value
      )
      if (result.status) {
        alert('Data updated successfully')
        data.value = result.data
      } else {
        alert(result.data.response.data.error.messages.errors[0].message)
      }
    } else if (action.value === 'delete') {
      const result = await storeObj.deleteData(updateId.value, email.value)
      if (result.status) {
        alert('Data deleted successfully')
        data.value = result.data
      } else {
        alert(result.data.response.data.error.messages.errors[0].message)
      }
    }
    isShowDialog.value = false
  } catch (err) {
    console.log(err)
    alert('Something went wrong')
  }
}

//Function call
function addData() {
  bg.value = 'navy'

  action.value = 'add'
  isShowDialog.value = true
  activity_name.value = ''
  calories_burn.value = ''
  date.value = ''
}

function updateData(item) {
  bg.value = 'navy'
  action.value = 'update'
  updateId.value = item.id
  activity_name.value = item.activity
  calories_burn.value = item.calories_burn
  date.value = formatDateToYMD(item.created_at)
  isShowDialog.value = true
}

function deleteData(item) {
  bg.value = 'rgb(246, 79, 79)'
  action.value = 'delete'
  updateId.value = item.id
  activity_name.value = item.activity
  calories_burn.value = item.calories_burn
  date.value = formatDateToYMD(item.created_at)
  isShowDialog.value = true
}

//Date Conversion
function formatDateToDMY(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${day}-${month}-${year}`
}

function formatDateToYMD(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

//Dialog Handling
function hideDialog() {
  isShowDialog.value = false
}
</script>

<style scoped>
h1,
h2 {
  color: #1f3b73;
  margin-bottom: 20px;
  /* color: rgb(246, 79, 79); */
}
.text-field {
  margin: 5px;
  width: fit-content;
  font-weight: 600;
}
.main-container {
  display: flex;
  flex-direction: column;
}

.history-head {
  background-color: #e3e3e3;
  padding: 1rem;
  top: 0;
  z-index: 1;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.activity-item {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  background: #1f3b73;
  color: white;
}

.date-head {
  margin-left: 10px;
  color: navy;
}

.date-input {
  border: 1px solid navy;
  padding: 3px;
  color: navy;
}

.btn-submit,
.btn-add,
.btn-get {
  background-color: rebeccapurple;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
}
.btn-submit {
  margin-left: 15px;
}
.btn-add {
  margin-left: 3px;
}

.btn-get {
  margin-top: 2px;
}

.btn-update {
  margin-top: 5px;
  background-color: rebeccapurple;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
}

.btn-delte {
  margin-top: 5px;
  margin-left: 10px;
  background-color: rgb(214, 80, 98);
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
}

.navy-card {
  background-color: navy;
  color: white;
}

.white--text {
  color: white !important;
}

.actions .v-btn {
  color: navy;
}

.action-button1--text {
  color: red !important;
}

.action-button2--text {
  background-color: greenyellow !important;
  color: electricblue;
}
</style>
