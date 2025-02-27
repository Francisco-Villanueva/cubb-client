import { Stage, Layer, Rect, Text } from "react-konva";
import { useEffect, useState, Fragment } from "react";
import { ICourt } from "../../models/court.model";
import { AppointmnetServices } from "../../services/appointmnets.services";

interface CourtsMapProps {
  courts: ICourt[];
}
type IAvailableList = {
  hs: string;
  available: boolean;
};
const courtsPosition = {
  "Cancha 4": {
    x: 0,
    y: 50,
    width: 120,
    height: 200,
  },
  "Cancha 3": {
    x: 200,
    y: 50,
    width: 120,
    height: 200,
  },
  "Cancha 9": {
    x: 400,
    y: 230,
    width: 200,
    height: 120,
  },
  "Cancha 1": {
    x: 0,
    y: 300,
    width: 120,
    height: 200,
  },
  "Cancha 2": {
    x: 200,
    y: 300,
    width: 120,
    height: 200,
  },
  "Cancha 11": {
    x: 0,
    y: 600,
    width: 300,
    height: 200,
  },
};

export const CourtsMap = ({ courts }: CourtsMapProps) => {
  const [availableList, setAvailableList] = useState<IAvailableList[]>([]);
  const [selectedCancha, setSelectedCancha] = useState("");
  const [mappedCourts, setMappedCourts] = useState<any[]>([]);

  useEffect(() => {
    const res = courts.map((court) => {
      if (typeof court.name !== "string") return;
      // @ts-ignore
      const position = courtsPosition[court.name];
      return {
        id: court.id,
        name: court.name,
        ...position,
      };
    });

    setMappedCourts(res);
  }, []);

  console.log({ mappedCourts });

  const handleClick = async (id: string) => {
    setSelectedCancha(id);
    console.log(`Cancha seleccionada: ${id}`);

    try {
      const res = await AppointmnetServices.getSlotsBycourtId(
        id,
        new Date().toISOString(),
        90
      );

      setAvailableList(res.availableTimes);
    } catch (error) {
      console.log("error fetchi slots", error);
    }

    // Aquí podrías abrir un modal o redirigir a la reserva
  };

  if (!mappedCourts.length) return;

  console.log("availableList", availableList);
  return (
    <>
      <Stage width={800} height={800}>
        <Layer>
          {mappedCourts.map((cancha) => (
            <Fragment>
              <Rect
                key={cancha.id}
                x={cancha.x}
                y={cancha.y}
                width={cancha.width}
                height={cancha.height}
                fill={selectedCancha === cancha.id ? "green" : "lightgray"}
                stroke="black"
                strokeWidth={2}
                onClick={() => handleClick(cancha.id)}
                cornerRadius={10}
              />
              <Text
                text={cancha.name}
                x={cancha.x} // Centrar horizontalmente
                y={cancha.y + cancha.height / 2 - 10} // Centrar verticalmente
                fontSize={16}
                fill="black"
                align="center"
                verticalAlign="middle"
                width={cancha.width} // Permite que el texto se centre
                wrap="word"
              />
            </Fragment>
          ))}
        </Layer>
      </Stage>
      <div className=" flex  flex-wrap items-start justify-start gap-2   w-full">
        {availableList.map((value) => (
          <div
            className={`border  size-36 flex-grow    grid place-items-center    cursor-pointer hover:bg-primary hover:text-white transition-all duration-300 `}
            //   onClick={() => handleSelectTime(value.hs)}
            key={value.hs}
          >
            <p>{value.hs}</p>
          </div>
        ))}
      </div>
    </>
  );
};
