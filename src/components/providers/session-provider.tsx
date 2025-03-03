import { Fragment, PropsWithChildren, useEffect } from "react";
import { AuthServices } from "@/services/auth.services";
import { useNavigate } from "react-router";
import { setAuthInterceptor } from "@/config/axios.config";
import { message } from "antd";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/user.slice";

export function SessionProvider({ children }: PropsWithChildren) {
  const nav = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!accessToken) return;
    const validateSession = async () => {
      try {
        await setAuthInterceptor(accessToken);
        const res = await AuthServices.me();
        dispatch(setUser(res));
        nav("/");
      } catch (error) {
        console.log("falla el /me", error);
        dispatch(setUser(undefined));
        message.info("Session expirada");
        localStorage.clear();
        nav("/login");
      }
    };

    validateSession();
  }, []);
  return <Fragment>{children}</Fragment>;
}
