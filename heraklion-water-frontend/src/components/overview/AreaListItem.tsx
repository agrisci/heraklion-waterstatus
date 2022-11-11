import { IonItem, IonGrid, IonRow, IonCol, IonIcon } from "@ionic/react";
import { notifications, closeCircle, checkmarkCircle } from "ionicons/icons";
import getAreaName from "../../data/areaNames";
import { localStorageGet, localStorageSet } from "../../services/LocalStorage";
import { useState, useEffect } from "react";
import "./AreaListItem.css";

const AreaListItem = (props) => {
  const area = props.area;
  const [areaSubscriptionStatus, setAreaSubscriptionStatus] = useState(false);

  useEffect(() => {
    const getAreaStatus = async () => {
      try {
        const areaSubscriptionStatus = await localStorageGet(area._id);
        setAreaSubscriptionStatus(areaSubscriptionStatus);
      } catch (error) {}
    };
    getAreaStatus();
  });

  const dateFormatter = (date: string) => {
    let newDate = new Date(date);
    return newDate.toLocaleString("el-GR", {
      day: "numeric",
      year: "numeric",
      month: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <IonItem
      routerLink={`/area/${area._id}`}
      button
      detail
      shape="round"
      className="custom-item"
    >
      <IonGrid>
        <IonRow>
          <IonCol>
            <p className="area-name">{getAreaName(area.name)}</p>
          </IonCol>
          <IonCol size="auto" className="ion-align-self-center">
            {areaSubscriptionStatus && (
              <div className="subscription-status">
                <IonIcon icon={notifications}></IonIcon>
              </div>
            )}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol class="datetime">
            <p>{dateFormatter(area.log[0].datetime)}</p>
          </IonCol>
          <IonCol size="auto">
            <ul>
              {area.log[0].status === "ΝΑΙ" && (
                <IonIcon className="is-active" icon={checkmarkCircle}></IonIcon>
              )}
            </ul>
            <ul>
              {area.log[0].status === "ΟΧΙ" && (
                <IonIcon className="is-inactive" icon={closeCircle}></IonIcon>
              )}
            </ul>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
};

export default AreaListItem;
