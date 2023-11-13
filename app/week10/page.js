"use client";
import { useUserAuth } from "./_utils/auth-context";
import Link from 'next/link';

function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    await gitHubSignIn();
  };

  const handleSignOut = async () => {
    await firebaseSignOut();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <p><button onClick={handleSignOut}>Logout</button></p>
          <p><Link href="/week10/shopping-list">Go to Shopping List</Link></p>
        </div>
      ) : (
        <div>
          <p>Please log in:</p>
          <button onClick={handleSignIn}>Login with GitHub</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
