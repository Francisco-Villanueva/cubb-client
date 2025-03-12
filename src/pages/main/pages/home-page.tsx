import { UserTeamDetails } from "../components/user-team-details";

export function HomePage() {
  return (
    <div className="space-y-4  size-full flex flex-col">
      <div className="">
        <UserTeamDetails />
      </div>
    </div>
  );
}
