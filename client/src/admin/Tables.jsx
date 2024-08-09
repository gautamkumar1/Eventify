import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,DropdownMenuItem } from "../../components/ui/dropdown-menu"
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
const Tables = () => {
  return (
   <div>
     <main className="p-6">
          {/* Content - Total Event */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              {/* Total Events */}
              <CardHeader>
                <CardTitle>Total Events</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold">125</span>
                </CardDescription>
              </CardHeader>
              
            </Card>
            <Card>
              <CardHeader>
                {/* Total Booking */}
                <CardTitle>Total Bookings</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold">1,234</span>
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                {/* Total Users */}
                <CardTitle>Total Users</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold">234</span>
                </CardDescription>
              </CardHeader>
            
            </Card>
          </div>
          {/* Recent Event */}
          <div className="mt-6">
            <h2 className="mb-4 text-lg font-semibold">Recent Events</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Music Festival</div>
                    <div className="text-sm text-muted-foreground">Outdoor event</div>
                  </TableCell>
                  <TableCell>June 15, 2023</TableCell>
                  <TableCell>450</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Upcoming</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon  className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Tech Conference</div>
                    <div className="text-sm text-muted-foreground">Indoor event</div>
                  </TableCell>
                  <TableCell>July 1, 2023</TableCell>
                  <TableCell>750</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Upcoming</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                        <DropdownMenuItem>View Bookings</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Art Exhibition</div>
                    <div className="text-sm text-muted-foreground">Indoor event</div>
                  </TableCell>
                  <TableCell>August 10, 2023</TableCell>
                  <TableCell>320</TableCell>
                  <TableCell>
                    <Badge variant="outline">Completed</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoveHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Archive</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </main>
   </div>
  )
}

export default Tables;
function MoveHorizontalIcon(props) {
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
        <polyline points="18 8 22 12 18 16" />
        <polyline points="6 8 2 12 6 16" />
        <line x1="2" x2="22" y1="12" y2="12" />
      </svg>
    )
  }