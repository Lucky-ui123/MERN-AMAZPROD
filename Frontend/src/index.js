import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}> {/* // for using like this it'll be availabel for globally 'store' */}
        <App />
    </Provider>
);
