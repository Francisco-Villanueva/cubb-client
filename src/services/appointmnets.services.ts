import { axiosInstance, BASE_URL } from "../config/axios.config";
import { ICourt } from "../models/court.model";

export class AppointmnetServices {
  static async getAll(): Promise<ICourt[]> {
    const res = await axiosInstance.get(`${BASE_URL}/appointmnets`);
    return res.data;
  }
  static async getSlotsBycourtId(courtId: string, date: string, duration = 90) {
    const res = await axiosInstance.post(
      `${BASE_URL}/appointments/court-slots`,
      {
        date,
        courtId,
        duration,
      }
    );
    return res.data;
  }
}
