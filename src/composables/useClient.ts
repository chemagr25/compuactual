import { apiResources } from '@/api/apiResources'
import { ref } from 'vue'
import type { ClientResponse, Client } from '@/interfaces/client'

const clients = ref<Client[]>([])
const isLoading = ref<boolean>(false)

export const useClient = () => {
  const getAllClients = async () => {
    isLoading.value = true

try {
    const { data } = await apiResources.get<ClientResponse>(
        '/clients?pageSize=10&pageNumber=0&sortBy=id',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
      clients.value = data.content
      isLoading.value = false
}catch {
    isLoading.value = false

}






  }

  return {
    getAllClients,
    clients,
    isLoading
  }
}
