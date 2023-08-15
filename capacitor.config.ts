import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.chemsbyte.compuactual.mx',
  appName: 'compuactual-app',
  webDir: 'dist',
  server: {
    androidScheme: 'https',

  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
}

export default config
