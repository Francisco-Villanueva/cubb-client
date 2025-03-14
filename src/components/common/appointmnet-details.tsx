import { IAppointment } from "@/models/appointmnet.model";
import {
  CalendarIcon,
  CircleDollarSign,
  ClockIcon,
  MapPinned,
  ShieldQuestion,
} from "lucide-react";
import { FromatedDate } from "./format-date";
import { useEffect, useState } from "react";
import { ITeam } from "@/models/team.model";
import { useAppSelector } from "@/store/hooks";

interface AppointmentDetailsProps {
  appointment: IAppointment;
}
export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  const { courts } = useAppSelector((s) => s.courts);
  const { teams } = useAppSelector((s) => s.team);
  const court = courts.find((c) => c.id === appointment.CourtId);
  const localTeam = teams.find((c) => c.id === appointment.TeamId);

  const [rival, setRival] = useState<ITeam | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRival(undefined);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="flex flex-col shadow-md border justify-between items-center p-4 rounded-md gap-2 w-full ">
      <div className="flex items-center justify-around gap-2 w-full">
        {localTeam ? (
          <div className="flex flex-col items-center ">
            <img
              src={localTeam?.shield}
              alt={localTeam?.name}
              className="aspect-square size-12 object-cover rounded-full "
            />
            <p>{localTeam.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center  text-gray-600">
            <ShieldQuestion className="size-12" />
            <i>No definido</i>
          </div>
        )}
        <p>vs</p>
        {rival ? (
          <div className="flex flex-col items-center ">
            <img
              src="https://ligacubb.com/imagenes/liverfull.png"
              alt="la tercera fc"
              className="aspect-square size-12 object-cover rounded-full "
            />
            <p>Liverfull FC</p>
          </div>
        ) : (
          <div className="flex flex-col items-center  text-gray-600">
            <ShieldQuestion className="size-12" />
            <i>No definido</i>
          </div>
        )}
      </div>
      <hr className="w-full" />
      <section className="flex items-center justify-between gap-4 w-full">
        <div className="text-gray-700 font-semibold">
          <div className="flex items-center gap-2">
            <CalendarIcon className="size-4" />
            <FromatedDate date={new Date(appointment.date).toISOString()} />
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            <p>{appointment.time} hs</p>
          </div>
        </div>
        <div className="text-gray-700 font-semibold">
          <div className="flex items-center gap-2">
            <MapPinned className="size-4" />
            <p>{court?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <CircleDollarSign className="size-4" />
            <p>$47.000</p>
          </div>
        </div>
      </section>
    </section>
  );
}
