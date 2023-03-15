import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MainPage from "../pages/MainPage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { wrappedRender } from "./testUtils";

beforeAll(async () => {
  await signInWithEmailAndPassword(auth, "test@example.com", "abc123");
});

test("tests adding a trip to favorites", async () => {
  wrappedRender(<MainPage />);

  const tripDivs = await waitFor(() => screen.findAllByTitle("TripDiv"), { timeout: 5000 });
  expect(tripDivs.length).toBeGreaterThan(0);

  const favoriteButton = await screen.findByTitle("FavoriteTripButton");
  expect(favoriteButton).toBeInTheDocument();
  expect(await screen.findByTitle("NonFavoritedIcon")).toBeInTheDocument();
  userEvent.click(favoriteButton);
  expect(await screen.findByTitle("FavoritedIcon")).toBeInTheDocument();
  userEvent.click(favoriteButton);
  expect(await screen.findByTitle("NonFavoritedIcon")).toBeInTheDocument();
});

describe("tests sorting by new and oldest", async () => {
  wrappedRender(<MainPage />);
});
