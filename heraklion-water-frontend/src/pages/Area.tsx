import { config } from "../config";
import { useState } from "react";
import axios from "axios";
import { useIonViewWillEnter } from "@ionic/react";
import { useParams } from "react-router";
import getAreaName from "../data/areaNames";
import { Spinner, AreaSubscribeButton, AreaLogList } from "../components";
import Layout from "./Layout";
import "./Area.css";

function Area() {
  const params: any = useParams();
  const [areaLogs, setAreaLogs] = useState<any>();

  useIonViewWillEnter(async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/api/areas/${params.id}`);
      const data = res.data;
      setAreaLogs(data);
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
  });

  return (
    <>
      {areaLogs ? (
        <Layout id="view-area" title={getAreaName(areaLogs.name)}>
          <AreaSubscribeButton areaId={areaLogs._id} />
          <AreaLogList areaLogs={areaLogs} />
        </Layout>
      ) : (
        <Layout id="view-area" title={""}>
          <Spinner />
        </Layout>
      )}
    </>
  );
}

export default Area;
