import { apiResources } from '@/api/apiResources'
import { showToast } from '@/helpers/showToast'
import type { Service, ServiceResponse } from '@/interfaces/service'

import { ref } from 'vue'
import { useNotification } from '@/composables/useNotificaction'
import { formToJSON } from 'axios'
import router from '@/router'

const { sendNotification } = useNotification()

const services = ref<Service[]>([])
const totalPages = ref<number>(0)
const page = ref<number>(0)
//data for create service
const brand = ref<string>()

const model = ref<string>()
const serialNumber = ref<string>()
const processor = ref<string>()
const ram = ref<string>()
const storage = ref<string>()
const observations = ref<string>('')
const description = ref<string>()
const idClient = ref<string>()
const idTechnician = ref<string>()
const price = ref<string>()
const observation = ref<string>('')
const isLoading = ref<boolean>(false)

const service = ref<Service>()

//comment

const photoComment = ref<any>(null)
const commentText = ref()

export const useService = () => {
  const hasError = ref<boolean>(false)
  const getAllServices = async () => {
    isLoading.value = true
    try {
      const { data } = await apiResources.get<ServiceResponse>(
        `/services?pageSize=10&pageNumber=${page.value}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
      services.value = data.content
      isLoading.value = false
      totalPages.value = data.totalPages
    } catch {
      isLoading.value = false
      localStorage.removeItem('token_auth')
      localStorage.removeItem('uid')
      localStorage.removeItem('role')
      router.push({name: 'login'})
    }
  }

  const createService = async () => {
    isLoading.value = true
    try {
      const resp = await apiResources.post(
        '/services',
        {
          device: {
            brand: brand.value,
            model: model.value,
            serialNumber: serialNumber.value,
            processor: processor.value,
            ram: ram.value,
            storage: storage.value,
            observations: observations.value
          },

          description: description.value,
          idClient: idClient.value,
          idTechnician: idTechnician.value,
          price: price.value,
          observation: observation.value
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )

      await getAllServices()
      isLoading.value = false
      showToast('Éxito', 'Servicio creado correctamente', 'success')
    } catch {
      showToast('Error', 'Revisa los datos e inténtalo nuevamente')
      isLoading.value = false
      hasError.value = true
    }
  }

  const getServiceById = async (id: string | number | string[]) => {
    isLoading.value = true
    try {
      const { data } = await apiResources.get<Service>(`/services/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      })

      service.value = data
      isLoading.value = false
    } catch {
      isLoading.value = false
    }
  }

  const editStatus = async (newStatus: string, id: number = 0) => {
    try {
      await apiResources.patch(
        `/services/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )

      getServiceById(id)
      showToast('Éxito', 'Se actualizó correctamente', 'success')
      sendNotification(
        `Su servicio ${service.value?.invoice.split('-').join('')} se ha actualizado`,
        `su servicio cambio a ${newStatus}`,
        `${service.value?.client.id}`
      )
    } catch {
      showToast('Error', 'Ocurrió un error, inténtalo nuevamente')
    }
  }

  const sendMessage = async (idService: any, idUser: any) => {
    if (commentText.value.length < 1) return

    const form = new FormData()
    form.append('photo', photoComment.value)
    const photoval = form.get('photo')

    try {
      const { data } = await apiResources.post(
        `/services/${idService}/addComment/${idUser}`,
        {
          photo: photoval,
          comment: commentText.value
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth'),
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      getServiceById(idService)
      showToast('Éxito', 'Comentario creado correctamente', 'success')
      console.log(data)
      commentText.value = ''
      photoComment.value= null
    } catch (e) {
      showToast('Error', 'ocurrió un error, inténtalo nuevamente')
      console.log(e)
    }
  }

  return {
    services,
    getAllServices,
    isLoading,
    totalPages,
    page,
    brand,
    model,
    serialNumber,
    processor,
    ram,
    storage,
    observations,
    description,
    idClient,
    idTechnician,
    price,
    observation,
    createService,
    hasError,
    getServiceById,
    service,
    editStatus,
    sendMessage,
    photoComment,
    commentText
  }
}
