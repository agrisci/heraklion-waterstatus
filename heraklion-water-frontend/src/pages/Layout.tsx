import { Geolocation } from "@capacitor/geolocation";
import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonIcon,
  useIonAlert,
} from "@ionic/react";
import { locate } from "ionicons/icons";
import getAreaName from "../data/areaNames";
import { useHistory } from "react-router-dom";
import pointInPolygon from "point-in-polygon/nested";
import "./Layout.css";

function Layout(props) {
  const [present] = useIonAlert();
  const history = useHistory();
  const areas = props.areas;
  const pathname = window.location.pathname;

  const findAreaByPolygon = (coordinates: Array<number>) => {
    let areaName = null;
    for (let i = 0; i < areas.length; i++) {
      if (pointInPolygon(coordinates, areas[i].coordinates) === true) {
        areaName = areas[i].name;
        break;
      }
    }
    return areaName;
  };

  const getCoordinates = async () => {
    // check for geolocation permissions
    const permissions = await Geolocation.checkPermissions();
    if (permissions.location === "denied") {
      console.log("Permissions Not Granted. Requesting now.");
      const response = await Geolocation.requestPermissions();
      // user did not accept permissions
      if (response.location === "denied") {
        console.log("Permissions Request Denied. Returning null.");
        return null;
      } else {
        try {
          const position: object = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
          return position;
        } catch (error) {
          console.log("GPS Location Aquisition Error: ", error);
          return null;
        }
      }
    } else {
      // get current position
      try {
        const position: object = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
        return position;
      } catch (error) {
        console.log("GPS Location Aquisition Error: ", error);
        return null;
      }
    }
  };

  const initGeolocation = async () => {
    const coordinates: any = await getCoordinates();
    const latitude = coordinates.coords.latitude;
    const longitude = coordinates.coords.longitude;
    const areaName = findAreaByPolygon([latitude, longitude]);

    // Unsuccessfull getting geolocation or finding a matching polygon (latitude, longitude)
    if (!coordinates || !areaName) {
      present({
        cssClass: "geolocation-alert",
        header: "Σφάλμα",
        message: "Η περιοχή σας δεν βρέθηκε ή δεν υπάρχουν δεδομένα...",
        buttons: ["Κλείσιμο"],
      });
    }
    if (coordinates && areaName) {
      const areaDetails = props.areas.filter((area) => area.name === areaName);
      const areaId = areaDetails[0]._id;
      present({
        cssClass: "geolocation-alert",
        header: "Περιοχή ΔΕΥΑΗ",
        message: `${getAreaName(areaName)}`,
        buttons: [
          "Κλείσιμο",
          {
            text: "Μετάβαση",
            handler: async () => {
              history.push(`/area/${areaId}/${areaName}`);
            },
          },
        ],
      });
    }
  };

  return (
    <IonPage id={props.id}>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          {pathname !== "/overview" && (
            <IonButtons slot="start">
              <IonBackButton defaultHref="/"> </IonBackButton>
            </IonButtons>
          )}
          {pathname === "/overview" && (
            <IonButtons slot="start">
              <IonIcon style={{ color: "transparent" }}></IonIcon>
            </IonButtons>
          )}
          <IonTitle class="ion-text-center">{props.title}</IonTitle>
          {pathname === "/overview" && (
            <IonButtons slot="end">
              <IonButton expand="block" onClick={() => initGeolocation()}>
                <IonIcon icon={locate}></IonIcon>
              </IonButton>
            </IonButtons>
          )}
          {pathname !== "/overview" && (
            <IonButtons slot="end">
              <IonIcon style={{ color: "transparent" }} icon={locate}></IonIcon>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{props.children}</IonContent>
    </IonPage>
  );
}

export default Layout;
