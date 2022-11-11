import {
  IonList,
  IonCard,
  IonCardContent,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

import "./AreaLogList.css";

const AreaLogList = (props) => {
  const areaHistory = props.areaLogs.log;

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
    <>
      <IonGrid>
        <IonRow>
          <IonCol className="text">
            <h4 className="log-list-title">Ιστορικό Περιοχής</h4>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonCard className="log-list-card">
        <IonCardContent>
          <IonList className="log-list">
            <IonItem className="log-list-item">
              <IonGrid>
                <IonRow>
                  <IonCol className="text-2">Ημερομηνία</IonCol>
                  <IonCol className="text-2" size="auto">
                    Κατάσταση
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
            {areaHistory.map((log) => (
              <IonItem key={log._id} className="log-list-item">
                <IonGrid>
                  <IonRow>
                    <IonCol className="text">
                      {dateFormatter(log.datetime)}
                    </IonCol>
                    <IonCol size="auto">
                      {log.status === "ΝΑΙ" && (
                        <li className="is-active">Επαναφορά</li>
                      )}
                      {log.status === "ΟΧΙ" && (
                        <li className="is-inactive">Διακοπή</li>
                      )}
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default AreaLogList;
