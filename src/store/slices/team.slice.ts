import { IStoreState } from "@/interfaces/store";
import { ITeam } from "@/models/team.model";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface SessionState extends IStoreState {
  teams: ITeam[];
  inmutableTeams: ITeam[];
}
const initialState: SessionState = {
  teams: [],
  inmutableTeams: [],
  loading: false,
  fetched: false,
};
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<ITeam[]>) {
      state.teams = action.payload;
      state.inmutableTeams = action.payload;
      state.fetched = true;
    },
    addTeam(state, action: PayloadAction<ITeam>) {
      state.teams.push(action.payload);
      state.inmutableTeams.push(action.payload);
    },
    editTeam(
      state,
      action: PayloadAction<{ changes: Partial<ITeam>; id: string }>
    ) {
      const { changes, id } = action.payload;
      const index = state.teams.findIndex((court) => court.id === id);

      if (index !== -1) {
        // Actualiza el appointment en el array principal
        state.teams[index] = {
          ...state.teams[index],
          ...changes,
        };

        // Actualiza también los datos en inmutablesAppointments
        const immutableIndex = state.inmutableTeams.findIndex(
          (appointment) => appointment.id === id
        );
        if (immutableIndex !== -1) {
          state.inmutableTeams[immutableIndex] = {
            ...state.inmutableTeams[immutableIndex],
            ...changes,
          };
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTeam, editTeam, setTeams } = teamSlice.actions;

export default teamSlice.reducer;
