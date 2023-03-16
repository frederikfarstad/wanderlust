import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MainPage from "../pages/MainPage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { searchForChildElementWithQuery, wrappedRender } from "./testUtils";

beforeAll(async () => {
  await signInWithEmailAndPassword(auth, "test@example.com", "abc123");
});

beforeEach(() => {
  act(() => wrappedRender(<MainPage />));
});

describe("MainPage", () => {
  it("should allow adding trips to and removing trips from favorites", async () => {
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));
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
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));

    var prevLifetime = 0;
    tripDivs.forEach((tripDiv) => {
      const postLifetimeInfoContainer = tripDiv.querySelector("[title='PostLifetimeInfoContainer']");
      if (postLifetimeInfoContainer !== null) {
        // Check that previous trip div and this trip div is correctly sorted
        const thisLifetime = parseInt(postLifetimeInfoContainer.innerHTML);
        if (isNaN(thisLifetime)) return;

        expect(thisLifetime).toBeGreaterThanOrEqual(prevLifetime);

        prevLifetime = thisLifetime;
      }
    });
  });

  it("should sort correctly from oldest to newest", async () => {
    const sortByNewButton = screen.getByTestId("SortingButton-New");
    await userEvent.click(sortByNewButton);
    await userEvent.click(sortByNewButton);
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));

    var prevLifetime = Infinity;
    tripDivs.forEach((tripDiv) => {
      const postLifetimeInfoContainer = tripDiv.querySelector("[title='PostLifetimeInfoContainer']");
      if (postLifetimeInfoContainer !== null) {
        // Check that previous trip div and this trip div is correctly sorted
        const thisLifetime = parseInt(postLifetimeInfoContainer.innerHTML);
        if (isNaN(thisLifetime)) return;

        expect(thisLifetime).toBeLessThanOrEqual(prevLifetime);

        prevLifetime = thisLifetime;
      }
    });
  });

  it("should sort correctly from least to most expensive", async () => {
    const sortButton = screen.getByTestId("SortingButton-Price");
    await userEvent.click(sortButton);
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));

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
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));

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
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));

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
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));

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
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"));

    var prevLifetime = 0;
    tripDivs.forEach((tripDiv) => {
      const postLifetimeInfoContainer = tripDiv.querySelector("[title='PostLifetimeInfoContainer']");
      if (postLifetimeInfoContainer !== null) {
        // Check that previous trip div and this trip div is correctly sorted
        const thisLifetime = parseInt(postLifetimeInfoContainer.innerHTML);
        if (isNaN(thisLifetime)) return;

        expect(thisLifetime).toBeGreaterThanOrEqual(prevLifetime);

        prevLifetime = thisLifetime;
      }
    });
  });
});
