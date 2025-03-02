import { CourtServices } from "@/services/court.services";
import { useAppDispatch } from "../hooks";
import { setCourts } from "../slices/court.slice";

export function fetchData() {
  const dispatch = useAppDispatch();
  const fetchCourtData = async () => {
    try {
      const response = await CourtServices.getAll();
      dispatch(setCourts(response));
    } catch (error) {
      console.error("Error fetching courts data", error);
    }
  };

  return { fetchCourtData };
}
