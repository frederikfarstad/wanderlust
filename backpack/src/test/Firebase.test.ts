import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { SubmitSignup } from "../utils/FirebaseUtils";

beforeAll(() => {
  window.alert = (text: string) => console.log("Alert: " + text);
});

test("tests sign up with email and password", async () => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    "test@example.com",
    "abc123"
  );
  expect(userCredentials.user.email).toEqual("test@example.com");
});

test("tests submitting a signup with valid data and logging in afterwards", async () => {
  const email = "test2@example.com";
  const username = "tester";
  const fullname = "Test Testsen";
  const password = "abc123";
  const repeatPassword = "abc123";

  const success = await SubmitSignup({
    email,
    username,
    fullname,
    password,
    repeatPassword,
  });
  expect(success).toBeTruthy();

  signInWithEmailAndPassword(auth, email, "wrong_password")
    .then(() => expect(false).toBeTruthy())
    .catch(() => expect(true).toBeTruthy());

  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  expect(userCredentials).toBeTruthy();
});

test("tests submitting a signup with invalid data", async () => {
  const email = "test@example.com";
  const username = "tester";
  const fullname = "Test Testsen";
  const password = "abc123";
  const repeatPassword = "def456";

  const success = await SubmitSignup({
    email,
    username,
    fullname,
    password,
    repeatPassword,
  });
  expect(success).toBeFalsy();
});

test("tests submitting a signup with duplicate data", async () => {
  const email = "test3@example.com";
  const username = "tester2";
  const fullname = "Test Testsen";
  const password = "abc123";
  const repeatPassword = "abc123";

  expect(
    await SubmitSignup({
      email,
      username,
      fullname,
      password,
      repeatPassword,
    })
  ).toBeTruthy();

  expect(
    await SubmitSignup({
      email,
      username,
      fullname,
      password,
      repeatPassword,
    })
  ).toBeFalsy();

  //Check that only unique usernames are allowed
  expect(
    await SubmitSignup({
      email: "test447387483@example.com",
      username,
      fullname,
      password,
      repeatPassword,
    })
  ).toBeFalsy();
});
