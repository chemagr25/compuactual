import { createToast, type ToastType } from 'mosha-vue-toastify'

export const showToast = (title: string, description?: string, type?: ToastType) => {
  return createToast(
    {
      title,
      description
    },
    {
      type: type || 'danger',
      timeout: 3000,
      hideProgressBar: true
    }
  )
}
