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

  const getData = async (email: string, pageno: number) => {
    try {
      const response = await axiosObj.get('/', {
        params: {
          email: email,
          page: pageno
        }
      })
      data.value = response.data.data
      console.log(response)
      return { status: 1, data: data.value }
    } catch (err) {
      console.log(err)
      return { status: 0, data: err }
    }
  }

  const addData = async (req: any) => {
    try {
      const response = await axiosObj.post('/postdata', {
        email: req.email,
        activity: req.activity_name,
        calories_burn: req.calories_burn,
        created_at: req.date
      })
      data.value = response.data.data
      return { status: 1, data: data.value }
    } catch (err) {
      return { status: 0, data: err }
    }
  }

  const deleteData = async (req: any) => {
    try {
      const response = await axiosObj.delete('/deletedata', {
        params: {
          id: req.id,
          email: req.email
        }
      })
      const index = data.value.findIndex((value) => value.id === req.id)
      data.value = response.data.data
      return { status: 1, data: data.value }
    } catch (err) {
      return { status: 0, data: err }
    }
  }

  const updateData = async (req: any) => {
    try {
      const response = await axiosObj.put('/putdata', {
        id: req.id,
        email: req.email,
        activity: req.activity_name,
        calories_burn: req.calories_burn,
        created_at: req.created_at
      })

      data.value = response.data.data
      return { status: 1, data: data.value }
    } catch (err) {
      return { status: 0, data: err }
    }
  }

  const updateAge = async (req: any) => {
    try {
      const response = await axiosObj.put('/ageUpdate', {
        email: req.email,
        age: req.age
      })
      return { status: 1, data: response }
    } catch (err) {
      return { status: 0, data: err }
    }
  }

  const updatePass = async (req: any) => {
    try {
      const response = await axiosObj.put('/passUpdate', {
        email: req.email,
        oldPass: req.oldPass,
        newPass: req.newPass
      })
      return { status: 1, data: response }
    } catch (err) {
      return { status: 0, data: err }
    }
  }
  return {
    data,
    addData,
    getData,
    updateData,
    deleteData,
    updateAge,
    updatePass
  }
})

export default LogStore
