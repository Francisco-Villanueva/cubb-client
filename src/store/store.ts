import { configureStore } from "@reduxjs/toolkit";
import CourtReducer from "./slices/court.slice";
import UserReducer from "./slices/user.slice";
import TeamReducer from "./slices/team.slice";
import AppointmnetReducer from "./slices/appointments.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      courts: CourtReducer,
      user: UserReducer,
      team: TeamReducer,
      appointments: AppointmnetReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
