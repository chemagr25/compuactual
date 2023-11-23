import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.chemsbyte.compuactual.mx',
  appName: 'compuactual-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    "url": " http://192.168.0.108:8080/",
    "cleartext": true

  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
}

export default config
