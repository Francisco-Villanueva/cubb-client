import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2Icon, KeyIcon, Mail, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthServices } from "@/services/auth.services";
import { ICreateUser, UserZodSchema } from "@/models/user.model";
interface INewAuth {
  confirmPassword: string;
}
const DEFAULT_DATA: ICreateUser & INewAuth = {
  email: "",
  lastName: "",
  name: "",
  password: "",
  confirmPassword: "",
  role: "ADMIN",
  userName: "",
};

export function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ICreateUser & INewAuth>({
    resolver: zodResolver(UserZodSchema),
    defaultValues: DEFAULT_DATA,
  });

  const onSubmit = async (values: ICreateUser) => {
    setLoading(true);
    try {
      await AuthServices.register(values);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" h-full">
          <div className=" flex flex-col justify-center gap-4 h-full ">
            <div className="w-full flex flex-col   justify-center    gap-4">
              <div className="flex gap-4 ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="email">Nombre</Label>
                      <div className="relative ">
                        <Input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                          {...field}
                          placeholder="Enter your first name"
                        />
                        <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="email">Apellido</Label>
                      <div className="relative">
                        <Input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                          {...field}
                          placeholder="Enter your last name"
                        />
                        <User2Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4 ">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                          {...field}
                          placeholder="example@email.com"
                        />
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={() => (
                    <FormItem className="w-1/2">
                      <Label htmlFor="team">Equipo</Label>
                      <FormControl>
                        <Select>
                          <SelectTrigger>
                            <Shield className="pointer-events-none  h-[18px] w-[18px]  text-gray-500 peer-focus:text-gray-900" />
                            <SelectValue placeholder="Equipos" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <section className="flex flex-col gap-2 ">
                <FormField
                  control={form.control}
                  name="userName"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Nombre de Usuario</Label>
                      <div className="relative">
                        <Input
                          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                          {...field}
                          placeholder="Nombre de Usuario"
                        />
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="flex  gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <Label htmlFor="password">Contraseña</Label>
                        <div className="relative">
                          <Input
                            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            {...field}
                            placeholder="******"
                            type="password"
                          />
                          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <Label htmlFor="password">Confirmar Contraseña</Label>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                              {...field}
                              placeholder="******"
                              type="password"
                            />
                          </FormControl>
                          <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>
            </div>
            <section className=" flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full text-white"
                disabled={loading}
                isLoading={loading}
              >
                Crear Cuenta
              </Button>
              <Button variant="outline" className="w-full" disabled>
                Sign Up with Google
              </Button>
            </section>
          </div>
        </form>
      </Form>
    </>
  );
}
