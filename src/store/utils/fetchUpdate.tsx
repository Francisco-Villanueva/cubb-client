import { ICourt } from "@/models/court.model";
import { CourtServices } from "@/services/court.services";
import { useAppDispatch } from "../hooks";
import { editCourt } from "../slices/court.slice";

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

  return { updateCourt };
}
