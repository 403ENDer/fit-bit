import { defineStore } from 'pinia'
import { ref } from 'vue'
import axiosObj from '@/axios'
interface LogInt {
  id: number
  email: string
  activity_name: string
  calories_burn: number
  date: Date
}
const LogStore = defineStore('logstore', () => {
  const data = ref<LogInt[]>([])

  const getData = async (email: string) => {
    try {
      const response = await axiosObj.get('/', {
        params: {
          email: email
        }
      })
      data.value = response.data.data
      return { status: 1, data: data.value }
    } catch (err) {
      console.log(err)
      return { status: 0, data: err }
    }
  }

  const addData = async (
    email: string,
    activity_name: string,
    calories_burn: number,
    date: Date
  ) => {
    try {
      const response = await axiosObj.post('/postdata', {
        email: email,
        activity: activity_name,
        calories_burn: calories_burn,
        date: date
      })
      data.value = response.data.data
      return { status: 1, data: data.value }
    } catch (err) {
      return { status: 0, data: err }
    }
  }

  const deleteData = async (id: number, email: string) => {
    try {
      const response = await axiosObj.delete('/deletedata', {
        params: {
          id: id,
          email: email
        }
      })
      const index = data.value.findIndex((value) => value.id === id)
      data.value = response.data.data
      return { status: 1, data: data.value }
    } catch (err) {
      return { status: 0, data: err }
    }
  }

  const updateData = async (
    id: number,
    email: any,
    activity_name: string,
    calories_burn: number,
    date: Date
  ) => {
    try {
      const response = await axiosObj.put('/putdata', {
        id: id,
        email: email,
        activity: activity_name,
        calories_burn: calories_burn,
        date: date
      })

      data.value = response.data.data
      return { status: 1, data: data.value }
    } catch (err) {
      return { status: 0, data: err }
    }
  }

  return {
    data,
    addData,
    getData,
    updateData,
    deleteData
  }
})

export default LogStore
