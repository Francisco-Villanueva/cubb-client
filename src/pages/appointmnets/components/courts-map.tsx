import { useState } from "react";
import { ICourt } from "../../../models/court.model";
import { AppointmnetServices } from "../../../services/appointmnets.services";
import { LoaderWrapper } from "../../../components/common/loader-wrapper";

import { Calendar } from "@/components/ui/calendar";
import { MapPinned } from "lucide-react";
import { ICreateAppointment } from "@/models/appointmnet.model";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";

interface CourtsMapProps {
  courts: ICourt[];
}

type IAvailableList = {
  hs: string;
  available: boolean;
};

export const CourtsMap = ({ courts }: CourtsMapProps) => {
  const { user } = useAppSelector((s) => s.user);
  const [availableList, setAvailableList] = useState<IAvailableList[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date()); // date state for calendar
  const [loading, setLoading] = useState(false);
  const [appointmnetData, setAppointmnetData] = useState<ICreateAppointment>({
    date: "",
    duration: 90,
    price: 0,
    name: "",
    CourtId: "",
    TeamId: user?.TeamId || "",
    time: "",
  });
  const handleChangeDate = async (newDate?: Date) => {
    setDate(newDate);
    if (!appointmnetData.CourtId || !newDate) return;
    setAppointmnetData((s) => ({
      ...s,
      date: newDate?.toISOString(),
      time: "",
    }));
    try {
      setLoading(true);
      console.log(newDate.toISOString());
      const res = await AppointmnetServices.getSlotsBycourtId(
        appointmnetData.CourtId,
        newDate.toISOString(),
        90
      );
      console.log("res", res);
      setAvailableList(res.availableTimes);
    } catch (error) {
      console.log("Error obteniendo horarios", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSelectCourt = async (id: string) => {
    setAppointmnetData((s) => ({ ...s, CourtId: id, time: "" }));
    if (!date) return;
    if (appointmnetData.CourtId === id) return;
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

  const handleSelectTime = (time: string) => {
    setAppointmnetData((s) => ({ ...s, time }));
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
                appointmnetData.CourtId === court.id
                  ? "bg-green-600 text-white font-semibold hover:bg-"
                  : "hover:bg-accent"
              }`}
              onClick={() => handleSelectCourt(court.id)}
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
                <Button
                  variant={
                    appointmnetData.time === value.hs
                      ? "secondary"
                      : "secondary"
                  }
                  onClick={() => handleSelectTime(value.hs)}
                  disabled={!value.available}
                  className={` ${
                    appointmnetData.time === value.hs
                      ? "bg-green-600 text-white font-semibold hover:bg-"
                      : ""
                  } w-full h-16  p-4 text-center `}
                  key={value.hs}
                >
                  <p className="font-semibold">{value.hs}</p>
                </Button>
              ))}
            </section>
          </LoaderWrapper>
        </div>
      </section>
    </div>
  );
};
