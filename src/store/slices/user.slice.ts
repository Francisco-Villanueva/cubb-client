import { IStoreState } from "@/interfaces/store";
import { IUser } from "@/models/user.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState extends IStoreState {
  user?: IUser;
  users: IUser[];
  inmutableUsers: IUser[];
}

const initialState: SessionState = {
  users: [],
  inmutableUsers: [],
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
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
      state.inmutableUsers = action.payload;
      state.fetched = true;
    },
  },
});

export const { setUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
