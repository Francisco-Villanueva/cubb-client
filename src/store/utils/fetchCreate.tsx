import { ICreateCourt } from "@/models/court.model";
import { CourtServices } from "@/services/court.services";
import { useAppDispatch } from "../hooks";
import { addCourt } from "../slices/court.slice";
import { ICreateTeam } from "@/models/team.model";
import { TeamServices } from "@/services/team.services";
import { addTeam } from "../slices/team.slice";

export function fetchCreate() {
  const dispatch = useAppDispatch();
  const createCourt = async (data: ICreateCourt) => {
    try {
      const res = await CourtServices.create(data);

      dispatch(addCourt(res));
    } catch (error) {
      console.log("Error creating court", error);
      // @ts-ignore
      if (error.response.data.message) {
        // @ts-ignore
        throw error.response.data.message;
      }
      throw error;
    }
  };
  const createTeam = async (data: ICreateTeam) => {
    try {
      const res = await TeamServices.create(data);
      dispatch(addTeam(res));
    } catch (error) {
      console.log("Error creating team", error);
      // @ts-ignore
      if (error.response.data.message) {
        // @ts-ignore
        throw error.response.data.message;
      }
      throw error;
    }
  };
  return { createCourt, createTeam };
}
