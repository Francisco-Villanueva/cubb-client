import { useAppSelector } from "@/store/hooks";

export function UserTeamDetails() {
  const { user } = useAppSelector((s) => s.user);
  const { teams } = useAppSelector((s) => s.team);

  if (!user || !user.TeamId) return;

  const team = teams.find((el) => el.id === user.TeamId);

  if (!team) return;

  return (
    <div>
      <p>{team.name}</p>
    </div>
  );
}
