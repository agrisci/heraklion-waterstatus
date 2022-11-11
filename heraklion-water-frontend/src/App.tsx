import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { initPushNotifications } from "./services/PushNotifications";
import Overview from "./pages/Overview";
import Area from "./pages/Area";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  // Initialize Push Notifications
  (() => {
    initPushNotifications();
  })();

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/overview" />
          </Route>
          <Route path="/overview" exact={true}>
            <Overview />
          </Route>
          <Route path="/area/:id">
            <Area />
          </Route>
          <Route>
            <Redirect to="/overview" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
