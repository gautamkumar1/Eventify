/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./sourceComponents/Navbar"
import Footer from "./sourceComponents/Footer"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Event from "./pages/Event"
import Logout from "./pages/Logout"
import Cookies from "js-cookie"


function App() {
  const token = Cookies.get('token')
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Event />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
