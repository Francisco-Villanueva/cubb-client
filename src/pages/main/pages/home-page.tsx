import { useAppSelector } from "@/store/hooks";
import { UserTeamDetails } from "../components/user-team-details";
import { AppointmentDetails } from "@/components/common/appointmnet-details";

export function HomePage() {
  const { appointments } = useAppSelector((s) => s.appointments);
  const { user } = useAppSelector((s) => s.user);

  const filterdAppointmnets = appointments.filter(
    (e) => e.TeamId === user?.TeamId
  );
  console.log("user", user);
  console.log("appointments", appointments);
  console.log("filterdAppointmnets", filterdAppointmnets);
  return (
    <div className="space-y-4  size-full flex flex-col">
      <div className=" w-full">
        <UserTeamDetails />
      </div>

      <div className="mx-auto">
        <p className="font-semibold text-gray-800 text-center ">
          Turnos Agendados
        </p>
        <div className="flex flex-col gap-2 text-xs">
          {filterdAppointmnets.map((appointment) => (
            <div key={appointment.id} className="rounded-none bg-white p-2">
              <AppointmentDetails appointment={appointment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
