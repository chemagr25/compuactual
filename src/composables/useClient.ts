import { apiResources } from '@/api/apiResources'
import { capitalize, ref } from 'vue'
import type { ClientResponse, Client } from '@/interfaces/client'
import { apiAuth } from '@/api/apiAuth'
import { showToast } from '@/helpers/showToast'

const clients = ref<Client[]>([])

const username = ref<string>('')
const email = ref<string>('')
const name = ref<string>('')
const lastName = ref<string>('')
const phone = ref<string>('')
const totalPages = ref<number>(0)
const page = ref<number>(0)
const hasError = ref<boolean>(false)

const clientById = ref<Client>()

export const useClient = () => {
  const isLoading = ref<boolean>(false)

  const getAllClients = async () => {
    isLoading.value = true

    try {
      const { data } = await apiResources.get<ClientResponse>(
        `/clients?pageSize=10&pageNumber=${page.value}&sortBy=Name`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
      clients.value = data.content
      totalPages.value = data.totalPages
      isLoading.value = false
    } catch {
      isLoading.value = false
    }
  }

  const createClient = async () => {
    isLoading.value = true
    try {
      await apiAuth.post(
        '/registerUser',
        {
          username: capitalize(username.value),
          email: email.value.toLowerCase(),
          name: capitalize(name.value),
          lastName: capitalize(lastName.value),
          phone: phone.value
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
      isLoading.value = false
      await getAllClients()
      showToast('Éxito', 'Cliente creado', 'success')
    } catch {
      isLoading.value = false
      showToast('Error', 'Ocurrió un error, inténtelo nuevamente')
      hasError.value = true
    }
  }

  const getClientById = async (id: string | string[]) => {
    isLoading.value = true
    try {
      const { data } = await apiResources.get<Client>(`/clients/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      })
      clientById.value = data
      isLoading.value = false
    } catch {
      isLoading.value = false
    }
  }

  return {
    createClient,
    username,
    email,
    name,
    lastName,
    phone,
    getAllClients,
    clients,
    isLoading,
    totalPages,
    page,
    hasError,
    getClientById,
    clientById
  }
}
