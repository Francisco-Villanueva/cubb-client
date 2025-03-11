import { CourtServices } from "@/services/court.services";
import { useAppDispatch } from "../hooks";
import { setCourts } from "../slices/court.slice";
import { TeamServices } from "@/services/team.services";
import { setTeams } from "../slices/team.slice";
import { UsersServices } from "@/services/user.services";
import { setUsers } from "../slices/user.slice";

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

  const fetchUsersData = async () => {
    try {
      const response = await UsersServices.getAll();
      console.log("get all users", response);
      dispatch(setUsers(response));
    } catch (error) {
      console.error("Error fetching courts data", error);
    }
  };

  return { fetchCourtData, fetchTeamData, fetchUsersData };
}
