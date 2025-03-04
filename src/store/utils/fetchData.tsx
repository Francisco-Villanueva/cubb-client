import { CourtServices } from "@/services/court.services";
import { useAppDispatch } from "../hooks";
import { setCourts } from "../slices/court.slice";
import { TeamServices } from "@/services/team.services";
import { setTeams } from "../slices/team.slice";

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

  const fetchTeamData = async () => {
    try {
      const response = await TeamServices.getAll();
      dispatch(setTeams(response));
    } catch (error) {
      console.error("Error fetching courts data", error);
    }
  };

  return { fetchCourtData, fetchTeamData };
}
