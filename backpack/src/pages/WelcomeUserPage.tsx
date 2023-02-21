import { auth } from "../firebase";

export default function WelcomeUserPage() {


  return (
    <div className="flex items-center justify-center h-screen">
      <div>Welcome, {auth.currentUser?.displayName}</div>
    </div>
  );
}
