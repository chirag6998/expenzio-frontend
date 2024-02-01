import React, { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SetUp from "./pages/SetUp";
import Homepage from "./pages/Homepage";
import EditBudget from "./pages/EditBudget";
import ManageExpenses from "./pages/ManageExpenses";
import SignIn from "./pages/SignIn";
import { useDispatch, useSelector } from "react-redux";
import { State } from "./types/types";
import ProtectedRoute from "./components/protectedRoute";
import Cookies from "js-cookie";
import { setToken } from "./store/slices/user";
import Loading from "./components/loading";

function App() {

  const dispatch = useDispatch();

  let logoImage = process.env.PUBLIC_URL + "/logo.png";
  let [loading, setLoading] = useState(true);
  const token = useSelector((state: State) => state.user.token);

  useEffect(() => {
    if (!token) {
      let tokenFromCookies = Cookies.get("Expenzio");
      if (!tokenFromCookies) setLoading(false);
      dispatch(setToken(tokenFromCookies));
    }
  }, [token]);

  useEffect(() => {
    if (token) setLoading(false);
  }, [token]);

  if (loading) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <div style={{ position: "absolute", top: 10, right: 10 }}> {/* Adjust the margin as needed */}
        <img src={logoImage} alt="Logo" className="h-16 w-35" style={{
          boxShadow: '0 4px 8px rgba(0, 0, 0, 1)',
          transform: 'rotateX(10deg) rotateY(0deg)'
        }} />
      </div>
      <Routes>
        <Route path="/" Component={SignUp} />
        <Route path="/signin" Component={SignIn} />
        <Route path="/setup" element={<ProtectedRoute><SetUp /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
        <Route path="/editbudget" element={<ProtectedRoute><EditBudget /></ProtectedRoute>} />
        <Route path="/expenses" element={<ProtectedRoute><ManageExpenses /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;