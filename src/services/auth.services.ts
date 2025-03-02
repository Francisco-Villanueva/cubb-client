import { axiosInstance, BASE_URL } from "@/config/axios.config";
import { ILoginResponse } from "@/interfaces/auth";
import { IUser } from "@/models/user.model";
import axios from "axios";

export class AuthServices {
  static async login(data: unknown): Promise<ILoginResponse> {
    const response = await axios.post(`${BASE_URL}/auth/login`, data);

    return response.data;
  }
  static async register(data: IUser) {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);

    return response.data;
  }
  static async confirmEmail(data: { token: string }) {
    const response = await axios.post(`${BASE_URL}/auth/confirmation`, data);

    return response.data;
  }
  static async me(): Promise<IUser> {
    const response = await axiosInstance.post(`${BASE_URL}/auth/me`);

    return response.data;
  }
}
