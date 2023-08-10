import { apiResources } from '@/api/apiResources'
import { showToast } from '@/helpers/showToast'
import type { Service, ServiceResponse } from '@/interfaces/service'
import { ref } from 'vue'

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
const observations = ref<string>()
const description = ref<string>()
const idClient = ref<string>()
const idTechnician = ref<string>()
const price = ref<string>()
const observation = ref<string>('observacion del servicio')

const serviceById = ref<Service>()

export const useService = () => {
  const hasError = ref<boolean>(false)
  const isLoading = ref<boolean>(false)
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

  const getServiceById = async (id: string | string[]) => {
    isLoading.value = true
    try {
      const { data } = await apiResources.get<Service>(`/services/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      })

      serviceById.value = data
      isLoading.value = false
    } catch {
      isLoading.value = false
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
    serviceById
  }
}
