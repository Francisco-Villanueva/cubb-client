import { axiosInstance, BASE_URL } from "../config/axios.config";
import { ICourt } from "../models/court.model";

export class CourtServices {
  static async getAll(): Promise<ICourt[]> {
    const res = await axiosInstance.get(`${BASE_URL}/court`);
    return res.data;
  }
}
