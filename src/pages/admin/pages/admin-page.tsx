import { Route, Routes } from "react-router";
import { CourtPage } from "./courts-page";
import { TeamsPage } from "./teams-page";
import { AppointmentsPage } from "./appointments-page";

export function AdminPage() {
  return (
    <div className=" p-4 w-[800px] max-w-[800px] mx-auto  ">
      <Routes>
        <Route path="/courts" element={<CourtPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        {/* <Route path="/courts"/> */}
      </Routes>
    </div>
  );
}
