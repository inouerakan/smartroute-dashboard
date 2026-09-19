import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  RiBarChartGroupedLine,
  RiAlertLine,
  RiCheckDoubleLine,
} from "react-icons/ri";

interface FlagSummaryCardProps {
  problematicCount: number;
  optimalCount: number;
}

export default function FlagSummaryCard({
  problematicCount,
  optimalCount,
}: FlagSummaryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-dark-1 border border-light-1/25 rounded-xl p-6 flex flex-col justify-between gap-6 font-mono h-fit"
    >
      <div>
        <h2 className="text-xl font-sans font-bold text-light-1 flex items-center gap-2">
          <RiBarChartGroupedLine className="text-xl" />
          Status Catatan Halte
        </h2>
        <p className="text-sm text-light-2 mt-1">
          Jumlah halte yang ditandai secara manual dari peta
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-red-1/10 border border-red-1/20 rounded-md p-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-red-1">
            <RiAlertLine />
            <span>Bermasalah</span>
          </div>
          <span className="text-xl font-bold text-red-1">
            {problematicCount}
          </span>
        </div>

        <div className="bg-green-1/10 border border-green-1/20 rounded-md p-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-green-1">
            <RiCheckDoubleLine />
            <span>Optimal</span>
          </div>
          <span className="text-xl font-bold text-green-1">
            {optimalCount}
          </span>
        </div>
      </div>

      <Link to="/map" className="w-full">
        <button className="w-full py-2 bg-dark-2 hover:bg-light-1/10 text-light-1 rounded-sm text-sm transition-colors border border-light-1/10 cursor-pointer">
          Kelola Flag di Peta →
        </button>
      </Link>
    </motion.div>
  );
}