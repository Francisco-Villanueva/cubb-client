import { Button } from "@/components/ui/button";
import { CourtList } from "../components/courts-list";
import CourtForm from "../components/create-court-form";

export function AdminPage() {
  return (
    <div className=" flex flex-col h-full  ">
      <nav className="p-4 flex gap-4">
        <Button> Turnos</Button>
        <Button> Equipos</Button>
        <Button> Ingresos</Button>
        <Button> Configuraciones</Button>
      </nav>
      <section className=" px-4 flex-1 max-h-[90%] ">
        <div className="flex  flex-col gap-4  h-full max-h-[100%] overflow-auto ">
          <section className="h-1/2">
            <CourtList />
          </section>
          <section className="w-1/3 ">
            <CourtForm />
          </section>
        </div>
      </section>
    </div>
  );
}
