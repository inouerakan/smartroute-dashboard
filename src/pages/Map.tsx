import { MapControls, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip } from "@/components/ui/map";
import stationsData from "@/data/stations.json";
import { motion } from "motion/react";
import { useState } from "react";
import StationDetail from "@/components/map/StationDetail";
import Leaderboard from "@/components/map/Leaderboard";
import FlaggedStationsPanel from "@/components/map/FlaggedStationsPanel";
import Map3DToggle from "@/components/map/Map3DToggle";

function getHeatmapColor(score: number): string {
  if (score >= 0.9) return "oklch(68% 0.16 25)";
  if (score >= 0.7) return "oklch(74% 0.13 55)";
  if (score >= 0.4) return "oklch(80% 0.10 95)";
  return "oklch(76% 0.09 165)";
}

export default function Map() {
  const [isStationDetailOpen, setIsStationDetailOpen] = useState(false);
  const [selectedStation, setSelectedStation] = useState(Number(null));

  function openStationDetail(index: number) {
    setIsStationDetailOpen(true);
    setSelectedStation(index);
  }

  const closeStationDetail = () => setIsStationDetailOpen(false);
  const getIsStationDetailOpen = () => { return isStationDetailOpen };
  const getSelectedStation = () => { return selectedStation };

  return (
    <div className="bg-dark-1 overflow-hidden">
      <div className="hidden md:block h-screen w-full">
        <Map3DToggle center={[106.816666, -6.200000]} zoom={11}>
          <MapControls />
          {stationsData.stations.map((item, index) => (
            <MapMarker key={item.id} longitude={item.coordinates[1]} latitude={item.coordinates[0]}>
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: getHeatmapColor(item.density_score),
                      opacity: 0.4 + item.density_score * 0.4,
                      filter: `blur(${12 + item.density_score * 16}px)`,
                      transform: "translate(-50%, -50%)",
                      top: "50%",
                      left: "50%",
                    }}
                  />
                  <motion.div
                    className="relative z-10 w-3.5 rounded-full aspect-square border border-dark-1/10 cursor-pointer"
                    animate={{ scale: 1.3 }}
                    style={{
                      backgroundColor: getHeatmapColor(item.density_score),
                      boxShadow: `0 0 ${8 + item.density_score * 16}px ${getHeatmapColor(item.density_score)}`,
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 2,
                      ease: "linear"
                    }}
                  />
                </div>
              </MarkerContent>
              <MarkerTooltip className="font-mono border border-light-1/25">{item.name}</MarkerTooltip>
              <MarkerPopup className="bg-dark-1 border border-light-1/25">
                <div className="space-y-1 flex flex-col gap-1">
                  <div>
                    <p className="text-lg font-bold text-light-1">{item.name}</p>
                    <p className="text-md font-mono text-light-2">Kepadatan: {item.density_level}</p>
                    <p className="text-md font-mono text-light-2">Pengunjung: {item.passenger_count}</p>
                  </div>
                  <button className="w-full bg-dark-2 text-light-1 font-bold font-mono py-1 rounded-sm" onClick={() => openStationDetail(index)}>Lihat Lengkap</button>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))}
        </Map3DToggle>
      </div>

      <StationDetail closeStationDetail={closeStationDetail} getIsStationDetailOpen={getIsStationDetailOpen} getSelectedStation={getSelectedStation} />
      <Leaderboard />
      <FlaggedStationsPanel />

      <div className="flex md:hidden w-full h-screen justify-center items-center text-xl p-4 text-center text-light-1">
        Buka website di desktop untuk mengaksesnya.
      </div>
    </div>
  );
}