import { FromatedDate } from "@/components/common/format-date";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ITeam } from "@/models/team.model";
import {
  CalendarIcon,
  CircleDollarSign,
  ClockIcon,
  MapPinned,
  Shield,
} from "lucide-react";

interface TeamCardProps {
  team: ITeam;
  showNextMatch?: boolean;
  size?: "sm" | "md" | "lg";
}
export function TeamCard({ team, showNextMatch, size = "md" }: TeamCardProps) {
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
        <div>
          {false ? (
            <Card className=" p-1 px-2 flex-grow rounded-none ml-4  text-sm flex justify-center items-center h-full ">
              <p className="font-semibold text-gray-800 ">
                No tenés agendado ningun turno
              </p>
            </Card>
          ) : (
            <Card className="  p-1 px-2 flex-grow rounded-none ml-4  text-sm">
              <p className="font-semibold text-gray-800 text-center ">
                Próximo partido
              </p>
              <section className="flex justify-between items-center gap-8 px-4 py-2">
                <div className="flex flex-col items-center ">
                  <img
                    src="https://ligacubb.com/imagenes/liverfull.png"
                    alt="la tercera fc"
                    className="aspect-square size-12 object-cover rounded-full "
                  />
                  <p>Liverfull FC</p>
                </div>
                <div className="text-gray-700 font-semibold">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    <FromatedDate date={new Date().toISOString()} />
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="size-4" />
                    <p>19:00 hs</p>
                  </div>
                </div>
                <div className="text-gray-700 font-semibold">
                  <div className="flex items-center gap-2">
                    <MapPinned className="size-4" />
                    <p>Cancha 9</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CircleDollarSign className="size-4" />
                    <p>$47.000</p>
                  </div>
                </div>
              </section>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
