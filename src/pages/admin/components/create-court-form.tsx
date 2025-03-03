import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateCourtZodSchema, ICreateCourt } from "@/models/court.model";
import { fetchCreate } from "@/store/utils/fetchCreate";
import { message } from "antd";
export default function CourtForm() {
  const form = useForm<ICreateCourt>({
    resolver: zodResolver(CreateCourtZodSchema),
    defaultValues: { name: "" },
  });
  const { createCourt } = fetchCreate();
  const onSubmit = async (data: ICreateCourt) => {
    try {
      await createCourt(data);
      message.success("Cancha creada correctamente");
      form.reset();
    } catch (error) {
      console.log("Error creating court", error);
      if (typeof error === "string") {
        message.error(error);
      }
      message.error("Error creando la cancha");
    }
  };

  return (
    <Card className="  w-full">
      <CardHeader>
        <CardTitle>Crear Cancha</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre de la cancha" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Creando..." : "Crear"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
