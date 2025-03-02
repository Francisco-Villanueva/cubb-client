import { CourtsMap } from "./courts-map";
import { SessionProvider } from "@/components/providers/session-provider";

import { Route, Routes } from "react-router";
import { AdminPage } from "@/pages/admin/page/admin-page";
import { AdminRouteProtecter } from "@/components/routes/admin-route-protecter";
import { DataProvider } from "@/components/providers/data-provider";
import { useAppSelector } from "@/store/hooks";

export function MainPage() {
  const { courts } = useAppSelector((s) => s.courts);
  return (
    <DataProvider>
      <SessionProvider>
        <Routes>
          <Route
            path="/"
            element={
              <section className="flex-grow flex items-center justify-center bg-amber-50">
                {courts.length ? <CourtsMap courts={courts} /> : null}
              </section>
            }
          />
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
