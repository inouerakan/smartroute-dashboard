import { useMemo, useState } from "react";
import ViewToggle from "@/components/ui/ViewToggle";
import stationsData from "@/data/stations.json";
import { useFlags } from "@/context/FlagContext";
import {
  RiMapPinLine,
  RiUserSharedLine,
  RiTimeLine,
  RiAlertLine,
} from "react-icons/ri";

import KpiCard from "@/components/dashboard/KpiCard";
import FlagSummaryCard from "@/components/dashboard/FlagSummaryCard";
import StationRankingCard, {
  type StationData,
} from "@/components/dashboard/StationRankingCard";

export default function Dashboard() {
  const { problematicStations, optimalStations } = useFlags();
  const stations = stationsData.stations as StationData[];

  const [selectedCorridor, setSelectedCorridor] = useState<string>("All");

  const corridors = useMemo(() => {
    const list = Array.from(new Set(stations.map((s) => s.corridor)));
    return ["All", ...list];
  }, [stations]);

  const filteredStations = useMemo(() => {
    if (selectedCorridor === "All") return stations;
    return stations.filter((s) => s.corridor === selectedCorridor);
  }, [stations, selectedCorridor]);

  // Kalkulasi KPI
  const totalStations = stations.length;
  const totalPassengers = useMemo(
    () => stations.reduce((acc, curr) => acc + curr.passenger_count, 0),
    [stations]
  );
  const avgDwellTime = useMemo(
    () =>
      Math.round(
        stations.reduce((acc, curr) => acc + curr.avg_dwell_time_sec, 0) /
          totalStations
      ),
    [stations, totalStations]
  );
  const aiAnomaliesCount = useMemo(
    () => stations.filter((s) => s.ai_anomaly_flag).length,
    [stations]
  );

  // Sorting berdasarkan density score
  const topCrowded = useMemo(() => {
    return [...filteredStations].sort(
      (a, b) => b.density_score - a.density_score
    );
  }, [filteredStations]);

  return (
    // Gunakan h-screen, overflow-hidden, dan flex flex-col gap-6 (hindari space-y-6)
    <div className="h-screen overflow-hidden bg-dark-1 text-light-1 font-mono p-6 lg:p-8 flex flex-col gap-6 relative">
      {/* Self-positioned ViewToggle */}
      <ViewToggle />

      {/* Header - beri shrink-0 agar ukurannya tidak memutasi flex */}
      <div className="border-b border-light-1/25 pb-4 pr-48 shrink-0">
        <h1 className="text-xl font-sans font-bold text-light-1">
          Dashboard Kepadatan Halte
        </h1>
        <p className="text-sm text-light-2 mt-1">
          Ringkasan analisis lalu lintas penumpang dan status halte terkini
        </p>
      </div>

      {/* Grid KPI Metrics - beri shrink-0 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <KpiCard
          title="Total Halte"
          value={totalStations}
          subtitle="Tersebar di seluruh koridor"
          icon={<RiMapPinLine />}
          delay={0}
        />
        <KpiCard
          title="Total Pengunjung"
          value={`${totalPassengers.toLocaleString("id-ID")} orang`}
          subtitle="Orang saat ini"
          icon={<RiUserSharedLine />}
          delay={0.05}
        />
        <KpiCard
          title="Rata-Rata Waktu Tinggal"
          value={`${avgDwellTime} dtk`}
          subtitle="Durasi di area halte"
          icon={<RiTimeLine />}
          delay={0.1}
        />
        <KpiCard
          title="Anomali AI"
          value={aiAnomaliesCount}
          subtitle="Terdeteksi oleh AI"
          icon={<RiAlertLine />}
          delay={0.15}
          valueClassName="text-red-1 font-bold"
          iconContainerClassName="bg-red-1/10 text-red-1"
        />
      </div>

      {/* Layout Dua Kolom - Mengambil sisa ruang layar secara tepat (flex-1 min-h-0) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <FlagSummaryCard
          problematicCount={problematicStations.length}
          optimalCount={optimalStations.length}
        />

        <div className="lg:col-span-2 h-full min-h-0">
          <StationRankingCard
            stations={topCrowded}
            corridors={corridors}
            selectedCorridor={selectedCorridor}
            onSelectCorridor={setSelectedCorridor}
          />
        </div>
      </div>
    </div>
  );
}