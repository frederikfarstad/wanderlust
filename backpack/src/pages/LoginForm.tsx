import logo from "../public/mountain.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import GoogleLoginButton from "../components/GoogleLogin";
import InputWithValidation from "../components/InputWithValidation";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../firebase/asyncRequests";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = async () => {
    const success = await signInWithEmailAndPassword(auth, email, password);
  };


  const userQuery = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const emails = userQuery.isSuccess ? userQuery.data.map(user => user.email) : []

  const registeredEmail = emails.includes(email);
  console.log(registeredEmail)
  const correctEmailFormat =
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  return (
    <section className="bg-gradient-to-br from-primary-200 to-primary-500 h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8, h-8 mr-2" src={logo} alt="logo" />
          Wanderlust
        </div>

        <div className="w-full bg-primary-100 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Log in to your account
            </h1>

            <form className="space-y-4 md:space-y-6">
              <div>
                <InputWithValidation
                  label="Email"
                  type="email"
                  value={email}
                  isValid={correctEmailFormat && registeredEmail}
                  handleChange={setEmail}
                  explanation={
                    !correctEmailFormat && !registeredEmail
                      ? "Must be like example@example.com"
                      : "Email is not registered"
                  }
                />
              </div>
              <div>
                <label className="block">
                  <span className="block text-sm font-medium text-slate-700">
                    {"Password"}
                    <span className="text-red-300"> *</span>
                  </span>
                </label>
                <input
                  title="LoginPasswordInput"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 bg-primary-50 border rounded-md text-sm shadow-sm placeholder-slate-400
                  focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  placeholder="••••••••"
                  required
                />
              </div>
              <button
                title="LoginButton"
                onClick={loginWithEmail}
                disabled={!correctEmailFormat || !password}
                type="button"
                className="w-full shadow-lg text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                               disabled:bg-primary-300 disabled:shadow-inner"
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
            <div className="flex flex-row items-center">
              <div className="flex-1 h-px bg-gray-300"></div>
              <div className="text-sm font-light text-gray-500 px-4">or</div>
              <div className="flex-1 h-px bg-gray-300"></div>
              <div></div>
            </div>
            <GoogleLoginButton />
            <Link to="/recovery">
              <button className="text-sm font-light text-gray-500 mt-4">
                Forgot your password?
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
