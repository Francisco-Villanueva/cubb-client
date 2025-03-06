import { useAppSelector } from "@/store/hooks";
import { CourtsMap } from "../components/courts-map";
import { UserTeamDetails } from "../components/user-team-details";

export function HomePage() {
  const { courts } = useAppSelector((s) => s.courts);
  return (
    <div className="space-y-4">
      <UserTeamDetails />
      <hr />
      <section className="flex items-center justify-center ">
        {courts.length ? <CourtsMap courts={courts} /> : null}
      </section>
    </div>
  );
}
