import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

test("tests sign up with email and password", async () => {
  const userCredentials = await createUserWithEmailAndPassword(
    auth,
    "test@example.com",
    "abc123"
  );
  expect(userCredentials.user.email).toEqual("test@example.com");
});
