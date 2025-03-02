import { IUser } from "@/models/user.model";

export interface ILoginResponse {
  user: IUser;
  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}
