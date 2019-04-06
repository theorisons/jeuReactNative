import { createStore } from "redux";
import gestionGame from "./reducers/hsReducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootPersistConfig = {
  key: "root",
  storage: storage
};

export default createStore(persistReducer(rootPersistConfig, gestionGame));
