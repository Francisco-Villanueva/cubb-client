import { Route, Routes } from "react-router";
import { CourtPage } from "./courts-page";
import { TeamsPage } from "./teams-page";
import { AppointmentsPage } from "./appointments-page";
import { Fragment } from "react";

export function AdminPage() {
  return (
    <Fragment>
      <Routes>
        <Route path="/courts" element={<CourtPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        {/* <Route path="/courts"/> */}
      </Routes>
    </Fragment>
  );
}
