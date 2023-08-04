import { apiResources } from '@/api/apiResources'
import type { Service, ServiceResponse } from '@/interfaces/service'
import { ref, onMounted } from 'vue'

const services = ref<Service[]>([])
const isLoading = ref<boolean>(false)

export const useService = () => {
  const getAllServices = async () => {
    isLoading.value = true
    try {
      const { data } = await apiResources.get<ServiceResponse>(
        '/services?pageSize=10&pageNumber=0&sortBy=id',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
      services.value = data.content
      isLoading.value = false
    } catch {
      isLoading.value = false
    }
  }

  return {
    services,
    getAllServices,
    isLoading
  }
}
