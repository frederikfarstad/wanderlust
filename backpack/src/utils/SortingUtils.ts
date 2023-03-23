import { Trip } from "../firebase/Interfaces";
import { KeywordMapping } from "../types";

const splitRegex = /[\s,.!?]/;

const getWordsFromTrip = (trip: Trip) => {
  const titleWords = trip.title.split(splitRegex);
  const descriptionWords = trip.description.split(splitRegex);
  return [...titleWords, ...descriptionWords];
};

/**
 * Calculates the relevance of a trip based on a given list of keywords and their individual frequency
 * @param keywords a list of keywords to compare a trip to
 * @param trip the trip to calculate the relevance score for
 * @returns a number 0-100 indicating how relevant a trip is
 */
export const getRelevanceScore = (keywords: KeywordMapping, trip: Trip): number => {
  const words = getWordsFromTrip(trip);
  var score = 0;
  words.forEach((word) => {
    const findScore = word === "" ? 0 : keywords.get(word.toLowerCase()) || 0;
    score += findScore;
  });
  return score;
};

export const getKeywordsFromTrips = (trips: Trip[]): KeywordMapping => {
  var frequencyMapping = new Map<string, number>();
  trips.forEach((trip) => {
    const words = getWordsFromTrip(trip);

    words.forEach((word) => {
      word = word.toLowerCase();
      if (frequencyMapping.has(word)) {
        const prev = frequencyMapping.get(word) || 0;
        frequencyMapping.set(word, prev + 1);
      } else frequencyMapping.set(word, 1);
    });
  });
  return frequencyMapping;
};
