import { WorkhoursEditor } from "@/components/common/wh-editor";
import WorkhourList from "@/components/common/work-hour-list";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ICourt } from "@/models/court.model";
import { useAppSelector } from "@/store/hooks";
import { EllipsisVertical, PenIcon } from "lucide-react";
import React from "react";

export const CourtList: React.FC = () => {
  const { courts } = useAppSelector((state) => state.courts);
  const [selectedCourt, setSelectedCourt] = React.useState<ICourt | null>(null);
  const [type, setType] = React.useState<"edit" | "detail">("detail");

  const selectCourt = (court: ICourt, type: string) => {
    if (type === "edit") {
      setType("edit");
      setSelectedCourt(court);
    }
    if (type === "detail") {
      setType("detail");
      setSelectedCourt(court);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4    space-y-4 ">
      <div className="flex   gap-2   flex-col justify-between h-full ">
        {courts.map((court) => (
          <div
            key={court.id}
            className={` p-2 border border-border rounded-md  flex justify-between items-center gap-2  ${
              selectedCourt?.id === court.id ? "bg-sky-50" : ""
            }`}
          >
            <h2>{court.name}</h2>
            <div className="">
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => selectCourt(court, "detail")}
              >
                <EllipsisVertical className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size={"icon"}
                onClick={() => selectCourt(court, "edit")}
              >
                <PenIcon className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <section className="flex-grow">
        {selectedCourt && selectedCourt?.workhours && (
          <div className="text-gray-800  space-y-2">
            <p className="font-semibold">{selectedCourt.name}</p>
            <Separator />
            {type === "edit" ? (
              <>
                <WorkhoursEditor
                  id={selectedCourt.id}
                  workhours={selectedCourt.workhours}
                />
              </>
            ) : (
              <>
                <WorkhourList worhHours={selectedCourt?.workhours} />
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
