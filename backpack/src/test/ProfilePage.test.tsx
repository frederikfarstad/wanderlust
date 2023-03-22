import { act, render, screen, waitFor } from "@testing-library/react";
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
  );
  await new Promise((resolve) => setTimeout(resolve, 3000));
});

describe("ProfilePage", () => {
  it("should show the correct profile", async () => {
    await act(async () => {
      const usernameLabel = await screen.findByTitle("ProfileUsernameLabel");
      expect(usernameLabel).toBeInTheDocument();
      await waitFor(
        () => {
          expect(usernameLabel).not.toBeEmptyDOMElement();
        },
        { timeout: 5000 }
      );
      expect(usernameLabel).toHaveTextContent("Test2");
    });
  });
});
