import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase-config";

export default function AccountRecoveryPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleReset() {
    sendPasswordResetEmail(auth, email)
    .then(() => {
      setSent(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-primary-300">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-primary-100">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
          Reset your password
        </h1>
        <p>
          Enter your email address below and we'll send you a link with
          instructions.
        </p>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-4"
            placeholder="Your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex flex-row justify-between">

          <button
            onClick={handleReset}
            disabled={sent}
            type="submit"
            className="inline-flex items-center justify-center col-span-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-primary-400"
            >
            {sent ? "Email sent" : "Send"}
          </button>
          <Link to="/">

          <button
            className="inline-flex items-center justify-center col-span-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-400 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 disabled:bg-primary-400"
            >
            Go back
          </button>
                </Link>
              </div>
      </div>
    </div>
  );
}
