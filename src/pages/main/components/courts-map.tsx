import { Stage, Layer, Rect, Text, Line, Circle } from "react-konva";
import { useEffect, useState, useRef, Fragment } from "react";
import { ICourt } from "../../../models/court.model";
import { AppointmnetServices } from "../../../services/appointmnets.services";
import { LoaderWrapper } from "../../../components/common/loader-wrapper";

interface CourtsMapProps {
  courts: ICourt[];
}

type IAvailableList = {
  hs: string;
  available: boolean;
};

const courtsPosition = {
  "Cancha 4": { x: 0, y: 50, width: 120, height: 200 },
  "Cancha 3": { x: 200, y: 50, width: 120, height: 200 },
  "Cancha 9": { x: 400, y: 230, width: 200, height: 120 },
  "Cancha 1": { x: 0, y: 300, width: 120, height: 200 },
  "Cancha 2": { x: 200, y: 300, width: 120, height: 200 },
  "Cancha 11": { x: 0, y: 600, width: 300, height: 200 },
};

export const CourtsMap = ({ courts }: CourtsMapProps) => {
  const [availableList, setAvailableList] = useState<IAvailableList[]>([]);
  const [selectedCancha, setSelectedCancha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mappedCourts, setMappedCourts] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 800 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setStageSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize(); // Ajustar al inicio
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const res = courts.map((court) => {
      if (typeof court.name !== "string") return;
      // @ts-ignore
      const position = courtsPosition[court.name];
      return { id: court.id, name: court.name, ...position };
    });

    setMappedCourts(res);
  }, [courts]);

  const handleClick = async (id: string) => {
    setSelectedCancha(id);

    try {
      setLoading(true);
      const res = await AppointmnetServices.getSlotsBycourtId(
        id,
        new Date().toISOString(),
        90
      );
      setAvailableList(res.availableTimes);
    } catch (error) {
      console.log("Error obteniendo horarios", error);
    } finally {
      setLoading(false);
    }
  };

  if (!mappedCourts.length) return null;

  // Cálculo de escala para ajustar las canchas dinámicamente
  const scaleFactor = Math.min(stageSize.width / 800, stageSize.height / 800);

  return (
    <div className="size-full flex">
      <div ref={containerRef} className="  w-1/2        ">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          scaleX={scaleFactor}
          scaleY={scaleFactor}
          className=" pl-6"
        >
          <Layer>
            {mappedCourts.map((cancha) => {
              const isVertical = cancha.height === 200;

              return (
                <Fragment key={cancha.id}>
                  {/* Fondo de la cancha */}
                  <Rect
                    x={cancha.x}
                    y={cancha.y}
                    width={cancha.width}
                    height={cancha.height}
                    fill={selectedCancha === cancha.id ? "#2ECC71" : "#1E8449"} // Verde más natural
                    stroke="white"
                    strokeWidth={2}
                    onClick={() => handleClick(cancha.id)}
                    cornerRadius={10}
                  />

                  {/* Línea central */}
                  <Line
                    points={
                      isVertical
                        ? [
                            cancha.x,
                            cancha.y + cancha.height / 2,
                            cancha.x + cancha.width,
                            cancha.y + cancha.height / 2,
                          ]
                        : [
                            cancha.x + cancha.width / 2,
                            cancha.y,
                            cancha.x + cancha.width / 2,
                            cancha.y + cancha.height,
                          ]
                    }
                    stroke="white"
                    strokeWidth={2}
                  />

                  {/* Círculo central */}
                  <Circle
                    x={cancha.x + cancha.width / 2}
                    y={cancha.y + cancha.height / 2}
                    radius={15}
                    stroke="white"
                    strokeWidth={2}
                  />

                  {/* Arcos en los extremos */}
                  {isVertical ? (
                    <>
                      {/* Arco superior */}
                      <Line
                        points={[
                          cancha.x + 20,
                          cancha.y,
                          cancha.x + cancha.width - 20,
                          cancha.y,
                        ]}
                        stroke="white"
                        strokeWidth={2}
                      />
                      {/* Arco inferior */}
                      <Line
                        points={[
                          cancha.x + 20,
                          cancha.y + cancha.height,
                          cancha.x + cancha.width - 20,
                          cancha.y + cancha.height,
                        ]}
                        stroke="white"
                        strokeWidth={2}
                      />
                    </>
                  ) : (
                    <>
                      {/* Arco izquierdo */}
                      <Line
                        points={[
                          cancha.x,
                          cancha.y + 20,
                          cancha.x,
                          cancha.y + cancha.height - 20,
                        ]}
                        stroke="white"
                        strokeWidth={2}
                      />
                      {/* Arco derecho */}
                      <Line
                        points={[
                          cancha.x + cancha.width,
                          cancha.y + 20,
                          cancha.x + cancha.width,
                          cancha.y + cancha.height - 20,
                        ]}
                        stroke="white"
                        strokeWidth={2}
                      />
                    </>
                  )}

                  {/* Nombre de la cancha */}
                  <Text
                    text={cancha.name}
                    x={cancha.x}
                    y={cancha.y - 15}
                    fontSize={14}
                    fill="black"
                    align="center"
                    fontStyle="bold"
                    width={cancha.width}
                    wrap="word"
                  />
                </Fragment>
              );
            })}
          </Layer>
        </Stage>
      </div>

      {/* Lista de horarios disponibles */}
      <div className=" flex flex-col  gap-4 p-4 w-1/2 text-gray-800 ">
        <LoaderWrapper loading={loading} text="Cargando horarios...">
          <h3>Horarios de la cancha seleccionada</h3>

          <section className="grid grid-cols-3 gap-4">
            {availableList.map((value) => (
              <div
                className=" w-full h-36 grid place-items-center border rounded-lg p-4 text-center cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-300"
                key={value.hs}
              >
                <p className="font-semibold">{value.hs}</p>
              </div>
            ))}
          </section>
        </LoaderWrapper>
      </div>
    </div>
  );
};
