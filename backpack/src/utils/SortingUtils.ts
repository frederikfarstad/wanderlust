import { Trip } from "../firebase/Interfaces";
import { KeywordList } from "../types";

/**
 * Calculates the relevance of a trip based on a given list of keywords and their individual frequency
 * @param keywords a list of keywords to compare a trip to
 * @param trip the trip to calculate the relevance score for
 * @returns a number 0-100 indicating how relevant a trip is
 */
export const getRelevanceScore = (keywords: KeywordList, trip: Trip): number => {
  return 0;
};

export const getKeywordsFromTrips = (trips: Trip[]): KeywordList => {
  return [];
};
