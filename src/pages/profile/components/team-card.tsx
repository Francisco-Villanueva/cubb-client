import { AppointmentDetails } from "@/components/common/appointmnet-details";
import { TeamShield } from "@/components/common/team-shield";
import { Card } from "@/components/ui/card";
import { ITeam } from "@/models/team.model";
import { useAppSelector } from "@/store/hooks";
interface TeamCardProps {
  team: ITeam;
  showNextMatch?: boolean;
  size?: "sm" | "md" | "lg";
  direction?: "vertical" | "horzintal";
}
export function TeamCard({
  team,
  showNextMatch,
  direction = "horzintal",
}: TeamCardProps) {
  const { appointments } = useAppSelector((s) => s.appointments);

  const nextAppointment = appointments
    .filter(
      (appointment) =>
        appointment.TeamId === team.id &&
        new Date(appointment.date) > new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <div
      className={` p-2  flex  items-center   h-full  gap-4  ${
        direction === "vertical" ? "flex-col" : "flex-row"
      }   `}
    >
      <div className="h-40">
        <TeamShield team={team} showDescription direction={direction} />
      </div>

      {showNextMatch && (
        <div className="flex-grow h-full">
          {!nextAppointment ? (
            <Card className="  rounded-none  text-sm flex justify-center items-center size-full">
              <p className="font-semibold text-gray-800 ">
                No tenés agendado ningun turno
              </p>
            </Card>
          ) : (
            <Card className="  p-1 px-2 flex-grow rounded-none ml-4  text-sm">
              <p className="font-semibold text-gray-800 text-center ">
                Próximo partido
              </p>
              <AppointmentDetails appointment={nextAppointment} />
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
