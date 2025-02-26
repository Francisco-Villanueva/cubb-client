import { useEffect, useState } from "react";
import "./App.css";
import { CourtServices } from "./services/court.services";
import { ICourt } from "./models/court.model";

function App() {
  const [courts, setCourts] = useState<ICourt[]>([]);

  useEffect(() => {
    const fetchCoutrs = async () => {
      const courtsRes = await CourtServices.getAll();

      setCourts(courtsRes);
    };
    fetchCoutrs();
  }, []);

  return (
    <>
      <div>
        {courts.map((court) => (
          <div>
            <h2>{court.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
