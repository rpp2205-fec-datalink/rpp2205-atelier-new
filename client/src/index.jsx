import React from "react";
// import ReactDOM from "react-dom/client";
import App from "../src/App.jsx";
// import { render } from "react-dom";
import { createRoot } from 'react-dom/client';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

// render(<App />, root);

const container = document.getElementById("root");
const rootTwo = createRoot(container);
rootTwo.render(<App />);
