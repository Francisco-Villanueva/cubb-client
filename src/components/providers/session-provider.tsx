import { Fragment, PropsWithChildren } from "react";
// import { AuthServices } from "@/services/auth.services";
// import { useNavigate } from "react-router";

export function SessionProvider({ children }: PropsWithChildren) {
  // const nav = useNavigate();

  // useEffect(() => {
  //   const validateSession = async () => {
  //     try {
  //       await AuthServices.me();
  //       location.replace("/");
  //     } catch (error) {
  //       localStorage.clear();
  //       nav("/login");
  //     }
  //   };

  //   // validateSession();
  // }, []);
  return <Fragment>{children}</Fragment>;
}
