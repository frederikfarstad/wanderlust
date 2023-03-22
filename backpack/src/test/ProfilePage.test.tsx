import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { searchForChildElementWithQuery, wrappedRender } from "./testUtils";
import ProfilePage from "../pages/ProfilePage";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { queryClient } from "../config";
import { QueryClientProvider } from "@tanstack/react-query";

const waitForTripDivs = () => {
  return waitFor(() => screen.findAllByTitle("TripDiv"), { timeout: 5000 });
};

beforeAll(async () => {
  await signInWithEmailAndPassword(auth, "test2@example.com", "abc123");

  const user = auth.currentUser;
  expect(user).toBeTruthy();
  if (user === null) return;

  const uid = user.uid;

  act(() =>
    render(
      <MemoryRouter initialEntries={[`/profile/${uid}`]}>
        <Routes>
          <Route
            path="/profile/:urlID"
            element={
              <QueryClientProvider client={queryClient}>
                <ProfilePage />
              </QueryClientProvider>
            }
          />
        </Routes>
      </MemoryRouter>
    )
  );
});

describe("ProfilePage", () => {
  it("should show the correct profile", async () => {
    const usernameLabel = await screen.findByTitle("ProfileUsernameLabel");
    expect(usernameLabel).toBeInTheDocument();

    waitFor(
      async () => {
        expect(usernameLabel).not.toBeEmptyDOMElement();
      },
      { timeout: 5000 }
    );
    screen.debug(undefined, 20000, { maxDepth: 16 });
    expect(usernameLabel).toHaveTextContent("Test2");
  });

  it("should show trips posted by user by default", async () => {
    const tripDivs = await waitForTripDivs();
    tripDivs.forEach(async (tripDiv) => {
      const creatorUsernameLabel = await searchForChildElementWithQuery(tripDiv, "[title='TripCreatorUsernameLabel']");
      expect(creatorUsernameLabel).toHaveTextContent("Test2");
    });
  });
});
