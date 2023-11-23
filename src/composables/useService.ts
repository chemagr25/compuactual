import { apiResources } from '@/api/apiResources'
import { showToast } from '@/helpers/showToast'
import { type Service, type ServiceResponse } from '@/interfaces/service'
import { type Device, type Part } from '@/interfaces/device'


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

const totalPartsPrice = ref<number>(0)

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
const loadingComment = ref<boolean>(false)
const idDevice = ref<number>(0)

//DEVICE PART
const  partName = ref<string>()
const  partDescription = ref<string>()
const  partPrice = ref<string>()
const  partQuantity = ref<string>()
const  partObservations = ref<string>()


const deviceParts = ref<Part[]>([] || undefined)

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
      router.push({ name: 'login' })
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

  const getDeviceService = async (id: number) => {
    if (id === undefined) return

    try {
      const { data } = await apiResources.get<Device>(`/device/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      })

      return data
    } catch {
      console.log('error')
    }
  }

  const getServiceById = async (id: string | number | string[]) => {
    totalPartsPrice.value = 0
    // isLoading.value = true
    try {
      const { data } = await apiResources.get<Service>(`/services/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      })

      service.value = data
      idDevice.value = data.device.id
      const device = await getDeviceService(idDevice.value)

      if (device !== undefined) {
        deviceParts.value = device.parts
      }
      deviceParts.value.forEach((part) => { totalPartsPrice.value +=  part.price*part.quantity})

      isLoading.value = false
    } catch {
      isLoading.value = false
    }
  }


  const setPiece = async () => {
    try {
     const data = await apiResources.post('/parts' , {
        name: partName.value,
        description: partDescription.value,
        price: partPrice.value,
        quantity: partQuantity.value,
        observations: partObservations.value,
        deviceId: idDevice.value
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      })
      await getServiceById(idDevice.value)
      showToast('Exito', 'Pieza agregada correctamente ', 'success')
      console.log(data)
    }catch {
      showToast('Exito', 'Error', 'danger')
      console.log('error')
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
        `Su servicio cambió a ${newStatus}`,
        `${service.value?.client.id}`
      )
    } catch {
      showToast('Error', 'Ocurrió un error, inténtalo nuevamente')
    }
  }

  const sendMessage = async (idService: any) => {
    // if (commentText.value.length < 1) return
    loadingComment.value = true

    const fd = new FormData()
    fd.append('photo', photoComment.value)
    fd.append('comment', commentText.value)

    try {
      const { data } = await apiResources.post(
        `/services/${idService}/addComment/${localStorage.getItem('uid')}`,

        {
          photo: photoComment.value,
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

      commentText.value = ''
      photoComment.value = null
      loadingComment.value = false

      await sendNotification(
        'Nuevo comentario',
        `Se agregó un nuevo comentario a su servicio ${service.value?.invoice
          .split('-')
          .join('')} `,
        service.value?.client.id + ''
      )
    } catch (e) {
      loadingComment.value = false

      showToast('Error', 'Revisa tu conexión a internet e inténtalo nuevamente')
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
    commentText,
    loadingComment,
    deviceParts,
    partName,
    partDescription,
    partPrice,
    partQuantity,
    partObservations,
  setPiece,
totalPartsPrice }
}
