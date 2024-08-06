<template>
  <v-dialog v-model="showDialog" max-width="600">
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
        <v-btn color="primary" @click="addItem" class="action-button2--text">submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import axiosObj from '@/axios'
import { onMounted, onUpdated, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//Variable Instialization
const route = useRoute()

const emailID = sessionStorage.getItem('email')
const activity_name = ref(''),
  calories_burn = ref(''),
  date = ref(''),
  action = ref('Add'),
  logged = ref(false),
  showDialog = ref(true)

onMounted(() => {
  logged.value = sessionStorage.getItem('logged')
  console.log(emailID)
})

const router = useRouter()
async function addItem() {
  try {
    const response = await axiosObj.post('/postdata', {
      email: emailID,
      activity: activity_name.value,
      calories_burn: calories_burn.value,
      date: date.value
    })
    console.log(response)
  } catch (err) {
    console.log(response)

    alert('Something went wronf')
  }
}
</script>

<style scoped>
.head {
  text-align: center;
  margin-top: 20px;
  color: white;
}

.navy-card {
  background-color: #000080;
  width: 80%;
}
.actions {
  padding: 5%;
}
.action-button1--text {
  color: #000000 !important;
  background-color: azure;
  font-weight: 600;
}
.action-button2--text {
  color: #000000 !important;
  background-color: rgb(78, 255, 101);
  font-weight: 600;
  margin-left: 1%;
}

.white--text {
  color: white !important;
  font-weight: 600;
}

.v-card-title {
  font-size: 24px;
  font-weight: bold;
}

.v-card-text {
  font-size: 18px;
}

.inputForm {
  background-color: #000080;
  width: 400px;
  margin: 20px auto;
  align-self: center;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: white;
}

.form-input {
  padding: 10px 0;
}

.input-field {
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
  color: #7df9ff;
}

.btn-submit {
  padding: 15px;
  font-size: 18px;
  color: white;
  background-color: #19b108;
  border: 1px solid #000080;
  border-radius: 10px;
  cursor: pointer;
  margin-left: 34%;
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

table {
  padding: 40px;
  font-size: 20px;
  margin-top: 10px;
  margin-left: 20%;
  border-collapse: collapse;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

table th {
  padding: 20px;
  color: white;
  background-color: #000080;
  width: fit-content;
  border: 1px solid #7df9ff;
  text-align: center;
}

table td {
  padding: 20px;
  border: 1px solid #000080;
  color: black;
  width: fit-content;
}

.text-field {
  font-size: 40px;
  color: #000080;
}
</style>
