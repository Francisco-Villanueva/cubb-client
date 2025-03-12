import { TeamCard } from "@/pages/profile/components/team-card";
import { useAppSelector } from "@/store/hooks";

export function UserTeamDetails() {
  const { user } = useAppSelector((s) => s.user);
  const { teams } = useAppSelector((s) => s.team);

  if (!user || !user.TeamId) return;

  const team = teams.find((el) => el.id === user.TeamId);

  if (!team) return;

  return <TeamCard team={team} showNextMatch size="lg" direction="vertical" />;
}
