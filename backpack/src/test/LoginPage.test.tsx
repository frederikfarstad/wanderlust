import LoginPage, {
  LoginSection,
  PasswordResetSection,
  SignupSection,
} from "../pages/LoginPage";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { SetStateAction } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

test("tests sign up button behavior", async () => {
  render(<LoginPage />);

  const signupButton = screen.getByTitle("SignupButton");
  await userEvent.click(signupButton);
  expect(signupButton).toHaveTextContent("Sign up");
});

test("tests login button behavior", async () => {
  render(
    <LoginSection
      setSelectedForm={function (
        value: SetStateAction<"signup" | "login" | "passwordreset">
      ): void {
        throw new Error("Function not implemented.");
      }}
    />
  );

  const loginButton = screen.getByTitle("LoginButton");
  await userEvent.click(loginButton);
  expect(loginButton).toHaveTextContent("Log in");
});

test("tests password reset button behavior", async () => {
  render(<PasswordResetSection />);

  const resetButton = screen.getByTitle("SendPasswordResetEmailButton");
  await userEvent.click(resetButton);
  expect(resetButton).toHaveTextContent("Send password-reset email");
});

test("tests client side input validation and response from UI in signup section", async () => {
  render(<LoginPage />);

  const signupButton = screen.getByTitle("SignupButton");
  const emailInput = screen.getByTitle("EmailInput");
  const usernameInput = screen.getByTitle("UsernameInput");
  const fullNameInput = screen.getByTitle("FullNameInput");
  const passwordInput = screen.getByTitle("PasswordInput");
  const passwordRepeatInput = screen.getByTitle("PasswordRepeatInput");

  userEvent.type(emailInput, "email@mail.com");
  userEvent.type(usernameInput, "Navn");
  userEvent.type(fullNameInput, "Navn Navan");
  userEvent.type(passwordInput, "passord");
  userEvent.type(passwordRepeatInput, "passord");
  userEvent.click(signupButton);

  expect(await screen.findByText("Loading...")).toBeInTheDocument();
});

test("tests client side validation for password reset", async () => {
  render(<PasswordResetSection />);

  createUserWithEmailAndPassword(
    auth,
    "testpasswordreset@example.com",
    "abc123"
  );

  const emailInput = screen.getByTitle("EmailInput");
  const resetButton = screen.getByTitle("SendPasswordResetEmailButton");

  await userEvent.type(emailInput, "nonexistentuser@example.com");
  await userEvent.click(resetButton);
  expect(await screen.findByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("User not found!")).toBeInTheDocument();
  expect(
    await screen.findByText("Send password-reset email")
  ).toBeInTheDocument();
  await userEvent.clear(emailInput);
  await userEvent.type(emailInput, "testpasswordreset@example.com");
  await userEvent.click(resetButton);
  expect(await screen.findByText("Sent! Check your inbox")).toBeInTheDocument();
});

test("tests form type switching", async () => {
  render(<LoginPage />);

  const loginSwitchButton = screen.getByTitle("LoginSwitchButton");
  const signupSwitchButton = screen.getByTitle("SignupSwitchButton");

  expect(screen.queryByTitle("SignupSection")).toBeInTheDocument();
  userEvent.click(loginSwitchButton);

  expect(await screen.findByTitle("LoginSection")).toBeInTheDocument();
  expect(screen.queryByTitle("SignupSection")).toBeFalsy();

  const forgotPasswordLink = screen.getByTitle("ForgotPasswordLink");
  userEvent.click(forgotPasswordLink);
  expect(await screen.findByTitle("PasswordResetSection")).toBeInTheDocument();
  expect(screen.queryByTitle("LoginSection")).toBeFalsy();
  userEvent.click(signupSwitchButton);
  expect(await screen.findByTitle("SignupSection")).toBeInTheDocument();
  expect(screen.queryByTitle("LoginSection")).toBeFalsy();
  expect(screen.queryByTitle("PasswordResetSection")).toBeFalsy();
});
