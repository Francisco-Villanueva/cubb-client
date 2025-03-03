import { Link, useNavigate } from "react-router";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, PanelsLeftBottom } from "lucide-react";
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
      <section>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full">
              <Avatar>
                <AvatarFallback>
                  {user.name[0]}
                  {user.lastName[0]}
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
