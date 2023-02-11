import LoginPage from "../pages/LoginPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("tests sign up button behavior", async () => {
  render(<LoginPage />);

  const signupButton = screen.getByTitle("SignupButton");
  await userEvent.click(signupButton);
  expect(signupButton).toHaveTextContent("Sign up");
});
