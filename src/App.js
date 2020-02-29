import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Predictions } from "aws-amplify";

function App() {
  const [response, setResponse] = useState("Please upload a photo...");
  async function identify(event) {
    event.persist();
    setResponse("Identifying text...");
    console.log("event", event);
    const {
      target: { files }
    } = event;

    console.log("target", files[0].name);
    const file = files[0];
    const data = await Predictions.identify({
      text: { source: { file }, format: "PLAIN" } //PLAIN, FORMm TABLE, ALL
    });
    console.log("data", data);
    setResponse(data.text.fullText);
    console.log(data.text.fullText);
  }
  return (
    <div className="App">
      <h1>File Identification</h1>
      <input type="file" onChange={event => identify(event)} />
      <p>{response}</p>
    </div>
  );
}

export default App;
