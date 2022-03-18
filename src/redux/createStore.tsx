import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddle();
export const middlewares = [sagaMiddleware, thunk];

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

const reduxItems = { store, persistor };

export default reduxItems;
