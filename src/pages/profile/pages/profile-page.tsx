import { useAppSelector } from "@/store/hooks";
import { TeamCard } from "../components/team-card";
import { TeamImage } from "../components/update-team-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProfilePage() {
  const { user } = useAppSelector((s) => s.user);
  const { teams } = useAppSelector((s) => s.team);
  if (!user || !user.TeamId) return;

  const team = teams.find((el) => el.id === user.TeamId);

  if (!team) return;

  return (
    <div className="flex items-center gap-2">
      <TeamCard team={team} />
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cargar Logo</DialogTitle>
          </DialogHeader>
          <TeamImage team={team} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
