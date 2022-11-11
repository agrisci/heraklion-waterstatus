import { IonSpinner } from "@ionic/react";
import "./Spinner.css";

function Spinner() {
  return (
    <div className="spinner-container">
      <IonSpinner name="crescent"></IonSpinner>
    </div>
  );
}

export default Spinner;
