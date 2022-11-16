import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { config } from "./firebaseConfig";

//Initialize Firebase
initializeApp(config);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();
