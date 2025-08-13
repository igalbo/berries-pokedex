import { useState, useEffect } from "react";
import { getAllBerries } from "../services/pokeApi";
import { useDebounce } from "./useDebounce";
import type { ProcessedBerry, FirmnessLevel } from "../types";

interface UseBerriesReturn {
  loading: boolean;
  error: string | null;
  filteredBerries: ProcessedBerry[];
  selectedFirmness: FirmnessLevel;
  searchQuery: string;
  setSelectedFirmness: (firmness: FirmnessLevel ) => void;
  setSearchQuery: (query: string) => void;
  firmnessCounts: Record<string, number>;
}

export const useBerries = (): UseBerriesReturn => {
  const [berries, setBerries] = useState<ProcessedBerry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFirmness, setSelectedFirmness] = useState<FirmnessLevel>("very-soft");
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce the search query with 0.5 second delay
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch berries on mount
  useEffect(() => {
    const fetchBerries = async () => {
      try {
        setLoading(true);
        setError(null);
        const berriesData = await getAllBerries();
        setBerries(berriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch berries");
        console.error("Error fetching berries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBerries();
  }, []);

  // First filter berries by search query only (not by firmness)
  const searchFilteredBerries = berries.filter((berry) => {
    // Filter by debounced search query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      return berry.name.toLowerCase().includes(query);
    }
    return true;
  });

  // Calculate firmness counts based on search-filtered berries
  const firmnessCounts = searchFilteredBerries.reduce((counts, berry) => {
    counts[berry.firmness] = (counts[berry.firmness] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);

  // Filter berries based on selected firmness and debounced search query
  const filteredBerries = searchFilteredBerries.filter((berry) => {
    // Filter by firmness
    if (selectedFirmness && berry.firmness !== selectedFirmness) {
      return false;
    }
    return true;
  });

  return {
    loading,
    error,
    filteredBerries,
    selectedFirmness,
    searchQuery,
    setSelectedFirmness,
    setSearchQuery,
    firmnessCounts,
  };
};
