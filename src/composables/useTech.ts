import { apiAuth } from '@/api/apiAuth'
import { apiResources } from '@/api/apiResources'
import { capitalize } from '@/helpers/capitalizestr'
import { showToast } from '@/helpers/showToast'
import type { TechResponse, Technician } from '@/interfaces/tech'
import { ref } from 'vue'

const technicians = ref<Technician[]>()
const page = ref<number>(0)
const hasError = ref<boolean>(false)
const username = ref<string>('')
const email = ref<string>('')
const name = ref<string>('')
const lastName = ref<string>('')
const phone = ref<string>('')
const password = ref<string>('')
const totalPages = ref<number>(0)

const techById = ref<Technician>()

export const useTech = () => {
  const isLoading = ref<boolean>(false)

  const getAllTechs = async () => {
    isLoading.value = true
    try {
      const { data } = await apiResources.get<TechResponse>(
        `/technicians?pageSize=10&pageNumber=${page.value}&sortBy=name`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
      technicians.value = data.content
      totalPages.value = data.totalPages
      isLoading.value = false
    } catch {
      isLoading.value = false
    }
  }

  const createTech = async () => {
    isLoading.value = true
    try {
      await apiAuth.post(
        '/registerTechnician',
        {
          username: username.value.toLocaleLowerCase(),
          email: email.value,
          name: capitalize(name.value),
          lastName: capitalize(lastName.value),
          phone: phone.value,
          password: password.value
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
      isLoading.value = false
      hasError.value = false
      await getAllTechs()
      showToast('Exito', 'Técnico creado con éxito', 'success')
    } catch {
      hasError.value = true
      isLoading.value = false
      showToast('Error', 'Ocurrió un error, inténtelo nuevamente')
    }
  }

  const getTechById = async (id: string | string[]) => {
    isLoading.value = true
    try {
      const { data } = await apiResources.get<Technician>(`technicians/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      })

      techById.value = data
      isLoading.value = false
    } catch {
      isLoading.value = false
    }
  }

  return {
    page,
    totalPages,
    isLoading,
    hasError,
    getAllTechs,
    technicians,
    username,
    email,
    name,
    lastName,
    phone,
    password,
    createTech,
    getTechById,
    techById
  }
}
