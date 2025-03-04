import { ICreateTeam, ITeam } from "@/models/team.model";
import { axiosInstance, BASE_URL } from "../config/axios.config";

export class TeamServices {
  static async getAll(): Promise<ITeam[]> {
    const res = await axiosInstance.get(`${BASE_URL}/team`);
    return res.data;
  }
  static async create(data: ICreateTeam): Promise<ITeam> {
    const res = await axiosInstance.post(`${BASE_URL}/team`, data);
    return res.data;
  }
  static async update(id: string, data: Partial<ITeam>): Promise<ITeam> {
    const res = await axiosInstance.patch(`${BASE_URL}/team/${id}`, data);
    return res.data;
  }
}
