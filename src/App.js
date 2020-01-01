/* eslint-disable import/no-unresolved */
import React, { useState, lazy, Suspense } from "react";
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

// const Details = lazy(() => import("./Details"));

const App = () => {
  const themeHook = useState("darkblue");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <NavBar />
        {/* <Suspense fallback={<h1>loading route...</h1>}> */}
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
        {/* </Suspense> */}
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

export default App;
