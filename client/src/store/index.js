import { createStore } from "redux";

import reducer from "./reducers";

export default function configureStore(initialeState) {
  const store = createStore(
    reducer,
    initialeState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  );
  return store;
}
