import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getData from "../ducks/getData";
import  BitcoinData from "../ducks/transaction"
import HistoryData from "../ducks/history";

const rootReducer = combineReducers({
  getData,
  BitcoinData,
  HistoryData
});

const persistConfig = {
  key: "Bitcoin",
  storage: AsyncStorage,
};


export default function generateStore() {
  const pReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(pReducer, applyMiddleware(thunk));
  const persistor = persistStore(store);

  return { persistor, store };
}
