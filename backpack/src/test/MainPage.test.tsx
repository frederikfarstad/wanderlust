import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import MainPage from "../pages/MainPage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "../config";

beforeAll(async () => {
  await signInWithEmailAndPassword(auth, "test@example.com", "abc123");
});

test("tests adding a trip to favorites", async () => {
  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </MemoryRouter>
  );

  await screen.findByText("Loading trips...");
  const tripDiv = await waitFor(() => screen.findByTitle("TripDiv"), { timeout: 5000 });
  expect(tripDiv).toBeInTheDocument();

  const favoriteButton = await screen.findByTitle("FavoriteTripButton");
  expect(favoriteButton).toBeInTheDocument();
  expect(await screen.findByTitle("NonFavoritedIcon")).toBeInTheDocument();
  userEvent.click(favoriteButton);
  expect(await screen.findByTitle("FavoritedIcon")).toBeInTheDocument();
  userEvent.click(favoriteButton);
  expect(await screen.findByTitle("NonFavoritedIcon")).toBeInTheDocument();
});
