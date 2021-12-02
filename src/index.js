import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { ChatPage, ProfilePage } from "./pages";
import { CustomThemeProvider } from "./theme-context";
import { store } from "./store";
// import { store } from "./store/my-redux";

import "./palette.css";
import "./global.css";

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <React.StrictMode>
      <Provider store={store}>
        <CustomThemeProvider>
          <BrowserRouter>
            {/* <button onClick={() => setCount(count + 1)}>setCount</button> */}
            <Header count={count} />

            <Routes>
              <Route path="/" element={<h1>Home Page</h1>} />
              <Route path="/chat/*" element={<ChatPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </CustomThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));