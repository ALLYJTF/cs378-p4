import "../App.css";
import React, { useState, useEffect } from "react";
import { set, ref, onValue } from "firebase/database";
import { auth, database } from "./StartFirebase";
import { uid } from "uid";

export default function FavoriteArtists() {
  // ---------------------------------------------------------------------------
  // VARIABLES

  const user = uid();
  const [artist, setArtist] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // ---------------------------------------------------------------------------
  // FUNCTIONS

  function saveArtist() {
    // 0. Error Message
    if (name === "") {
      setErrorMsg("Missing Name.");
      return;
    } else {
      setErrorMsg("");
    }

    set(ref(database, `/${auth.currentUser.uid}/${user}`), {
      user: user,
      text: name
    })
      .then(() => {
        alert("saved changes to Favorite Artist list");
      })
      .catch((error) => {
        alert(error);
      });

    // Setting favorite artist
    setArtist(name);
    setName("");
  }

  // Load list on screen & load from database
  useEffect(() => {
    console.log("IN USE EFFECT CRASH");
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(database, `/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val();
          setArtist("");
          if (data != null) {
            let lastobj = Object.values(data).pop();
            setArtist(lastobj.text);
          }
        });
      }
    });
  }, []);

  // ---------------------------------------------------------------------------
  // DISPLAYED ON WEBSITE
  return (
    <>
      {/* List of Artists */}
      <div className="artist_list">
        <h3>Favorite Artist:</h3>
        <li className="music_artists">{artist}</li>
      </div>

      {/* Search Bar */}
      <div className="box">
        <p> Set a new favorite artist: </p>
        <form>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="save_btn"
            onClick={(e) => {
              e.preventDefault();
              saveArtist();
            }}
          >
            Save
          </button>

          {errorMsg && <p className="error"> {errorMsg} </p>}
        </form>
      </div>

      {/* Save Button*/}
      <div className="btns_list"></div>
    </>
  );
}
