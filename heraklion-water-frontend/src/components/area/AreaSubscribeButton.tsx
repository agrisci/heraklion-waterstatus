import {
  IonGrid,
  IonRow,
  IonCol,
  IonToggle,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import "./AreaSubscribeButton.css";
import { localStorageGet, localStorageSet } from "../../services/LocalStorage";
import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { FirebaseMessaging } from "@capacitor-firebase/messaging";

const AreaSubscribeButton = (props) => {
  const areaId = props.areaId;
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      try {
        const areaSubscriptionStatus = await localStorageGet(areaId);
        setSubscriptionStatus(areaSubscriptionStatus);
      } catch (error) {
        console.log(`[Local Storage Error] --- ${error}`);
      }
    };
    getSubscriptionStatus();
  }, []);

  const handleToggle = async (e) => {
    try {
      if (subscriptionStatus) {
        if (Capacitor.getPlatform() === "android") {
          await FirebaseMessaging.unsubscribeFromTopic({
            topic: areaId,
          });
        }
        await localStorageSet(areaId, false);
        setSubscriptionStatus(false);
      } else {
        if (Capacitor.getPlatform() === "android") {
          await FirebaseMessaging.subscribeToTopic({
            topic: areaId,
          });
        }
        await localStorageSet(areaId, true);
        setSubscriptionStatus(true);
      }
    } catch (error) {
      console.log(`[Push Notifications] ---  Error: ${error}`);
    }
  };
  return (
    <IonCard className="subscribe-button">
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonCol className="text align-self-center">
              Λήψη Ειδοποιήσεων
            </IonCol>
            <IonCol size={"auto"}>
              {subscriptionStatus && (
                <IonToggle onClick={handleToggle} checked></IonToggle>
              )}
              {!subscriptionStatus && (
                <IonToggle onClick={handleToggle}></IonToggle>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default AreaSubscribeButton;
