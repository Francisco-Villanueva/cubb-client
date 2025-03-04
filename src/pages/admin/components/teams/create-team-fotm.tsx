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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchCreate } from "@/store/utils/fetchCreate";
import { message } from "antd";
import { CreateTeamZodSchema, ICreateTeam } from "@/models/team.model";
import { TEAM_CATEGORY_VALUES } from "@/interfaces/teams-category";

export default function TeamForm() {
  const form = useForm<ICreateTeam>({
    resolver: zodResolver(CreateTeamZodSchema),
    defaultValues: { name: "" },
  });
  const { createTeam } = fetchCreate();
  const onSubmit = async (data: ICreateTeam) => {
    try {
      console.log(data);
      await createTeam(data);
      message.success("Cancha creada correctamente");
      form.reset();
      form.setValue("category", "");
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
        <CardTitle>Crear Equipo</CardTitle>
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
                    <Input {...field} placeholder="Nombre del equipo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(e) => form.setValue("category", e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Categroia" />
                      </SelectTrigger>
                      <SelectContent>
                        {TEAM_CATEGORY_VALUES.map((e) => (
                          <SelectItem value={e}>{e}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
