import { ITeam } from "@/models/team.model";
import { Shield } from "lucide-react";
import { CardDescription, CardTitle } from "../ui/card";

interface TeamShieldProps {
  team: ITeam;
  showDescription?: boolean;
  direction?: "vertical" | "horzintal";
}

export function TeamShield({
  team,
  showDescription,
  direction = "horzintal",
}: TeamShieldProps) {
  return (
    <div
      className={`h-full    flex  ${
        direction === "vertical" ? "flex-col" : ""
      }  items-center gap-4 `}
    >
      <div className={`${direction === "vertical" ? "h-[60%]" : "h-full"}  `}>
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
      {showDescription && (
        <div className="  ">
          <CardTitle>{team.name}</CardTitle>
          <CardDescription>Categoría: {team.category}</CardDescription>
        </div>
      )}
    </div>
  );
}
