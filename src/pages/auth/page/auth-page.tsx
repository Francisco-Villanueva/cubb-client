import { Link } from "react-router";
import { LoginForm, RegisterForm } from "../components";
type PageType = "login" | "register";
interface AuthPageProps {
  type: PageType;
}
interface IConfigBody {
  title: string;
  description: string;
  footerMessage: string;
  oppositeLink: string;
  oppositeRoute: string;
}
const Config: Record<PageType, IConfigBody> = {
  login: {
    title: "Iniciar Sesion",
    description: "Enter your email below to login to your account",
    footerMessage: " No tenés cuenta?",
    oppositeLink: "  Registrate",
    oppositeRoute: "/register",
  },
  register: {
    title: "Crear cuenta",
    description: "Ingresar tu inforamción para crear una cuenta en ReservePro",
    footerMessage: "Ya tenés cuenta?",
    oppositeLink: "Iniciar Sesión",
    oppositeRoute: "/login",
  },
};
export function AuthPage({ type }: AuthPageProps) {
  const { footerMessage, oppositeLink, oppositeRoute } = Config[type];
  return (
    <div className="  size-full ">
      <div className="flex flex-col justify-center gap-2 text-xs py-2 flex-grow bg  h-full ">
        <div className="  w-5/6 max-w-[550px] mx-auto  ">
          {type === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

        <div className=" text-center text-sm flex gap-3 items-center   justify-center">
          <p>{footerMessage}</p>
          <Link to={oppositeRoute} className="underline">
            {oppositeLink}
          </Link>
        </div>
      </div>
    </div>
  );
}
