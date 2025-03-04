import { axiosInstance, BASE_URL } from "../config/axios.config";
import { ICourt, ICreateCourt } from "../models/court.model";

export class CourtServices {
  static async getAll(): Promise<ICourt[]> {
    const res = await axiosInstance.get(`${BASE_URL}/court`);
    return res.data;
  }
  static async create(data: ICreateCourt): Promise<ICourt> {
    const res = await axiosInstance.post(`${BASE_URL}/court`, data);
    return res.data;
  }
  static async update(id: string, data: Partial<ICourt>): Promise<ICourt> {
    const res = await axiosInstance.patch(`${BASE_URL}/court/${id}`, data);
    return res.data;
  }
}
