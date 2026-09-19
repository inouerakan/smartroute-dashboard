import { motion } from "motion/react";

export interface StationData {
  id: string;
  name: string;
  corridor: string;
  passenger_count: number;
  avg_dwell_time_sec: number;
  bus_arrival_eta_sec: number;
  density_score: number;
  ai_anomaly_flag: boolean;
}

interface StationRankingCardProps {
  stations: StationData[];
  corridors: string[];
  selectedCorridor: string;
  onSelectCorridor: (corridor: string) => void;
}

export default function StationRankingCard({
  stations,
  corridors,
  selectedCorridor,
  onSelectCorridor,
}: StationRankingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className="bg-dark-1 border border-light-1/25 rounded-xl p-6 flex flex-col gap-6 font-mono h-full min-h-0"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div>
          <h2 className="text-xl font-sans font-bold text-light-1">
            Tingkat Kepadatan Halte
          </h2>
          <p className="text-sm text-light-2 mt-1">
            Daftar halte diurutkan berdasarkan skor kepadatan
          </p>
        </div>

        {/* Filter Koridor */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-light-2">Koridor:</span>
          <select
            value={selectedCorridor}
            onChange={(e) => onSelectCorridor(e.target.value)}
            className="bg-dark-2 border border-light-1/25 text-light-1 text-sm rounded-md px-3 py-1.5 outline-none focus:border-light-1/50 transition-colors"
          >
            {corridors.map((c) => (
              <option key={c} value={c} className="bg-dark-1 text-light-1">
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* List Halte - flex-1 min-h-0 mengambil sisa ruang vertikal yang tersedia */}
      <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto pr-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-light-1/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-light-1/20">
        {stations.map((s, idx) => {
          const densityPct = `${Math.trunc(s.density_score * 100)}%`;
          return (
            <div
              key={s.id}
              className="bg-dark-2/40 border border-light-1/10 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-light-1/25 transition-all text-sm shrink-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-light-2 w-5 font-bold">
                  #{idx + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-sans font-bold text-sm text-light-1">
                      {s.name}
                    </p>
                    {s.ai_anomaly_flag && (
                      <span className="text-sm text-red-1 font-bold">
                        AI Anomaly
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-light-2">{s.corridor}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 min-w-56">
                <div className="text-right">
                  <p className="text-sm font-bold text-light-1">
                    {s.passenger_count} orang
                  </p>
                  <p className="text-sm text-light-2">
                    ETA: {s.bus_arrival_eta_sec} dtk
                  </p>
                </div>

                <div className="flex items-center gap-3 w-32">
                  <div className="h-1.5 w-full rounded-2xl bg-dark-2 flex">
                    <motion.div
                      className="h-full bg-light-1 rounded-2xl"
                      initial={{ width: 0 }}
                      animate={{ width: densityPct }}
                    />
                  </div>
                  <span className="text-sm text-light-1 font-mono">
                    {densityPct}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}