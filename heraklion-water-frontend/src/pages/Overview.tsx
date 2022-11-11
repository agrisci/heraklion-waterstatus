import { config } from "../config";
import { useState } from "react";
import { IonList, useIonViewWillEnter } from "@ionic/react";
import { Spinner, AreaListItem } from "../components";
import Layout from "./Layout";
import axios from "axios";
import "./Overview.css";
import { useIonRouter } from "@ionic/react";
import { App } from "@capacitor/app";

const Overview = () => {
  const [areas, setAreas] = useState([]);
  const ionRouter = useIonRouter();

  document.addEventListener("ionBackButton", (ev) => {
    if (!ionRouter.canGoBack()) {
      App.exitApp();
    }
  });

  useIonViewWillEnter(async () => {
    // fetch all areas
    try {
      const res = await axios.get(`${config.baseUrl}/api/areas`);
      const data = res.data;
      setAreas(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
    try {
    } catch (error) {}
  });

  return (
    <Layout id="home-page" title="Ύδρευση Ηρακλείου" areas={areas}>
      {areas.length > 0 ? (
        <IonList inset={true}>
          {areas.map((area) => (
            <AreaListItem key={area._id} area={area} />
          ))}
        </IonList>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
};

export default Overview;
