<template>
  <v-app v-if="logged">
    <v-main>
      <v-container class="dashboard">
        <v-row>
          <v-col cols="10" md="5">
            <h1>Welcome {{ username }}!!</h1>
            <h2>{{ randomQuote }}</h2>
          </v-col>
          <v-col>
            <v-card-text class="target-card1">
              <v-sheet color="#000080" class="target-sheet">
                <div class="text-h5 font-weight-strong">Progress of Last 15 days</div>

                <v-row>
                  <v-col cols="1">
                    <div v-for="value in y_axis" :key="value">{{ value }} <br /></div>
                  </v-col>
                  <v-col cols="11">
                    <v-sparkline
                      :model-value="dataof15"
                      color="white"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                    </v-sparkline>
                  </v-col>
                </v-row>
                <v-card-text>
                  <v-row class="justify-space-around">
                    <v-col v-for="day in dayof15" :key="day" class="text-center">
                      {{ day }}
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-sheet>
            </v-card-text>
          </v-col>
          <v-col>
            <v-card class="target-card">
              <v-card-title>Target calories to burn:{{ target }} cl</v-card-title>
              <v-progress-circular
                :model-value="targetPercent"
                style="margin-bottom: 20px"
                :rotate="360"
                :size="110"
                :width="15"
                color="white"
              >
                <template v-slot:default class="card-text"> {{ targetPercent }} % </template>
              </v-progress-circular>
              <button class="btn-add" v-if="isAddbtnShow" @click="showDialog">Add Target</button>
            </v-card>

            <v-dialog v-model="isShowDialog" max-width="600">
              <v-card class="navy-card">
                <v-card-title class="white--text">Target Value</v-card-title>

                <v-text-field v-model="targetInput"></v-text-field>
                <v-card-actions class="actions">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="danger"
                    @click="hideDialog"
                    class="action-button1--text"
                    variant="flat"
                    >Cancel</v-btn
                  >
                  <v-btn color="primary" @click="addTarget" class="action-button2--text"
                    >Add Target</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row class="stats-row">
          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Average Calories Burned</v-card-title>
              <v-card-text class="card-text">{{ averageCalories }} cal</v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Maximum Activity</v-card-title>
              <v-card-text class="card-text">{{ favactivity }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Last 15 Days Calories Burned</v-card-title>
              <v-card-text class="card-text">{{ lastData }} cal</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="recent-stats-row">
          <v-col cols="12" md="4">
            <v-card class="stat-card">
              <v-card-title>Recent Calories Burned</v-card-title>
              <v-card-text class="card-text">{{ recentCaloriesBurn }} cal</v-card-text>
            </v-card>
            <v-card class="stat-card" style="margin-top: 20px">
              <v-card-title>Recent Activity</v-card-title>
              <v-card-text class="card-text">{{ recentActivity }}</v-card-text>
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
                    <td>{{ value }} cal</td>
                  </tr>
                </table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <div v-else>
    <LoginAlert />
  </div>
</template>

<script setup>
import axiosObj from '@/axios'
import { compile, computed, onMounted, ref } from 'vue'
import LoginAlert from '@/components/LoginAlert.vue'

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
  targetInput = ref(),
  targetPercent = ref(),
  last15DaysData = ref(),
  logged = ref(),
  y_axis = ref([])

const dataof15 = computed(() => {
  if (last15DaysData.value) {
    const data = last15DaysData.value.map((item) => item.calories_burn)
    y_axis.value = new Set(data.sort().reverse())
    return last15DaysData.value.map((item) => item.calories_burn)
  } else {
    return [230, 240, 239, 250, 290]
  }
})

const dayof15 = computed(() => {
  if (last15DaysData.value) {
    return last15DaysData.value.map((item) => formatDateToDMY(item.created_at)).sort()
  } else {
    return [230, 240, 239, 250, 290]
  }
})
const fitnessQuotes = [
  'The only bad workout is the one that didn’t happen.',
  'Push yourself, because no one else is going to do it for you.',
  'Motivation is what gets you started. Habit is what keeps you going.',
  'Your body can stand almost anything. It’s your mind that you have to convince.',
  'Do something today that your future self will thank you for.'
]

function formatDateToDMY(dateString) {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${day}/${month}/${year}`
}

const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * fitnessQuotes.length)
  return fitnessQuotes[randomIndex]
}
onMounted(async () => {
  userEmail.value = sessionStorage.getItem('email')
  logged.value = sessionStorage.getItem('logged')
  const response = await axiosObj.get('/', {
    params: {
      email: userEmail.value,
      page: 1
    }
  })
  console.log(response)
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
  data.value = response.data.data.data

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

  //Average Calories
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
  averageCalories.value = Math.round(totalCalories / data.length)

  //Fav Activity
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
  last15DaysData.value = data.filter((entry) => new Date(entry.created_at) >= date)
  lastData.value = last15DaysData.value.reduce((sum, entry) => sum + entry.calories_burn, 0)
  if (target.value) {
    targetPercent.value = parseFloat(((lastData.value / target.value) * 100).toFixed(2))
  }

  if (data.length > 0) {
    const recentEntry = data[data.length - 1]
    recentCaloriesBurn.value = recentEntry.calories_burn
    recentActivity.value = recentEntry.activity
  }
  console.log(last15DaysData.value)
}
</script>

<style scoped>
.dashboard {
  margin-top: 30px;
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

.target-card,
.target-card1 {
  text-align: center;
  padding: 20px;
  height: fit-content;
  width: fit-content;
  background-color: navy;
  color: white;
  box-shadow: 5px 6px 5px rgb(119, 116, 116);
  border-radius: 10px;
  font-weight: 900;
  opacity: 0;
  animation: fadeIn 0.6s both;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5%;
  }
  100% {
    opacity: 1;
  }
}

.target-card1 {
  border-radius: 5px;
}

.target-card:hover,
.target-card1:hover,
.target-sheet:hover {
  background-color: #0070ff;
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
  background-color: navy;
  border-radius: 10px;
  color: white;
  box-shadow: 5px 6px 5px rgb(119, 116, 116);
  font-weight: 600;
  opacity: 0;
  animation: fadeIn 0.6s both;
}

.stat-card:hover {
  background-color: #0070ff;
}

.card-text {
  font-weight: 900;
  font-size: 22px;
}
.stat-card1 {
  text-align: center;
  padding: 20px;
  margin-top: -35%;
  background-color: nacy;
  color: white;
  box-shadow: 5px 6px 5px rgb(119, 116, 116);
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
