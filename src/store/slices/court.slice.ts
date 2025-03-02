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
  },
});

// Action creators are generated for each case reducer function
export const { addCourt, setCourts } = courtSlice.actions;

export default courtSlice.reducer;
