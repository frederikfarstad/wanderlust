import { Trip } from "../firebase/Interfaces";

/**
 * Calculates the relevance of a trip based on current favorites
 * @param trip the trip to calculate the relevance score for
 * @returns a number 0-100 indicating how relevant a trip is
 */
export const getRelevanceScore = (trip: Trip): number => {
  return 0;
};
