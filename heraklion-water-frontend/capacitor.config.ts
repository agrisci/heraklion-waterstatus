import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.agrisci.heraklionwater",
  appName: "heraklion-water",
  webDir: "build",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
