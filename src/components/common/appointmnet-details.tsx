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
  const court = courts.find((c) => c.id === appointment.CourtId);
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
    <section className="flex justify-between items-center gap-8 px-4 py-2">
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
  );
}
