import { IAppointment, ICreateAppointment } from "@/models/appointmnet.model";
import { axiosInstance, BASE_URL } from "../config/axios.config";

export class AppointmnetServices {
  static async getAll(): Promise<IAppointment[]> {
    const res = await axiosInstance.get(`${BASE_URL}/appointments`);
    return res.data;
  }
  static async create(data: ICreateAppointment) {
    const res = await axiosInstance.post(`${BASE_URL}/appointments`, data);
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
  static async getAppointmnetsByTeam(teamId: string) {
    const res = await axiosInstance.post(
      `${BASE_URL}/appointments/court-slots`,
      {
        teamId,
      }
    );
    return res.data;
  }
}
