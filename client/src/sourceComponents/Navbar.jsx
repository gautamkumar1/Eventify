/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom"
import { Sheet, SheetTrigger, SheetContent } from "../../components/ui/sheet"
import { Button } from "../../components/ui/button"
import { useSelector } from 'react-redux';
export default function Navbar() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="w-6 h-6" />
          <span className="text-lg font-bold">Eventify</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          <Link
            to="/events"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <CalendarIcon className="w-5 h-5" />
            Events
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <MailIcon className="w-5 h-5" />
            Contact
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <InfoIcon className="w-5 h-5" />
            About
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <LogInIcon className="w-5 h-5" />
            Login
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            prefetch={false}
          >
            <LogInIcon className="w-5 h-5" />
            Register
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="w-6 h-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          {/* Responsive  */}
          <SheetContent side="left" className="md:hidden">
            <nav className="grid gap-4 p-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
              <Link
                to="/events"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <CalendarIcon className="w-5 h-5" />
                Events
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <MailIcon className="w-5 h-5" />
                Contact
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <InfoIcon className="w-5 h-5" />
                About
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"

              >
                <LogInIcon className="w-5 h-5" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                <LogInIcon className="w-5 h-5" />
                Register
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
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


function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function LogInIcon(props) {
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
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}


function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}