import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import LookingForPlasma from "./pages/LookingForPlasma";
import Home from "./pages/Home";
import WantToDonate from "./pages/WantToDonate";

import DonarLogin from "./pages/DonarLogin";
import AdminLogin from "./pages/AdminLogin";
import SignUp from "./pages/SignUp";

import AuthContextProvider from "./context/authContext";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminPages/AdminDasboard";
import AdminNav from "./pages/AdminPages/AdminNav";
import AllDonors from "./pages/AdminPages/AllDonors";
import Requests from "./pages/AdminPages/Requests";
import Myprofile from "./pages/AdminPages/MyProfile";
function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/">
            <Route element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="/lookforplasma" element={<LookingForPlasma />} />
              <Route path="/wanttodonate" element={<WantToDonate />} />
              <Route path="/donarlogin" element={<DonarLogin />} />
              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="admin" element={<AdminNav />}>
            <Route index element={<AdminDashboard />} />
            <Route path="alldonors" element={<AllDonors />} />
            <Route path="requests" element={<Requests />} />
            <Route path="myprofile" element={<Myprofile />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
