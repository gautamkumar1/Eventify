
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"



const events = [
  {
    id: "1",
    name: "Summer Music Festival",
    description: "A weekend of live music performances",
    location: "Central Park, New York",
  },
  {
    id: "2",
    name: "Tech Conference 2024",
    description: "Exploring the latest in technology",
    location: "Convention Center, San Francisco",
  },
  {
    id: "3",
    name: "Food & Wine Expo",
    description: "Taste cuisines from around the world",
    location: "Civic Center, Chicago",
  },
  {
    id: "4",
    name: "International Film Festival",
    description: "Showcasing independent films from global directors",
    location: "Various Theaters, Toronto",
  },
  {
    id: "5",
    name: "Marathon for Charity",
    description: "Annual run to raise funds for local charities",
    location: "Downtown Area, Boston",
  }
]

export function UpcomingEventsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Book Ticket</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.name}</TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>
              <Link to="/book-ticket">
              <Button variant="outline">
                Advance Ticket Book
              </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

