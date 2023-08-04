import { apiResources } from '@/api/apiResources'
import type { TechResponse, Technician } from '@/interfaces/tech'
import { ref } from 'vue'

const technicians = ref<Technician[]>()
const isLoading = ref<boolean>()

export const useTech = () => {


  const getAllTechs = async () => {
    isLoading.value = true

    const { data } = await apiResources.get<TechResponse>('/technicians?pageSize=10&pageNumber=0&sortBy=name', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token_auth')
      }
    })

    technicians.value = data.content
    isLoading.value = false

  }


  return {
    isLoading,
    getAllTechs,
    technicians
  }
}
