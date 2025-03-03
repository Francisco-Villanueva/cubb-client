import { configureStore } from "@reduxjs/toolkit";
import CourtReducer from "./slices/court.slice";
import UserReducer from "./slices/user.slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      courts: CourtReducer,
      user: UserReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
