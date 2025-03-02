import { LoaderWrapper } from "@/components/common/loader-wrapper";
import { CourtsMap } from "@/components/map/courts-map";
import { SessionProvider } from "@/components/providers/session-provider";
import { ICourt } from "@/models/court.model";
import { CourtServices } from "@/services/court.services";
import { useEffect, useState } from "react";

export function MainPage() {
  const [courts, setCourts] = useState<ICourt[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCoutrs = async () => {
      setLoading(true);
      const courtsRes = await CourtServices.getAll();
      setCourts(courtsRes);
      setLoading(false);
    };
    fetchCoutrs();
  }, []);

  return (
    <div>
      <SessionProvider>
        <LoaderWrapper loading={loading} text="Cargando canchas...">
          <section className="flex-grow flex items-center justify-center bg-amber-50">
            {courts.length ? <CourtsMap courts={courts} /> : null}
          </section>
        </LoaderWrapper>
      </SessionProvider>
    </div>
  );
}
