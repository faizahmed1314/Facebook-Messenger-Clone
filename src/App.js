import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  InputLabel,
  Input,
  FormControl,
  IconButton,
} from "@material-ui/core";
import Message from "./Message";
import { db } from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
  // useState variable in react
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "faiz", message: "hi" },
    { username: "rasel", message: "hello" },
  ]);
  const [username, setUsername] = useState("");
  //useEffect= run code base on the condition when the app loaded

  useEffect(() => {
    // run once when the app component load
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  });
  useEffect(() => {
    // run code here...
    // if its blank inside [], this code run once when the app loads
    setUsername(prompt("Please enter your name"));
  }, []); //condition

  const sendMessage = (e) => {
    e.preventDefault();
    // all the logic to send a message goes
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="App">
      <img
        src="https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk=s180-rw"
        srcset="https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk=s360-rw 2x"
        class="T75of sHb2Xb"
        aria-hidden="true"
        alt="Cover art"
        itemprop="image"
        data-iml="549.1650000330992"
        data-atf="true"
      ></img>
      <h1>Hello Claver programmers</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__iconButton"
            disabled={!input}
            color="primary"
            variant="contained"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      {/* Message themeselves */}
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
