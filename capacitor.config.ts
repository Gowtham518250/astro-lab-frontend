import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.astrolab.app',
  appName: 'AstroLab',
  webDir: 'out',
  server: {
    // Replace this with your actual production frontend URL!
    // For testing locally in Android Studio, use your local network IP (e.g. http://192.168.1.5:3000)
    url: 'https://astrolab.com', 
    cleartext: true
  }
};

export default config;
