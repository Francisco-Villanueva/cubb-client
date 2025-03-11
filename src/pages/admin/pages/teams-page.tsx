import { useAppSelector } from "@/store/hooks";
import TeamForm from "../components/teams/create-team-fotm";
import { TeamListItem } from "../components/teams/team-list-item";

export function TeamsPage() {
  const { teams } = useAppSelector((s) => s.team);

  return (
    <section className="max-w-full w-full  space-y-4 ">
      <TeamForm />
      <div className=" p-2 flex flex-col gap-2">
        {teams.map((team) => (
          <TeamListItem team={team} key={team.id} />
        ))}
      </div>
    </section>
  );
}
