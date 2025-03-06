import { SessionProvider } from "@/components/providers/session-provider";
import { Route, Routes } from "react-router";
import { DataProvider } from "@/components/providers/data-provider";
import { AdminPage } from "@/pages/admin/pages/admin-page";
import { AdminRouteProtecter } from "@/components/routes/admin-route-protecter";
import { HomePage } from "./home-page";
import { ProfilePage } from "@/pages/profile/pages/profile-page";

export function MainPage() {
  return (
    <DataProvider>
      <SessionProvider>
        <div className=" p-4 w-[800px] max-w-[800px] mx-auto  ">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/admin/*"
              element={
                <AdminRouteProtecter>
                  <AdminPage />
                </AdminRouteProtecter>
              }
            />
          </Routes>
        </div>
      </SessionProvider>
    </DataProvider>
  );
}
