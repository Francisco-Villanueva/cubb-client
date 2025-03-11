import { axiosInstance, BASE_URL } from "../config/axios.config";
import { IUser } from "@/models/user.model";

export class UsersServices {
  static async getAll(): Promise<IUser[]> {
    const res = await axiosInstance.get(`${BASE_URL}/user`);
    return res.data;
  }

  static async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const res = await axiosInstance.patch(`${BASE_URL}/user/${id}`, data);
    return res.data;
  }
}
