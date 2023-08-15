import { apiAuth } from '@/api/apiAuth'
import { ref, onMounted } from 'vue'
import { showToast } from '@/helpers/showToast'
import type { Login } from '@/interfaces/login'
import router from '@/router'
// import type { VueCookies } from 'vue-cookies'
import { PushNotifications } from '@capacitor/push-notifications'
import { apiResources } from '@/api/apiResources'

const username = ref<string>()
const password = ref<string>()
const isLoading = ref<boolean>(false)
const hasError = ref<boolean>()
const token = ref()

const tokenDevice = ref()

export const useLogin = () => {
  onMounted(() => {
    PushNotifications.addListener('registration', (tokendevice) => {
      token.value = tokendevice.value
    }).catch((e) => {
      console.log()
    })

    PushNotifications.register().catch((e) => {
      console.log()
    })
  })

  const sendLogin = async () => {
    if (!username.value || !password.value) return showToast('Error', 'Llena todos los campos')
    isLoading.value = true
    try {
      const { data } = await apiAuth.post<Login>('/login', {
        username: username.value,
        password: password.value
      })
      localStorage.setItem('token_auth', data.token)
      localStorage.setItem('uid', data.id + '')
      localStorage.setItem('role', data.roles[0])
      if (localStorage.getItem('role') == 'ROLE_TECHNICIAN') {
        localStorage.setItem('role_id', data.technicianId + '')
      } else if (localStorage.getItem('role') == 'ROLE_USER') {
        localStorage.setItem('role_id', data.clientId + '')
      }

      router.push({ name: 'pivot' })

      isLoading.value = false
    } catch (error) {
      console.log(error)
      isLoading.value = false
      showToast('Error', 'Revisa tus datos')
    }

    if (localStorage.getItem('role') == 'ROLE_USER') return await saveTokenDevice()
  }

  const saveTokenDevice = async () => {
    try {
      await apiResources.post(
        '/clients/saveToken',
        {
          clientId: localStorage.getItem('uid'),
          tokenDevice: token.value
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token_auth')
          }
        }
      )
    } catch {
      console.log()
    }
  }
  return {
    username,
    password,
    sendLogin,
    isLoading,
    hasError,
    tokenDevice
  }
}
