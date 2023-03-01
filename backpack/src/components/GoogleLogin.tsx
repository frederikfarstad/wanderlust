import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { createUser } from "../utils/FirebaseUtils";

// TODO : fix weird notation in createUser(...). Did this to avoid typescript warnings, but looks bad
export default function GoogleLoginButton() {
    const registerWithGoogle = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        // User registration successful
        const user = result.user;
        createUser(user.uid, user.email || "", user.displayName || "", user.displayName || "", user.photoURL)
        console.log('User registered successfully:', user);
      } catch (error) {
  
        console.error('Error registering user:', error);
      }
    };
  
    return (
      <button
        onClick={registerWithGoogle}
        className="flex items-center justify-center w-full h-10 border border-gray-400 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
      >
        <svg
          className="w-6 h-6 fill-current text-gray-700 mr-2"
          viewBox="0 0 1024 1024"
        >
          <path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" />
        </svg>
        Sign in with Google
      </button>
    );
  }