import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ITeam } from "@/models/team.model";
import { Button } from "@/components/ui/button";
import { EditIcon, EllipsisVertical, XIcon } from "lucide-react";
import CreateTeamAdminForm from "./create-admin-form";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { ROLES } from "@/interfaces/roles";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TeamShield } from "@/components/common/team-shield";

interface TeamItemListProps {
  team: ITeam;
}
type ActionType = "edit" | "createAdmin" | "delete";
export function TeamListItem({ team }: TeamItemListProps) {
  const { users } = useAppSelector((s) => s.user);
  const [action, setAction] = useState<ActionType>();
  const [openEditor, setOpenEditor] = useState(false);

  const toggleEditor = () => {
    setOpenEditor((state) => !state);
  };
  const handleClose = () => {
    setAction(undefined);
  };

  const teamUsers = users.filter((u) => u.TeamId === team.id);
  const teamAdmin = teamUsers.find((u) => u.role === ROLES.TEAM_ADMIN);
  return (
    <div className=" border p-1">
      <div className="flex justify-between w-full ">
        <div className="h-14">
          <TeamShield team={team} showDescription />
        </div>

        <div className="flex items-center gap-1">
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
                }}
              >
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAction("createAdmin");
                }}
              >
                Administradores
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setAction("delete");
                }}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {action && action === "createAdmin" && (
        <>
          {!!teamAdmin && !openEditor ? (
            <div className="border-t">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Administrador de {team.name}</CardTitle>
                  <div>
                    <Button onClick={toggleEditor} variant={"ghost"}>
                      <EditIcon className="size-4" />
                    </Button>
                    <Button onClick={handleClose} variant={"ghost"}>
                      <XIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nombre</Label>
                  <br />
                  <Input value={teamAdmin.name} />
                </div>
                <hr />
                <div>
                  <Label>Nombre de Usuario</Label>
                  <br />
                  <Input value={teamAdmin.userName} />
                </div>
              </CardContent>
            </div>
          ) : (
            <CreateTeamAdminForm
              key={team.id}
              team={team}
              handleClose={handleClose}
              teamAdmin={teamAdmin}
            />
          )}
        </>
      )}
    </div>
  );
}
