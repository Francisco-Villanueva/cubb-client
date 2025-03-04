import { CourtList } from "../components/courts-list";
import CourtForm from "../components/create-court-form";

export function CourtPage() {
  return (
    <section className="flex flex-col gap-4">
      <CourtForm />
      <CourtList />
    </section>
  );
}
