import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, InputLabel, Input, FormControl } from "@material-ui/core";
import Message from "./Message";
import { db } from "./firebase";

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
    db.collection("messages").onSnapshot((snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
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
    setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };
  return (
    <div className="App">
      <h1>Hello Claver programmers</h1>
      <h2>Welcome {username}</h2>
      <form>
        <FormControl>
          <InputLabel>Enter a message</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button
            disabled={!input}
            color="primary"
            variant="contained"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>
      {/* Message themeselves */}
      {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    </div>
  );
}

export default App;
