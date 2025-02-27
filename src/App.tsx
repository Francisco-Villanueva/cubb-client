import { useEffect, useState } from "react";
import "./App.css";
import { CourtServices } from "./services/court.services";
import { ICourt } from "./models/court.model";
import { CourtsMap } from "./components/map/courts-map";

function App() {
  const [courts, setCourts] = useState<ICourt[]>([]);

  useEffect(() => {
    const fetchCoutrs = async () => {
      const courtsRes = await CourtServices.getAll();
      console.log("courtsRes", courtsRes);
      setCourts(courtsRes);
    };
    fetchCoutrs();
  }, []);

  return (
    <>
      <div className="flex w-full">
        {courts.length ? <CourtsMap courts={courts} /> : null}
      </div>
    </>
  );
}

export default App;
