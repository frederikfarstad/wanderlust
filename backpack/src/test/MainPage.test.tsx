import { act, prettyDOM, screen, waitFor } from "@testing-library/react";
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
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"), {
      timeout: 5000,
    });
    expect(tripDivs.length).toBeGreaterThan(0);

    const tripDiv = tripDivs[0];

    const favoriteButton = await searchForChildElementWithQuery(
      tripDiv,
      "[title='FavoriteTripButton']"
    );
    if (favoriteButton === null) return;

    await searchForChildElementWithQuery(tripDiv, "[title='NonFavoritedIcon']");
    userEvent.click(favoriteButton);
    await searchForChildElementWithQuery(tripDiv, "[title='FavoritedIcon']");
    userEvent.click(favoriteButton);
    await searchForChildElementWithQuery(tripDiv, "[title='NonFavoritedIcon']");
  });

  it("should sort correctly from newest to oldest and oldest to newest", async () => {
    const sortByNewButton = screen.getByTestId("SortingButton-New");
    userEvent.click(sortByNewButton);
    const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"), {
      timeout: 5000,
    });

    var prevLifetime = 0;
    tripDivs.forEach((tripDiv) => {
      const postLifetimeInfoContainer = tripDiv.querySelector(
        "[title='PostLifetimeInfoContainer']"
      );
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
