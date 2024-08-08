/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./sourceComponents/Navbar"
import Footer from "./sourceComponents/Footer"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Event from "./pages/Event"

import AdminDashboard from "./admin/AdminDashboard"
import CreateEvent from "./admin/Create-Event"
import { useSelector } from "react-redux"
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute"


function App() {
  // const token = localStorage.getItem('token')
  const { isLoggedIn,isAdmin} = useSelector((state) => state.auth);
  console.log("isAdmin: " + isAdmin);
  console.log("isLoggedIn: " + isLoggedIn);
  console.log("isLoggedIn && isAdmin : "+ isLoggedIn && isAdmin);
  
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<ProtectedRoute element={<Event />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} adminOnly={true} />} />
          <Route path="/admin/create-events" element={<ProtectedRoute element={<CreateEvent />} adminOnly={true} />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}



export default App
