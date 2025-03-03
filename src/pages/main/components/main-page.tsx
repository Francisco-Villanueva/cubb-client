import { SessionProvider } from "@/components/providers/session-provider";
import { Route, Routes } from "react-router";
import { DataProvider } from "@/components/providers/data-provider";
import { AdminPage } from "@/pages/admin/page/admin-page";
import { AdminRouteProtecter } from "@/components/routes/admin-route-protecter";
import { HomePage } from "../pages/home-page";

export function MainPage() {
  return (
    <DataProvider>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <AdminRouteProtecter>
                <AdminPage />
              </AdminRouteProtecter>
            }
          />
        </Routes>
      </SessionProvider>
    </DataProvider>
  );
}
