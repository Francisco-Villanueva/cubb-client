import { AppointmentDetails } from "@/components/common/appointmnet-details";
import { useAppSelector } from "@/store/hooks";

export function AppointmentsPage() {
  const { appointments } = useAppSelector((s) => s.appointments);
  return (
    <section className=" px-4 flex-1 max-h-[90%] ">
      <div className="flex  flex-col gap-4  h-full max-h-[100%] overflow-auto ">
        Turnos
      </div>
      <div className="flex  flex-col gap-4  h-full max-h-[100%] overflow-auto ">
        {appointments.map((app) => (
          <div>
            <AppointmentDetails appointment={app} />
          </div>
        ))}
      </div>
    </section>
  );
}
