/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Sheet, SheetTrigger, SheetContent } from "../../components/ui/sheet"
import { Button } from "../../components/ui/button"


import GetBookTicket from "./GetBookTicket"
import { UpcomingEventsTable } from "./UpcomingEvent"
import { useEffect } from "react"
import { toast } from "react-toastify"
import Home from "./Home"
export default function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    console.log("location.search", location.search);
    const token = searchParams.get("token");
    // console.log("token", token);
    // console.log("location.search", location.search);
    if (token) {
      console.log("User Effect1 Token: " + token);

      localStorage.setItem("token", token);
     
      
    }
  }, [location.search]);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    console.log("User Effect2 Token: " + token);
    
    if(!token){
      
      navigate('/login', { replace: true });
      toast.error("Unauthorized User")
    }
  },[])
  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-background p-6 md:flex">
        <div className="mb-6">
          <Link to="/userdashboard" className="flex items-center gap-2 font-semibold" prefetch={false}>
            <Package2Icon className="h-6 w-6" />
            <span>Eventify</span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col space-y-2">
          {/* <Link
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <TicketIcon className="h-5 w-5" />
            <span>Show Current Ticket</span>
          </Link> */}
          <Link
            to="/userdashboard/history-tickets"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Show History Ticket</span>
          </Link>
          <Link
            to="/userdashboard/upcoming-event"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5" />
            <span>Upcoming Event</span>
          </Link>
        </nav>
      </aside>
      {/* Toogle */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:h-16 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-4 p-4 text-sm font-medium">
                {/* <Link
                  href="#"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <TicketIcon className="h-5 w-5" />
                  <span>Show Current Ticket</span>
                </Link> */}
                <Link
                  to="/userdashboard/history-tickets"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>Show History Ticket</span>
                </Link>
                <Link
                  to="/userdashboard/upcoming-event"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  prefetch={false}
                >
                  <CalendarIcon className="h-5 w-5" />
                  <span>Upcoming Event</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* Header */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">User Dashboard</h1>
          </div>
          
        </header>
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">


          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="upcoming-event" element={<UpcomingEventsTable />} />
            <Route path="history-tickets" element={<GetBookTicket />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  )
}


function TicketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  )
}