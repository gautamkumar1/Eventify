/* eslint-disable no-unused-vars */

import {Link, Route, Routes} from "react-router-dom"
import { Button } from "../../components/ui/button"
import Tables from "./Tables"
import CreateEvent from "./Create-Event"
import GetAllEvent from "./GetAllEventTable"
import TicketCreationPage from "./CreateTicket"
import { Sheet, SheetTrigger, SheetContent } from "../../components/ui/sheet"
import GetAllTickets from "./GetAllTickets"
import GetAllUsers from "./GetAllUser"


export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
      <Link
            to="/admin"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            
            <div className="flex items-center gap-2">
          <CalendarIcon className="h-6 w-6" />
          <h1 className="text-x font-semibold">Admin Dashboard</h1>
        </div>
          </Link>
        <nav className="mt-8 space-y-4">
          {/* Create Event */}
          <Link
            to="/admin/create-events"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5" />
            Create Event
          </Link>
          
          {/* Get Event */}
          <Link
            to="/admin/get-events"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <ListIcon className="h-5 w-5" />
            View All Events
          </Link>
          {/* Get Tickets */}
          {/* Create Ticket */}
          <Link
            to="/admin/create-tickets"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <TicketIcon className="h-5 w-5" />
            Create Ticket
          </Link>
          <Link
            to="/admin/get-tickets"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <ListIcon className="h-5 w-5" />
            View All Tickets
          </Link>
          <Link
            to="/admin/get-users"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            Manage Users
          </Link>
        </nav>
      </aside>
      
      <div className="flex flex-1 flex-col">
        {/* Header */}
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
              <Link
            to="/admin/create-events"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="h-5 w-5" />
            Create Event
          </Link>
          <Link
            to="/admin/get-events"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <ListIcon className="h-5 w-5" />
            View All Events
          </Link>
          <Link
            to="/admin/create-tickets"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <TicketIcon className="h-5 w-5" />
            Create Ticket
          </Link>
          <Link
            to="/admin/get-tickets"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <ListIcon className="h-5 w-5" />
            View All Tickets
          </Link>
          <Link
            to="/admin/get-users"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
            prefetch={false}
          >
            <UsersIcon className="h-5 w-5" />
            Manage Users
          </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* Header */}
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">Admin Dashboard</h1>
          </div>
          
        </header>
        {/* Main Content */}
        
         <Routes>
        <Route path="/" element={<Tables />} />
        <Route path="create-events" element={<CreateEvent />} />
        <Route path="get-events" element={<GetAllEvent />} />
        <Route path="create-tickets" element={<TicketCreationPage />} />
        <Route path="get-tickets" element={<GetAllTickets />} />
        <Route path="get-users" element={<GetAllUsers />} />
        
    </Routes>

       
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


function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
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



function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

