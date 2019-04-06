import React from "react";

import Store from "./Store/configStore";
import { Provider } from "react-redux";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";

import Jeu from "./Components/Jeu";

export default class App extends React.Component {
  render() {
    let persistor = persistStore(Store);
    return (
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Jeu />
        </PersistGate>
      </Provider>
    );
  }
}
