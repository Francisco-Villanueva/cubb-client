import { configureStore } from "@reduxjs/toolkit";
import Courts from "./slices/court.slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      courts: Courts,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
