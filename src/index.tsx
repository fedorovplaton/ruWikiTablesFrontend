import React from "react";
import ReactDOM from "react-dom";
import {MainPage} from "./core/page/MainPage";

const App = () => <MainPage/>;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
