import { AppointmentDetails } from "@/components/common/appointmnet-details";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ITeam } from "@/models/team.model";
import { useAppSelector } from "@/store/hooks";
import { Shield } from "lucide-react";

interface TeamCardProps {
  team: ITeam;
  showNextMatch?: boolean;
  size?: "sm" | "md" | "lg";
}
export function TeamCard({ team, showNextMatch, size = "md" }: TeamCardProps) {
  const { appointments } = useAppSelector((s) => s.appointments);

  const nextAppointment = appointments
    .filter(
      (appointment) =>
        appointment.TeamId === team.id &&
        new Date(appointment.date) > new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  console.log({ nextAppointment });
  return (
    <div
      className={` p-2  flex  items-center gap-4 ${
        size === "lg" ? "h-32" : size === "md" ? "h-24" : "h-16"
      } `}
    >
      <div className="h-full">
        {team.shield ? (
          <img
            src={team.shield}
            alt="la tercera fc"
            className="aspect-square h-full object-cover rounded-2xl "
          />
        ) : (
          <Shield className="size-full" />
        )}
      </div>

      <div className="  ">
        <CardTitle>{team.name}</CardTitle>
        <CardDescription>Categoría: {team.category}</CardDescription>
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
