<template>
  <v-app>
    <v-main>
      <v-container class="dashboard">
        <h1>Welcome {{ username }}!!</h1>
        <h2>{{ randomQuote }}</h2>
        <v-card class="target-card">
          <v-card-title>Target</v-card-title>
          <button class="btn-add" v-if="isAddbtnShow" @click="showDialog">Add Target</button>
          <v-card-text>{{ target }}</v-card-text>
        </v-card>

        <v-dialog v-model="isShowDialog" max-width="600">
          <v-card class="navy-card">
            <v-card-title class="white--text">Target Value</v-card-title>

            <v-text-field v-model="targetInput"></v-text-field>
            <v-card-actions class="actions">
              <v-spacer></v-spacer>
              <v-btn color="danger" @click="hideDialog" class="action-button1--text" variant="flat"
                >Cancel</v-btn
              >
              <v-btn color="primary" @click="addTarget" class="action-button2--text"
                >Add Target</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row class="stats-row">
          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Average Calories Burned</v-card-title>
              <v-card-text>{{ averageCalories }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Maximum Activity</v-card-title>
              <v-card-text>{{ favactivity }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Last 15 Days Calories Burned</v-card-title>
              <v-card-text>{{ lastData }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="recent-stats-row">
          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Recent Calories Burned</v-card-title>
              <v-card-text>{{ recentCaloriesBurn }}</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card class="pivot-card">
              <v-card-title>Calories Burnt in Each Activity</v-card-title>
              <v-card-text>
                <table class="pivot-table">
                  <tr>
                    <th>Activity</th>
                    <th>Calories Burned</th>
                  </tr>
                  <tr v-for="(value, key) in pivot_table" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ value }}</td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="stat-card1">
              <v-card-title>Recent Activity</v-card-title>
              <v-card-text>{{ recentActivity }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import axiosObj from '@/axios'
import { onMounted, ref } from 'vue'

const userEmail = ref()
const userdata = ref()
const username = ref()
const randomQuote = ref()
const data = ref(),
  averageCalories = ref(),
  favactivity = ref(),
  pivot_table = ref([]),
  lastData = ref(),
  recentActivity = ref(),
  recentCaloriesBurn = ref(),
  target = ref(),
  isAddbtnShow = ref(false),
  isShowDialog = ref(false),
  targetInput = ref()

const fitnessQuotes = [
  'The only bad workout is the one that didn’t happen.',
  'Push yourself, because no one else is going to do it for you.',
  'Success starts with self-discipline.',
  'Motivation is what gets you started. Habit is what keeps you going.',
  'Don’t limit your challenges. Challenge your limits.',
  'Your body can stand almost anything. It’s your mind that you have to convince.',
  'Do something today that your future self will thank you for.',
  'Train insane or remain the same.'
]

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * fitnessQuotes.length)
  return fitnessQuotes[randomIndex]
}
onMounted(async () => {
  userEmail.value = sessionStorage.getItem('email')
  const response = await axiosObj.get('/', {
    params: {
      email: userEmail.value
    }
  })

  console.log(response.data.data)
  userdata.value = response.data.userData
  username.value = userdata.value.name
  randomQuote.value = getRandomQuote()
  if (!userdata.value.target) {
    target.value = 'No target Added Please add a target'
    isAddbtnShow.value = true
  } else {
    target.value = userdata.value.target
    isAddbtnShow.value = false
  }
  data.value = response.data.data

  kpicaculator(data.value)
})
function showDialog() {
  isShowDialog.value = true
}

function addTarget() {
  const response = axiosObj.post('/addTarget', {
    target: targetInput.value,
    email: userEmail.value
  })
  target.value = targetInput.value
  isAddbtnShow.value = false
  isShowDialog.value = false
}
function kpicaculator(data) {
  let totalCalories = 0
  let activityCounts = {}
  let maxCalories = 0

  //Calculation of Average Calories
  data.forEach((entry) => {
    totalCalories += entry.calories_burn

    if (activityCounts[entry.activity]) {
      activityCounts[entry.activity]++
    } else {
      activityCounts[entry.activity] = 1
    }
    if (entry.calories_burn > maxCalories) {
      maxCalories = entry.calories_burn
    }
  })
  averageCalories.value = totalCalories / data.length

  //Calulation of Favraoutie activity
  let maxActivity = ''
  let maxActivityCount = 0
  for (const [activity, count] of Object.entries(activityCounts)) {
    if (count > maxActivityCount) {
      maxActivityCount = count
      maxActivity = activity
    }
  }
  favactivity.value = maxActivity

  //Calculation of Pivot table
  const activityCalories = {}
  data.forEach(({ activity, calories_burn }) => {
    activityCalories[activity] = (activityCalories[activity] || 0) + calories_burn
  })
  pivot_table.value = activityCalories

  //Last 15 days calculation
  const now = new Date()
  const date = new Date(now)
  date.setDate(date.getDate() - 15)
  const last15DaysData = data.filter((entry) => new Date(entry.created_at) >= date)
  lastData.value = last15DaysData.reduce((sum, entry) => sum + entry.calories_burn, 0)

  if (data.length > 0) {
    const recentEntry = data[data.length - 1]
    recentCaloriesBurn.value = recentEntry.calories_burn
    recentActivity.value = recentEntry.activity
  }
}
</script>

<style scoped>
.dashboard {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
}

h1,
h2 {
  color: #1f3b73;
  margin-bottom: 20px;
}
.navy-card {
  background-color: navy;
  color: white;
  padding: 20px;
}

.target-card {
  text-align: center;
  padding: 20px;
  width: 20%;
  margin-left: 80%;
  margin-top: -100px;
  margin-bottom: 50px;
  background-color: #0070ff;
  color: white;
}

.btn-add {
  background-color: rebeccapurple;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  color: white;
}
.stats-row {
  margin-bottom: 20px;
}

.stat-card {
  text-align: center;
  padding: 20px;
  background-color: #1f3b73;
  color: white;
}

.stat-card1 {
  text-align: center;
  padding: 20px;
  margin-top: -35%;
  background-color: #1f3b73;
  color: white;
}

.pivot-card {
  padding: 20px;
  width: 100%;
  background-color: #0070ff;
  color: white;
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
}

.pivot-table th {
  background-color: #1f3b73;
}

.pivot-table tr:nth-child(even) {
  background-color: #1f3b73;
}

.pivot-table tr:nth-child(odd) {
  background-color: #0070ff;
}

.pivot-table tr:hover {
  background-color: #005bb5;
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
