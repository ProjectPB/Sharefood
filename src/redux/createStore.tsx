import createSagaMiddle from "redux-saga";
import thunk from "redux-thunk";
import { persistStore } from 'redux-persist';
import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, thunk],
  devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

const reduxItems = { store, persistor };

export default reduxItems;
