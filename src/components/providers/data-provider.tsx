import { useAppSelector } from "@/store/hooks";
import { fetchData } from "@/store/utils/fetchData";
import { PropsWithChildren, useEffect, useState } from "react";
import { LoaderWrapper } from "../common/loader-wrapper";

export function DataProvider({ children }: PropsWithChildren) {
  const {
    fetchCourtData,
    fetchTeamData,
    fetchUsersData,
    fetchAppointmnetsData,
  } = fetchData();
  const { fetched: courtFetched } = useAppSelector((s) => s.courts);
  const { fetched: teamFetched } = useAppSelector((s) => s.team);
  const { fetched: usersFetched } = useAppSelector((s) => s.user);
  const { fetched: appointmentsFetched } = useAppSelector(
    (s) => s.appointments
  );

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        !courtFetched && (await fetchCourtData());
        !teamFetched && (await fetchTeamData());
        !usersFetched && (await fetchUsersData());
        !appointmentsFetched && (await fetchAppointmnetsData());
      } catch (error) {
        console.log("error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return <LoaderWrapper loading={loading}>{children}</LoaderWrapper>;
}
