import { apiAuth } from '@/api/apiAuth'
import { inject, ref } from 'vue'
import { showToast } from '@/helpers/showToast'
import type { Login } from '@/interfaces/login'
import type { VueCookies } from 'vue-cookies'

const username = ref<string>()
const password = ref<string>()
const isLoading = ref<boolean>(false)
const hasError = ref<boolean>()
// const $cookies = inject<VueCookies>('$cookies');

export const useLogin = () => {

  const sendLogin = async () => {
    if(!username.value || !password.value) return showToast('Error', 'Llena todos los campos')
    isLoading.value = true
    try {
      const { data } = await apiAuth.post<Login>('/login', {
        username: username.value,
        password: password.value
      })
      localStorage.setItem('token_auth', data.token)

      // $cookies?.set('token', data.token)
      showToast('Exito', 'pásele', 'success')

      isLoading.value = false
    } catch (error) {
      console.log(error)
      isLoading.value = false
      showToast('Error', 'Revisa tus datos')
    }
  }

  return {
    username,
    password,
    sendLogin,
    isLoading,
    hasError
  }
}
