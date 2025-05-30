import { useState } from "react";
import { ICourt } from "../../../models/court.model";
import { AppointmnetServices } from "../../../services/appointmnets.services";
import { LoaderWrapper } from "../../../components/common/loader-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CheckCircle, MapPinned } from "lucide-react";
import {
  CreateAppointmentSchema,
  ICreateAppointment,
} from "@/models/appointmnet.model";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import { message } from "antd";
import { fetchCreate } from "@/store/utils/fetchCreate";
import { FromatedDate } from "@/components/common/format-date";
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
  const [saving, setSaving] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [appointmnetData, setAppointmnetData] = useState<ICreateAppointment>({
    date: new Date().toISOString(),
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
      const res = await AppointmnetServices.getSlotsBycourtId(
        appointmnetData.CourtId,
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

  const { createAppointment } = fetchCreate();
  const handleSubmit = async () => {
    try {
      setSaving(true);
      CreateAppointmentSchema.parse(appointmnetData);
      await createAppointment(appointmnetData);
      message.success("Reserva creada correctamente");
      setIsConfirmed(false);
    } catch (error) {
      console.log("first error", error);
      console.log(
        "second error",
        CreateAppointmentSchema.safeParse(appointmnetData).error
      );
    } finally {
      setSaving(false);
    }
    CreateAppointmentSchema.safeParse(appointmnetData);
    const res = CreateAppointmentSchema.safeParse(appointmnetData).success;
    console.log(res);
    // Here you can call the service to create the appointment
  };

  if (isConfirmed)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 w-[300px]">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <CheckCircle className="text-green-500 size-16" />
            <h2 className="text-xl font-bold">¡Reserva Confirmada!</h2>
            <p className="font-semibold flex items-center gap-2">
              <MapPinned className="size-4" />
              {
                courts.find((court) => court.id === appointmnetData.CourtId)
                  ?.name
              }
            </p>
            <p className="font-semibold">
              <FromatedDate date={appointmnetData.date} />
            </p>
            <p className="font-semibold">Hora: {appointmnetData.time}</p>

            <p className="font-semibold"> ${27000 * 2}</p>
          </div>
        </div>
        <Button
          onClick={() => {
            setAppointmnetData({
              date: "",
              duration: 90,
              price: 0,
              name: "",
              CourtId: "",
              TeamId: user?.TeamId || "",
              time: "",
            });
            setIsConfirmed(false);
          }}
          className="bg-gradient-to-r from-gray-700 to-gray-500"
        >
          Volver
        </Button>
      </div>
    );
  return (
    <div className="size-full flex flex-col gap-4 ">
      <section className="flex flex-col gap-4 items-center justify-center">
        <Select onValueChange={(value) => handleSelectCourt(value)}>
          <SelectTrigger className="w-[250px] m-0">
            <SelectValue placeholder="Seleccionar Cancha" />
          </SelectTrigger>
          <SelectContent>
            {courts.map((court) => (
              <SelectItem value={court.id}>
                <div
                  className={`flex items-center gap-2 p-2    transition-all duration-150 cursor-pointer`}
                >
                  <MapPinned className="size-4" />
                  <p>{court.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleChangeDate}
          className="border border-gray-200 rounded-lg mx-auto"
        />
      </section>

      <section className=" flex-grow space-y-2  w-[250px] mx-auto">
        <LoaderWrapper loading={loading} text="Cargando horarios...">
          <section className="flex flex-col gap-2  w-full">
            {availableList.map((value) => (
              <Button
                variant={
                  appointmnetData.time === value.hs ? "secondary" : "secondary"
                }
                onClick={() => handleSelectTime(value.hs)}
                disabled={!value.available}
                className={` ${
                  appointmnetData.time === value.hs
                    ? "bg-gradient-to-r from-gray-700 to-gray-500 text-white font-semibold hover:bg-"
                    : ""
                } w-full h-16  p-4 text-center `}
                key={value.hs}
              >
                <p className="font-semibold">{value.hs}</p>
              </Button>
            ))}
          </section>
        </LoaderWrapper>
      </section>

      <Button
        onClick={handleSubmit}
        disabled={!CreateAppointmentSchema.safeParse(appointmnetData).success}
        isLoading={saving}
        className="bg-gradient-to-r from-gray-700 to-gray-500"
      >
        Reservar
      </Button>
    </div>
  );
};
