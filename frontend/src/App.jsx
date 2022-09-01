import { useEffect } from "react";
import React, { useState } from "react ";

import Index from "./components/Index";

const App = () => {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setLoggedIn] = useState(token ? true : false);
  const [user, setUser] = useState(null);

  /* useEffect(() => {
    console.log("using effect")
    const token = localStorage.getItem("token");
    if (token && token !== "unassigned") {
      setLoggedIn(true);
      const user = localStorage.getItem("user");
      setUser(user);
    }
  }, []); */

  return (
    <div>
      <Index
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        user={user}
        setUser={setUser}
      />
    </div>
  );
};

export default App;
