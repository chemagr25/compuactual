import { apiResources } from '@/api/apiResources'

export const useNotification = () => {
  const sendNotification = async (title: string, body: string, deviceToken: string) => {
    const { data } = await apiResources.post(
      'services/notify',
      {
        title,
        body,
        deviceToken
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
