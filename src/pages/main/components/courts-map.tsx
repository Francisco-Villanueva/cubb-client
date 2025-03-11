import { useState } from "react";
import { ICourt } from "../../../models/court.model";
import { AppointmnetServices } from "../../../services/appointmnets.services";
import { LoaderWrapper } from "../../../components/common/loader-wrapper";

import { Calendar } from "@/components/ui/calendar";
import { MapPinned } from "lucide-react";

interface CourtsMapProps {
  courts: ICourt[];
}

type IAvailableList = {
  hs: string;
  available: boolean;
};

export const CourtsMap = ({ courts }: CourtsMapProps) => {
  const [availableList, setAvailableList] = useState<IAvailableList[]>([]);
  const [selectedCancha, setSelectedCancha] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(false);

  const handleChangeDate = async (newDate?: Date) => {
    setDate(newDate);
    if (!selectedCancha || !newDate) return;
    try {
      setLoading(true);
      const res = await AppointmnetServices.getSlotsBycourtId(
        selectedCancha,
        newDate.toISOString(),
        90
      );
      setAvailableList(res.availableTimes);
    } catch (error) {
      console.log("Error obteniendo horarios", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClick = async (id: string) => {
    setSelectedCancha(id);
    if (!date) return;
    if (selectedCancha === id) return;
    try {
      setLoading(true);
      const res = await AppointmnetServices.getSlotsBycourtId(
        id,
        date.toISOString(),
        90
      );
      setAvailableList(res.availableTimes);
    } catch (error) {
      console.log("Error obteniendo horarios", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="size-full flex flex-col ">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleChangeDate}
        className="rounded-md border mx-auto"
      />
      <section className="flex py-4 flex-grow gap-4">
        <div className="  w-1/2  flex flex-col gap-4">
          {courts.map((court) => (
            <div
              className={`flex items-center gap-2 p-2 border   transition-all duration-150 cursor-pointer ${
                selectedCancha === court.id
                  ? "bg-green-600 text-white font-semibold hover:bg-"
                  : "hover:bg-accent"
              }`}
              onClick={() => handleClick(court.id)}
            >
              <MapPinned className="size-4" />
              <p>{court.name}</p>
            </div>
          ))}
        </div>

        <div className=" flex flex-col items-center gap-4 p-4 w-1/2 text-gray-800  ">
          <LoaderWrapper loading={loading} text="Cargando horarios...">
            <h3>Horarios de la cancha seleccionada</h3>

            <section className="flex flex-col gap-2  w-full">
              {availableList.map((value) => (
                <div
                  className=" w-full h-16 grid place-items-center border rounded-lg p-4 text-center cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-300"
                  key={value.hs}
                >
                  <p className="font-semibold">{value.hs}</p>
                </div>
              ))}
            </section>
          </LoaderWrapper>
        </div>
      </section>
    </div>
  );
};
