import { ICreateCourt } from "@/models/court.model";
import { CourtServices } from "@/services/court.services";
import { useAppDispatch } from "../hooks";
import { addCourt } from "../slices/court.slice";

export function fetchCreate() {
  const dispatch = useAppDispatch();
  const createCourt = async (data: ICreateCourt) => {
    try {
      const res = await CourtServices.create(data);
      console.log("res", res);
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

  return { createCourt };
}
