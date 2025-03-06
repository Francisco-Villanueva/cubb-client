import { ICourt } from "@/models/court.model";
import { CourtServices } from "@/services/court.services";
import { useAppDispatch } from "../hooks";
import { editCourt } from "../slices/court.slice";
import { ITeam } from "@/models/team.model";
import { TeamServices } from "@/services/team.services";
import { editTeam } from "../slices/team.slice";

export function fetchUpdate() {
  const dispatch = useAppDispatch();
  const updateCourt = async (id: string, data: Partial<ICourt>) => {
    try {
      await CourtServices.update(id, data);
      dispatch(editCourt({ changes: data, id }));
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

  const updateTeam = async (id: string, data: Partial<ITeam>) => {
    try {
      await TeamServices.update(id, data);
      dispatch(editTeam({ changes: data, id }));
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

  return { updateCourt, updateTeam };
}
