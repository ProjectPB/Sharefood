import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from "react-redux";
import { store, persistor } from './redux/createStore';
import App from "./App";

import "./main.scss";

ReactDOM.hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
