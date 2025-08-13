import axios from "axios";
import type { Berry, BerryListResponse, ProcessedBerry, BerriesCache } from "../types";

const CACHE_KEY = "berries_cache";
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

// Helper function to extract berry ID from URL
const extractBerryId = (url: string): number => {
  const parts = url.split('/');
  const id = parts[parts.length - 2];
  return parseInt(id) || 0;
};

// Helper function to process berry data
const processBerry = (berry: Berry): ProcessedBerry => {
  // Filter flavors with potency > 0
  const activeFlavors = berry.flavors
    .filter(flavor => flavor.potency > 0)
    .map(flavor => flavor.flavor.name);

  return {
    id: berry.id,
    name: berry.name,
    firmness: berry.firmness.name,
    flavors: activeFlavors,
  };
};

// Cache management functions
const getCachedBerries = (): ProcessedBerry[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const cacheData: BerriesCache = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now < cacheData.expiresAt) {
      return cacheData.data;
    }

    // Cache expired, remove it
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error("Error reading berries cache:", error);
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
};

const setCachedBerries = (berries: ProcessedBerry[]): void => {
  try {
    const now = Date.now();
    const cacheData: BerriesCache = {
      data: berries,
      timestamp: now,
      expiresAt: now + CACHE_DURATION,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error caching berries:", error);
  }
};

// Main function to get all berries
export const getAllBerries = async (): Promise<ProcessedBerry[]> => {
  // Check cache first
  const cachedBerries = getCachedBerries();
  if (cachedBerries) {
    console.log("Using cached berries data");
    return cachedBerries;
  }

  console.log("Fetching fresh berries data from API");

  try {
    // Step 1: Get the list of all berries (set limit to 200 to get all berries)
    const listResponse = await axios.get<BerryListResponse>("https://pokeapi.co/api/v2/berry?limit=200");
    const berryList = listResponse.data.results;

    // Step 2: Fetch all individual berry details in parallel
    const berryPromises = berryList.map(async (berryItem) => {
      const berryId = extractBerryId(berryItem.url);
      const response = await axios.get<Berry>(`https://pokeapi.co/api/v2/berry/${berryId}`);
      return response.data;
    });

    // Wait for all berry details to be fetched
    const allBerries = await Promise.all(berryPromises);

    // Step 3: Process the berries data
    const processedBerries = allBerries.map(processBerry);

    // Step 4: Cache the results
    setCachedBerries(processedBerries);

    return processedBerries;
  } catch (error) {
    console.error("Error fetching berries:", error);
    throw new Error("Failed to fetch berries data");
  }
};
