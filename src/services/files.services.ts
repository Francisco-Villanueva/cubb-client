import { BASE_URL } from "@/config/axios.config";
import { IUploadImageAPIResponse } from "@/interfaces/files";
import axios from "axios";

export class FilesServices {
  static async upload(data: File): Promise<IUploadImageAPIResponse> {
    const formData = new FormData();
    formData.append("file", data); // 'file' es el nombre del campo esperado en el backend
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
}
