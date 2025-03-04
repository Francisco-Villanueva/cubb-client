import { useAppSelector } from "@/store/hooks";
import TeamForm from "../components/teams/create-team-fotm";
import { EllipsisVertical, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import CreateTeamAdminForm from "../components/teams/create-admin-form";
import { ITeam } from "@/models/team.model";
type ActionType = "edit" | "createAdmin" | "delete";
export function TeamsPage() {
  const { teams } = useAppSelector((s) => s.team);
  const [action, setAction] = useState<ActionType>();
  const [selectedTeam, setSelectedTeam] = useState<ITeam>();

  const handleClose = () => {
    setAction(undefined);
    setSelectedTeam(undefined);
  };

  return (
    <section className="max-w-full w-full  space-y-4 ">
      <TeamForm />
      <div className=" p-2 flex flex-col gap-2">
        {teams.map((team) => (
          <div className=" border p-1">
            <div className="flex justify-between w-full p-1">
              <div className="flex items-center gap-1">
                {team.shield ? (
                  <img
                    src={team.shield}
                    className="size-[50px] aspect-square object-cover"
                  />
                ) : (
                  <Shield />
                )}
                <p>{team.name}</p>
              </div>
              <div className="flex items-center gap-1">
                <p>{team.category}</p>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size={"icon"}>
                      <EllipsisVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{team.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setAction("edit");
                        setSelectedTeam(team);
                      }}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setAction("createAdmin");
                        setSelectedTeam(team);
                      }}
                    >
                      Crear Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setAction("delete");
                        setSelectedTeam(team);
                      }}
                    >
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {action && selectedTeam?.id === team.id
              ? action === "createAdmin" && (
                  <CreateTeamAdminForm
                    key={team.id}
                    team={selectedTeam}
                    handleClose={handleClose}
                  />
                )
              : null}
          </div>
        ))}
      </div>
    </section>
  );
}
