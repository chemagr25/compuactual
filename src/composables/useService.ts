import { apiResources } from '@/api/apiResources'
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
const idClient =ref<string>()
const idTechnician =ref<string>()
const price =ref<string>()
const observation =ref<string>('observacion del servicio')

export const useService = () => {
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



  const createService = () => {
    console.log(
      brand.value,
      model.value,
      serialNumber.value,
      processor.value,
      ram.value,
      storage.value,
      observations.value,
      description.value,
      idClient.value,
      idTechnician.value,
      price.value,
      observation.value,
    )
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
    createService
  }
}
