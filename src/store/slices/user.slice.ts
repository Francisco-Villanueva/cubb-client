import { IStoreState } from "@/interfaces/store";
import { IUser } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState extends IStoreState {
  user?: IUser;
}

const initialState: SessionState = {
  user: localStorage.getItem("userLogged")
    ? JSON.parse(localStorage.getItem("userLogged") || "{}")
    : undefined,
  loading: false,
  fetched: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | undefined>) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
