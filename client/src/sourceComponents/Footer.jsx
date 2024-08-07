
import {Link} from "react-router-dom"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-muted py-12 md:py-16 lg:py-20">
      <div className="container max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="w-8 h-8" />
            <span className="text-xl font-bold">Eventify</span>
          </Link>
          <p className="text-muted-foreground">Discover and book the best events in your city.</p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <nav className="grid gap-1">
            <Link href="#" className="hover:underline" prefetch={false}>
              About
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Events
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Categories</h3>
          <nav className="grid gap-1">
            <Link href="#" className="hover:underline" prefetch={false}>
              Music
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Arts
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Sports
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Food
            </Link>
          </nav>
        </div>
        <div className="grid gap-4">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-sm text-muted-foreground">Get the latest updates and event recommendations.</p>
        </div>
      </div>
      <div className="container max-w-6xl mt-12 flex items-center justify-between text-sm text-muted-foreground">
        <p>&copy; 2024 Eventify. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link href="#" className="hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="hover:underline" prefetch={false}>
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
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