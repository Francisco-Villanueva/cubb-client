import { Navigate } from "react-router";

export function AdminRouteProtecter({
  children,
}: {
  children: React.ReactNode;
}) {
  const userLogged = localStorage.getItem("userLogged");
  const user = JSON.parse(userLogged || "{}");
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
