import { Link } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-muted py-8 md:py-10 lg:py-12">
      <div className="container mx-auto max-w-5xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-3">
          <Link to="#" className="flex items-center gap-2">
            <MountainIcon className="w-8 h-8" />
            <span className="text-xl font-bold">Eventify</span>
          </Link>
          <p className="text-muted-foreground text-sm">
            Discover and book the best events in your city.
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <nav className="grid gap-1">
            <Link to="#" className="hover:underline">
              About
            </Link>
            <Link to="#" className="hover:underline">
              Events
            </Link>
            <Link to="#" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Categories</h3>
          <nav className="grid gap-1">
            <Link to="#" className="hover:underline">
              Music
            </Link>
            <Link to="#" className="hover:underline">
              Arts
            </Link>
            <Link to="#" className="hover:underline">
              Sports
            </Link>
            <Link to="#" className="hover:underline">
              Food
            </Link>
          </nav>
        </div>
        <div className="grid gap-3">
          <h3 className="text-lg font-semibold">Newsletter</h3>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button type="submit">Subscribe</Button>
          </form>
          <p className="text-xs text-muted-foreground">
            Get the latest updates and event recommendations.
          </p>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl mt-8 flex flex-col items-center justify-between gap-4 md:flex-row text-xs text-muted-foreground">
        <p>&copy; 2024 Eventify. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link to="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:underline">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
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
  );
}
