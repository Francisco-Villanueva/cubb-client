import { IStoreState } from "@/interfaces/store";
import { IAppointment } from "@/models/appointmnet.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface SessionState extends IStoreState {
  appointments: IAppointment[];
  inmutableAppointments: IAppointment[];
}

const initialState: SessionState = {
  appointments: [],
  inmutableAppointments: [],
  loading: false,
  fetched: false,
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointments(state, action: PayloadAction<IAppointment[]>) {
      state.appointments = action.payload;
      state.inmutableAppointments = action.payload;
      state.fetched = true;
    },
    addAppointment(state, action: PayloadAction<IAppointment>) {
      state.appointments.push(action.payload);
      state.inmutableAppointments.push(action.payload);
    },
    editAppointment(
      state,
      action: PayloadAction<{ changes: Partial<IAppointment>; id: string }>
    ) {
      const { changes, id } = action.payload;
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === id
      );

      if (index !== -1) {
        // Update the appointment in the main array
        state.appointments[index] = {
          ...state.appointments[index],
          ...changes,
        };

        // Also update the data in inmutableAppointments
        const immutableIndex = state.inmutableAppointments.findIndex(
          (appointment) => appointment.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutableAppointments[immutableIndex] = {
            ...state.inmutableAppointments[immutableIndex],
            ...changes,
          };
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAppointment, setAppointments, editAppointment } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
