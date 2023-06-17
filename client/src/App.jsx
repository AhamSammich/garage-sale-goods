import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";

// pages and components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Home />}
              />
            <Route
              path="/signup"
              element={<Signup />}
              />
            <Route
              path="/login"
              element={<Login />}
              />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
