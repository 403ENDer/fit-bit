<template>
  <v-container>
    <h1>History of Logs</h1>
    <form @submit.prevent="searchByDate">
      <label class="date-head">Start Date: </label>
      <input type="date" id="start_date" class="date-input" v-model="start_date" />
      <label class="date-head">End Date: </label>
      <input type="date" id="end_date" class="date-input" v-model="end_date" />
      <button type="submit" class="btn-submit"><v-icon>mdi-magnify</v-icon>Search</button>
    </form>
    <button class="btn-add" @click="addData"><v-icon>mdi-bookmark-plus</v-icon>Add Log</button>

    <v-dialog v-model="isShowDialog" max-width="600">
      <v-card class="navy-card">
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

    <div class="grid-container">
      <div v-for="item in data" :key="item.id" class="activity-item">
        <p>Activity Name: {{ item.activity }}</p>
        <p>Calories Burned: {{ item.calories_burn }}</p>
        <p>Date: {{ formatDate(item.created_at) }}</p>
        <button class="btn-update" @click="updateData(item)">
          <v-icon>mdi-pencil</v-icon>Update
        </button>
        <button class="btn-delte" @click="deleteData(item)">
          <v-icon>mdi-delete</v-icon>Delete
        </button>
        <br />
      </div>
    </div>
  </v-container>
</template>

<script setup>
import axiosObj from '@/axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const data = ref([])
const start_date = ref('')
const end_date = ref('')
const isShowDialog = ref(false)
const email = ref()
const updateId = ref()
const activity_name = ref(''),
  calories_burn = ref(''),
  date = ref(''),
  action = ref('Add')

const router = useRoute()

onMounted(async () => {
  email.value = sessionStorage.getItem('email')
  const response = await axiosObj.get('/', {
    params: {
      email: email.value
    }
  })
  data.value = response.data.data
  console.log(response.data.data)
})

async function searchByDate() {
  const email = sessionStorage.getItem('email')
  const response = await axiosObj.get('/searchBydate', {
    params: {
      email: email,
      start_date: start_date.value,
      end_date: end_date.value
    }
  })

  data.value = response.data
  console.log(response)
}
function addData() {
  action.value = 'add'
  isShowDialog.value = true
}
function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString()
}

async function addItem() {
  try {
    if (action.value === 'add') {
      const response = await axiosObj.post('/postdata', {
        email: email.value,
        activity: activity_name.value,
        calories_burn: calories_burn.value,
        date: date.value
      })
      data.value.push({
        activity: activity_name.value,
        calories_burn: calories_burn.value,
        date: date.value
      })
    } else if (action.value === 'update') {
      const response = await axiosObj.put('/putdata', {
        id: updateId.value,
        email: email.value,
        activity: activity_name.value,
        calories_burn: calories_burn.value,
        date: date.value
      })

      const index = data.value.findIndex((value) => value.id === updateId.value)
      if (index !== -1) {
        data.value[index] = {
          id: updateId.value,
          email: email.value,
          activity: activity_name.value,
          calories_burn: calories_burn.value,
          date: date.value
        }
      }
    } else if (action.value === 'delete') {
      const response = await axiosObj.delete('/deletedata', {
        params: {
          id: updateId.value
        }
      })
      const index = data.value.findIndex((value) => value.id === updateId.value)
      data.value.splice(index, 1)
    }
    isShowDialog.value = false
  } catch (err) {
    console.log(err)

    alert('Something went wrong')
  }
}
function hideDialog() {
  isShowDialog.value = false
}

function updateData(item) {
  console.log(item.id)
  action.value = 'update'
  updateId.value = item.id
  activity_name.value = item.activity
  calories_burn.value = item.calories_burn
  date.value = formatDate(item.created_at)
  isShowDialog.value = true
}

function deleteData(item) {
  console.log(item.id)
  action.value = 'delete'
  updateId.value = item.id
  activity_name.value = item.activity
  calories_burn.value = item.calories_burn
  date.value = formatDate(item.created_at)
  isShowDialog.value = true
}
</script>

<style scoped>
h1,
h2 {
  color: #1f3b73;
  margin-bottom: 20px;
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

.btn-submit {
  margin-left: 15px;
  background-color: rebeccapurple;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
}

.btn-add {
  margin-left: 55%;
  background-color: rebeccapurple;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
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
