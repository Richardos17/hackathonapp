// pages/index.js
"use client";

import { useRouter } from "next/navigation";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
} from "./api/firebaseClient";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Signed in user:", userCredential.user);
      // Redirect to another page after successful sign-in
      router.back(); // Change this to your target page
    } catch (err) {
      setError(err.message);
      console.error("Authentication error:", err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google sign-in successful:", user);
      // Redirect user to dashboard or home page after successful sign-in
      router.back();
    } catch (err) {
      setError(err.message);
      console.error("Google sign-in error:", err.message);
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="text-center my-4">Sign In</h2>
            <form onSubmit={handleSignIn}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
            <button
              className="btn btn-danger w-100"
              onClick={handleGoogleSignIn}
            >
              Sign Up with Google
            </button>
            <div className="mt-3 text-center">
              <p>
                Don't have an account? <Link href="signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
