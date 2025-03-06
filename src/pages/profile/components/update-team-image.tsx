import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ITeam } from "@/models/team.model";
import { FilesServices } from "@/services/files.services";
import { fetchUpdate } from "@/store/utils/fetchUpdate";
import { message } from "antd";
import { Paperclip, Trash } from "lucide-react";
import { useRef, useState } from "react";

export function TeamImage({ team }: { team: ITeam }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    typeof team.shield === "string" ? team.shield : null
  );
  const [loading, setLoading] = useState(false);
  const { updateTeam } = fetchUpdate();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files?.[0];
    if (!selectedFiles) return;

    setFiles(selectedFiles);

    // Generar vista previa
    const reader = new FileReader();
    reader.readAsDataURL(selectedFiles);
    reader.onload = () => setPreview(reader.result as string);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (files) {
        const imageData = await FilesServices.upload(files);
        const newShieldImage = imageData.url;

        updateTeam(team.id, { shield: newShieldImage });
      }

      message.success("Logo actualizado");
    } catch (error) {
      console.log("Error loading team image", error);
    } finally {
      setLoading(false);
    }
  };
  const clear = () => {
    setPreview(null);
    setFiles(null);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="   space-y-4  ">
      <div className="h-[320px] max-h-[320px] ">
        {preview ? (
          <div className="relative h-full">
            <Button
              type="button"
              className="absolute  rounded-md p-1"
              onClick={clear}
            >
              <Trash className="w-4 h-4 text-white" />
            </Button>
            <img
              src={preview}
              alt="Preview"
              className="rounded-lg object-cover border h-[320px] mx-auto"
            />
          </div>
        ) : (
          <Button
            onClick={handleButtonClick}
            variant="ghost"
            type="button"
            className="flex  gap-2 items-center justify-center h-full border  border-dashed rounded-lg w-full "
          >
            <span className="text-gray-500">No hay imagen cargada</span>
            <Paperclip className="size-4 text-primary" />
          </Button>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <Input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />

        <div className="flex gap-2 ">
          <Button
            type="submit"
            className="flex-grow "
            disabled={loading}
            variant={"secondary"}
          >
            {loading ? "Cargando..." : "Confirmar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
