import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MainPage from "../pages/MainPage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { searchForChildElementWithQuery, wrappedRender } from "./testUtils";

beforeEach(() => {
  act(() => wrappedRender(<MainPage />));
});

const waitForTripDivs = () => {
  return waitFor(() => screen.findAllByTitle("TripDiv"), { timeout: 5000 });
};

describe("MainPage", () => {
  beforeAll(async () => {
    await signInWithEmailAndPassword(auth, "test@example.com", "abc123");
  });

  it("should allow adding trips to and removing trips from favorites", async () => {
    const tripDivs = await waitForTripDivs();
    expect(tripDivs.length).toBeGreaterThan(0);

    const tripDiv = tripDivs[0];

    const favoriteButton = await searchForChildElementWithQuery(tripDiv, "[title='FavoriteTripButton']");
    if (favoriteButton === null) return;

    await searchForChildElementWithQuery(tripDiv, "[title='NonFavoritedIcon']");
    await userEvent.click(favoriteButton);
    await searchForChildElementWithQuery(tripDiv, "[title='FavoritedIcon']");
    await userEvent.click(favoriteButton);
    await searchForChildElementWithQuery(tripDiv, "[title='NonFavoritedIcon']");
  });

  it("should sort correctly from newest to oldest", async () => {
    const sortByNewButton = screen.getByTestId("SortingButton-New");
    await userEvent.click(sortByNewButton);
    const tripDivs = await waitForTripDivs();

    var prevCreationTime = Infinity;
    tripDivs.forEach((tripDiv) => {
      const thisCreationTime = parseInt(tripDiv.getAttribute("data-createdat") || "");
      if (isNaN(thisCreationTime)) return;
      // Check that previous trip div and this trip div is correctly sorted
      expect(thisCreationTime).toBeLessThanOrEqual(prevCreationTime);

      prevCreationTime = thisCreationTime;
    });
  });

  it("should sort correctly from oldest to newest", async () => {
    const sortByNewButton = screen.getByTestId("SortingButton-New");
    await userEvent.click(sortByNewButton);
    await userEvent.click(sortByNewButton);
    const tripDivs = await waitForTripDivs();

    var prevCreationTime = 0;
    tripDivs.forEach((tripDiv) => {
      const thisCreationTime = parseInt(tripDiv.getAttribute("data-createdat") || "");
      if (isNaN(thisCreationTime)) return;
      // Check that previous trip div and this trip div is correctly sorted
      expect(thisCreationTime).toBeGreaterThanOrEqual(prevCreationTime);

      prevCreationTime = thisCreationTime;
    });
  });

  it("should sort correctly from least to most expensive", async () => {
    const sortButton = screen.getByTestId("SortingButton-Price");
    await userEvent.click(sortButton);
    const tripDivs = await waitForTripDivs();

    var prevPrice = 0;
    tripDivs.forEach((tripDiv, index) => {
      const postPriceInfoContainer = tripDiv.querySelector("[title='PostPriceInfoContainer']");
      if (postPriceInfoContainer !== null) {
        // Check that previous trip div and this trip div is correctly sorted
        const thisPrice = parseInt(postPriceInfoContainer.innerHTML);
        if (isNaN(thisPrice)) return;

        expect(thisPrice).toBeGreaterThanOrEqual(prevPrice);

        prevPrice = thisPrice;
      }
    });
  });

  it("should sort correctly from most to least expensive", async () => {
    const sortButton = screen.getByTestId("SortingButton-Price");
    await userEvent.click(sortButton);
    await userEvent.click(sortButton);
    const tripDivs = await waitForTripDivs();

    var prevPrice = Infinity;
    tripDivs.forEach((tripDiv) => {
      const postPriceInfoContainer = tripDiv.querySelector("[title='PostPriceInfoContainer']");
      if (postPriceInfoContainer !== null) {
        // Check that previous trip div and this trip div is correctly sorted
        const thisPrice = parseInt(postPriceInfoContainer.innerHTML);
        if (isNaN(thisPrice)) return;

        expect(thisPrice).toBeLessThanOrEqual(prevPrice);

        prevPrice = thisPrice;
      }
    });
  });

  it("should sort trips correctly from shortest to longest", async () => {
    const sortButton = screen.getByTestId("SortingButton-Duration");
    await userEvent.click(sortButton);
    const tripDivs = await waitForTripDivs();

    var prevDuration = 0;
    tripDivs.forEach((tripDiv, index) => {
      const postPriceInfoContainer = tripDiv.querySelector("[title='PostDurationInfoContainer']");
      if (postPriceInfoContainer !== null) {
        // Check that previous trip div and this trip div is correctly sorted
        const thisDuration = parseInt(postPriceInfoContainer.innerHTML);
        if (isNaN(thisDuration)) return;

        expect(thisDuration).toBeGreaterThanOrEqual(prevDuration);

        prevDuration = thisDuration;
      }
    });
  });

  it("should sort trips correctly from longest to shortest", async () => {
    const sortButton = screen.getByTestId("SortingButton-Duration");
    await userEvent.click(sortButton);
    await userEvent.click(sortButton);
    const tripDivs = await waitForTripDivs();

    var prevDuration = Infinity;
    tripDivs.forEach((tripDiv, index) => {
      const postPriceInfoContainer = tripDiv.querySelector("[title='PostDurationInfoContainer']");
      if (postPriceInfoContainer !== null) {
        // Check that previous trip div and this trip div is correctly sorted
        const thisDuration = parseInt(postPriceInfoContainer.innerHTML);
        if (isNaN(thisDuration)) return;

        expect(thisDuration).toBeLessThanOrEqual(prevDuration);

        prevDuration = thisDuration;
      }
    });
  });

  it("should reset sorting direction when switching sorting modes", async () => {
    const sortByNewButton = screen.getByTestId("SortingButton-New");
    const sortByPriceButton = screen.getByTestId("SortingButton-Price");
    await userEvent.click(sortByPriceButton);
    await userEvent.click(sortByPriceButton);
    await userEvent.click(sortByNewButton);
    const tripDivs = await waitForTripDivs();

    var prevCreationTime = Infinity;
    tripDivs.forEach((tripDiv) => {
      const thisCreationTime = parseInt(tripDiv.getAttribute("data-createdat") || "");
      if (isNaN(thisCreationTime)) return;
      // Check that previous trip div and this trip div is correctly sorted
      expect(thisCreationTime).toBeLessThanOrEqual(prevCreationTime);

      prevCreationTime = thisCreationTime;
    });
  });
});

describe("MainPage for user Test2", () => {
  beforeAll(async () => {
    await signInWithEmailAndPassword(auth, "test2@example.com", "abc123");
  });

  it("should show most relevant trips first", async () => {
    const tripTitles = await screen.findAllByTitle("TripPostTitle");

    expect(tripTitles[0]).toHaveTextContent("Trip to Paris");
    expect(tripTitles[1]).toHaveTextContent("Southeast Asia Trip 2023");
    expect(tripTitles[2]).toHaveTextContent("Trip to Brussels");
  });
});
