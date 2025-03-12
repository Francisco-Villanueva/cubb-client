import { useAppSelector } from "@/store/hooks";
import { CourtsMap } from "../components/courts-map";

export function AppointmentsPage() {
  const { courts } = useAppSelector((s) => s.courts);
  return (
    <div className="space-y-4  size-full flex flex-col">
      <section className="flex items-center justify-center  flex-grow ">
        {courts.length ? <CourtsMap courts={courts} /> : null}
      </section>
    </div>
  );
}
