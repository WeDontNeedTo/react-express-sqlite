import React from "react";
import { BrowserRouter } from "react-router-dom";
import "materialize-css";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";
import Navbar from "./components/Navbar";

function App() {
  const {token,login,logout, userId} = useAuth()
  let isAuth=!!token
  console.log(isAuth)
  const routes = useRoutes(isAuth) // useRoutes(isAuth) but for dev use  fake true value
  return (
    <AuthContext.Provider value={token,login,logout,userId,isAuth}>
    <BrowserRouter>
      {isAuth=true && <Navbar/>}
      <div className="container">{routes}</div>
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
