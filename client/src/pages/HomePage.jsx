
import { Link } from "react-router-dom"
import { Card, CardContent } from "../../components/ui/card"
import MusicImage from "../assets/Music.png"
import ArtImage from "../assets/Art.png"
import ComedyImage from "../assets/Comedy.png"
import MyImage from "../assets/My pic.jpg"
function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 sm:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 min-h-[50vh]">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                Discover and Book Unforgettable Events
              </h1>
              <p className="text-lg sm:text-xl text-white">
                Explore a wide range of events and book your tickets with ease.
              </p>
              <Link
                href="#"
                className="inline-flex items-center justify-center h-12 px-6 rounded-md bg-white text-primary font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                prefetch={false}
              >
                Book an Event
              </Link>
            </div>
            <div className="hidden lg:block">
              {/* Add image or other content here if needed */}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-4">
              <CalendarIcon className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Event Planning</h3>
              <p className="text-muted-foreground">
                Our team of experts can help you plan and execute your dream event.
              </p>
            </div>
            <div className="space-y-4">
              <TicketIcon className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Ticket Booking</h3>
              <p className="text-muted-foreground">
                Easily book tickets for a wide range of events with our user-friendly platform.
              </p>
            </div>
            <div className="space-y-4">
              <MegaphoneIcon className="w-12 h-12 text-primary" />
              <h3 className="text-2xl font-bold">Event Promotion</h3>
              <p className="text-muted-foreground">Let us help you promote your event and reach a wider audience.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-muted py-20 sm:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Upcoming Events</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Check out our upcoming events and book your tickets now.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
            <Card>
              <img
                src={MusicImage}
                width={600}
                height={400}
                alt="Event Image"
                className="rounded-t-xl"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">Music Festival</h3>
                <p className="text-muted-foreground">Join us for a weekend of live music, food, and fun.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>June 10-12</span>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    prefetch={false}
                  >
                    Book Now
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <img
                src={ArtImage}
                width={600}
                height={400}
                alt="Event Image"
                className="rounded-t-xl"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">Art Exhibition</h3>
                <p className="text-muted-foreground">Explore the latest works from local and international artists.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>July 1-15</span>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    prefetch={false}
                  >
                    Book Now
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <img
                src={ComedyImage}
                width={600}
                height={400}
                alt="Event Image"
                className="rounded-t-xl"
                style={{ aspectRatio: "600/400", objectFit: "cover" }}
              />
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">Comedy Show</h3>
                <p className="text-muted-foreground">Laugh the night away with some of the best comedians in town.</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <span>August 5</span>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    prefetch={false}
                  >
                    Book Now
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-20 sm:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <img
                src={MyImage}
                width={400}
                height={400}
                alt="Gautam Kumar"
                className="rounded-xl"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">About the Founder</h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
              Full-Stack Developer/Coder 🥷, Learner 👨‍💻, Tech Enthusiast 📱, & Gamer 🦸‍♂️ from India 🇮🇳
              </p>
              <div className="flex items-center gap-4">
                <Link to="https://github.com/gautamkumar1" target="_blank" prefetch={false}>
                  <GithubIcon className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
                <Link to="https://www.linkedin.com/in/gautamkum4r/" target="_blank" prefetch={false}>
                  <LinkedinIcon className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
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


function GithubIcon(props) {
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
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


function LinkedinIcon(props) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MegaphoneIcon(props) {
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
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
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


export default HomePage