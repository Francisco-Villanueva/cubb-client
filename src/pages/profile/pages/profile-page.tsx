import { useAppSelector } from "@/store/hooks";
import { TeamCard } from "../components/team-card";

export function ProfilePage() {
  const { user } = useAppSelector((s) => s.user);
  const { teams } = useAppSelector((s) => s.team);
  if (!user || !user.TeamId) return;

  const team = teams.find((el) => el.id === user.TeamId);

  console.log({ user, teams, team });
  if (!team) return;

  return (
    <div>
      <TeamCard team={team} showNextMatch />
    </div>
  );
}
