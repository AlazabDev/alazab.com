import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alazab.app',
  appName: 'شركة العزب للمقاولات',
  webDir: 'dist',
  server: {
    hostname: 'alazab.com',
    androidScheme: 'https',
  },
  android: {
    buildOptions: {
      keystorePath: 'alazab-release.keystore',
      keystoreAlias: 'alazab',
    },
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a2e',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
  },
};

export default config;
