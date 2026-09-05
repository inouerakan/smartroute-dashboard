// src/context/FlagContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

// 1. Definisikan tipe data stasiun secara eksplisit (ganti 'any')
// Sesuaikan field-nya dengan isi stations.json kamu
export interface StationData {
  id: string;
  name: string;
  corridor: string;
  density_score: number;
  [key: string]: any; // Hanya gunakan ini jika ada field dinamis lain, tapi hindari jika bisa
}

export type FlagType = "problematic" | "optimal";

export interface FlaggedStation {
  id: string;
  name: string;
  corridor: string;
  density_score: number;
  flaggedAt: Date;
}

interface FlagContextType {
  problematicStations: FlaggedStation[];
  optimalStations: FlaggedStation[];
  addFlag: (station: StationData, type: FlagType) => void; // 2. Ganti 'any' dengan 'StationData'
  removeFlag: (id: string, type: FlagType) => void;
}

const FlagContext = createContext<FlagContextType | undefined>(undefined);

export function FlagProvider({ children }: { children: ReactNode }) {
  const [problematicStations, setProblematic] = useState<FlaggedStation[]>([]);
  const [optimalStations, setOptimal] = useState<FlaggedStation[]>([]);

  const addFlag = (station: StationData, type: FlagType) => {
    const newEntry: FlaggedStation = {
      id: station.id,
      name: station.name,
      corridor: station.corridor,
      density_score: station.density_score,
      flaggedAt: new Date(),
    };

    if (type === "problematic") {
      setProblematic((prev) => {
        if (prev.find((s) => s.id === station.id)) return prev;
        return [...prev, newEntry];
      });
    } else {
      setOptimal((prev) => {
        if (prev.find((s) => s.id === station.id)) return prev;
        return [...prev, newEntry];
      });
    }
  };

  const removeFlag = (id: string, type: FlagType) => {
    if (type === "problematic") {
      setProblematic((prev) => prev.filter((s) => s.id !== id));
    } else {
      setOptimal((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <FlagContext.Provider value={{ problematicStations, optimalStations, addFlag, removeFlag }}>
      {children}
    </FlagContext.Provider>
  );
}

export function useFlags() {
  const context = useContext(FlagContext);
  if (!context) throw new Error("useFlags must be used within a FlagProvider");
  return context;
}