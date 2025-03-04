import { IStoreState } from "@/interfaces/store";
import { ICourt } from "@/models/court.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface SessionState extends IStoreState {
  courts: ICourt[];
  inmutableCourts: ICourt[];
}
const initialState: SessionState = {
  courts: [],
  inmutableCourts: [],
  loading: false,
  fetched: false,
};
const courtSlice = createSlice({
  name: "court",
  initialState,
  reducers: {
    setCourts(state, action: PayloadAction<ICourt[]>) {
      state.courts = action.payload;
      state.inmutableCourts = action.payload;
      state.fetched = true;
    },
    addCourt(state, action: PayloadAction<ICourt>) {
      state.courts.push(action.payload);
      state.inmutableCourts.push(action.payload);
    },
    editCourt(
      state,
      action: PayloadAction<{ changes: Partial<ICourt>; id: string }>
    ) {
      const { changes, id } = action.payload;
      const index = state.courts.findIndex((court) => court.id === id);

      if (index !== -1) {
        // Actualiza el appointment en el array principal
        state.courts[index] = {
          ...state.courts[index],
          ...changes,
        };

        // Actualiza también los datos en inmutablesAppointments
        const immutableIndex = state.inmutableCourts.findIndex(
          (appointment) => appointment.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutableCourts[immutableIndex] = {
            ...state.inmutableCourts[immutableIndex],
            ...changes,
          };
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCourt, setCourts, editCourt } = courtSlice.actions;

export default courtSlice.reducer;
