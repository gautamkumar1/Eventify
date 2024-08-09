import { Link } from "react-router-dom";
// import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "../../components/ui/pagination";
import { Card, CardContent } from "../../components/ui/card";
import { fetchEvents } from "../redux/event/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import MusicImage from "../assets/Music.png";
// import ArtImage from "../assets/Art.png";


export default function Event() {
  const dispatch = useDispatch();
  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  return (
    <div className="flex flex-col min-h-dvh">
      <section className="bg-muted py-12 md:py-20 lg:py-24">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore Events</h1>
            <p className="text-muted-foreground md:text-xl">
              Discover a diverse lineup of events, from tech conferences to cultural festivals. Join us as we celebrate
              innovation, creativity, and community.
            </p>
          </div>
        </div>
      </section>
      <main className="flex-1 bg-background">
        <div className="container px-4 md:px-6 py-8 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' &&
              events.map((event) => (
                <Card key={event.id}>
                  <img
                    src={event.imageUrl || 'default-image-url.jpg'}
                    width={600}
                    height={400}
                    alt={event.title}
                    className="rounded-t-xl w-full h-60 object-cover transition-all group-hover:scale-105"
                    style={{ aspectRatio: "600/400", objectFit: "cover" }}
                  />
                  <CardContent className="p-4 bg-card">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()} | {event.location}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <Link
                        to="/book-ticket"
                        className="inline-flex items-center justify-center h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        Book Now
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
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
