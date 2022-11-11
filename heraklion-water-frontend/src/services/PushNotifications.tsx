import { Capacitor } from "@capacitor/core";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";

const initPushNotifications = async () => {
  // Check current platform
  if (Capacitor.getPlatform() !== "android") {
    console.log(
      "[Push Notifications] ---  Platform is not android. Quitting initialization..."
    );
    return;
  }

  await FirebaseMessaging.checkPermissions();
  await FirebaseMessaging.requestPermissions();
  await FirebaseMessaging.addListener(
    "notificationReceived",
    (notification: any) => {
      console.log("Push notification received: ", notification);
    }
  );

  await FirebaseMessaging.addListener(
    "notificationActionPerformed",
    (notification: any) => {
      const areaId = notification.notification.data.areaId;
      window.location.assign(`/area/${areaId}`);
      // router.push({ path: `/area/${areaId}` });
    }
  );
};

export { initPushNotifications };
