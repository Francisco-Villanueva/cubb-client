import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { message } from "antd";
import { CreateTeamAdminZodSchema, ICreateUser } from "@/models/user.model";
import { AuthServices } from "@/services/auth.services";
import { ITeam } from "@/models/team.model";
import { XIcon } from "lucide-react";
interface INewAuth {
  confirmPassword: string;
}
export default function CreateTeamAdminForm({
  team,
  handleClose,
}: {
  team: ITeam;
  handleClose: () => void;
}) {
  const DEFAULT_DATA: ICreateUser & INewAuth = {
    email: "",
    lastName: "",
    name: "",
    password: "",
    confirmPassword: "",
    userName: "",
    role: "TEAM_ADMIN",
    TeamId: team.id,
  };
  const form = useForm<ICreateUser & INewAuth>({
    resolver: zodResolver(CreateTeamAdminZodSchema),
    defaultValues: DEFAULT_DATA,
  });

  const onSubmit = async (data: ICreateUser) => {
    try {
      await AuthServices.register(data);
      message.success("Admin creado correctamente");
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
    <div className="border-t">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Crear Admin para {team.name}</CardTitle>
          <Button onClick={handleClose} variant={"ghost"}>
            <XIcon className="size-4" />
          </Button>
        </div>
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
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de Usuario</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre de usuario" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="**************" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="**************" />
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
    </div>
  );
}
