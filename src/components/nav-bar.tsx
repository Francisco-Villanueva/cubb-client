import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, LogOut, PanelsLeftBottom } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/user.slice";
import { ROLES } from "@/interfaces/roles";

export function NavBar() {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const handleLogOut = () => {
    nav("/login");
    localStorage.clear();
    dispatch(setUser(undefined));
  };

  const { user } = useAppSelector((s) => s.user);

  return (
    <nav className="flex justify-between items-center  px-4 bg-[#1f1f1f]  w-full h-[10vh] ">
      <Link to={"/"}>
        <img src="/logo.jpg" className="size-20 aspect-square rounded-full" />
      </Link>

      {user && user.role === ROLES.TEAM_ADMIN && (
        <section className="text-gray-50 flex items-center gap-8">
          <Link
            to={"/turnos"}
            className="px-4 py-2 rounded-2xl font-medium flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-500 hover:px-5"
          >
            <Calendar className="size-4" />
            Sacar turno
          </Link>
        </section>
      )}
      {user && user.role === ROLES.ADMIN && (
        <section className="text-gray-50 flex items-center gap-8">
          <Link to={"/admin/courts"}>Canchas</Link>
          <Link to={"/admin/teams"}>Equipos</Link>
          <Link to={"/admin/appointments"}>Turnos</Link>
        </section>
      )}
      <section>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <Avatar>
                <AvatarFallback className="uppercase">
                  {user.name[0]}
                  {user.name[1]}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {user.role === ROLES.ADMIN && (
                <DropdownMenuItem>
                  <Link to={"/admin"} className="flex items-center gap-1">
                    <PanelsLeftBottom className="size-4" />
                    Administrar
                  </Link>
                </DropdownMenuItem>
              )}
              {user.role === ROLES.TEAM_ADMIN && (
                <DropdownMenuItem>
                  <Link to={"/profile"} className="flex items-center gap-1">
                    <PanelsLeftBottom className="size-4" />
                    Administrar
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={handleLogOut}
                className="flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="size-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </section>
    </nav>
  );
}
