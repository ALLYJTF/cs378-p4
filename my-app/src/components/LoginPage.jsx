import "../App.css";
import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth } from "./StartFirebase";

import FavoriteArtists from "../components/FavArtists";

export default function LoginPage() {
  // ---------------------------------------------------------------------------
  // STATE VARIABLES

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ---------------------------------------------------------------------------
  // FUNCTION: LOG IN

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => alert("Couldn't Sign in."));
  }

  // ---------------------------------------------------------------------------
  // FUNCTION: LOG OUT

  function logout() {
    signOut(auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => alert("Couldn't Log Out."));
  }

  return (
    <>
      {!isLoggedIn ? (
        <>
          {/*----------------------- LOG IN ----------------------- */}

          <div className="box">
            <p> Log in to your account: </p>
            <form>
              <input
                type="text"
                placeholder="Email/Username"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  login();
                }}
              >
                Log In
              </button>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}

      {/*----------------------- REDIRECT PAGE ----------------------- */}

      {isLoggedIn ? (
        <>
          <div className="box">
            <h3>{auth.currentUser.email}</h3>
          </div>
          <div>
            <FavoriteArtists />
          </div>

          {/* Logout Button */}
          <button
            className="logout_btn"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log Out
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
