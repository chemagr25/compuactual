import { apiResources } from '@/api/apiResources'

export const useNotification = () => {
  const sendNotification = async (title: string, body: string, idUser: string) => {
    const { data } = await apiResources.post(
      `services/notify/${idUser}`,
      {
        title,
        body
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token_auth')
        }
      }
    )

    console.log(data)
  }

  return {
    sendNotification
  }
}
