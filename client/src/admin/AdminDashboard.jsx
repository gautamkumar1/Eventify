/* eslint-disable no-unused-vars */

import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../../components/ui/dropdown-menu"
import { Button } from "../../components/ui/button"
import {Link,Outlet} from "react-router-dom"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import adminImage from "../assets/admin pic.jpg"
// export default function AdminDashboard() {
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-muted/40">
//       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
//         <div className="flex-1 grid grid-cols-3 gap-4">
//           <Card className="p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium text-muted-foreground">Total Events</div>
//               <div className="text-2xl font-semibold">125</div>
//             </div>
//           </Card>
//           <Card className="p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium text-muted-foreground">Total Users</div>
//               <div className="text-2xl font-semibold">1,250</div>
//             </div>
//           </Card>
//           <Card className="p-4">
//             <div className="flex items-center justify-between">
//               <div className="text-sm font-medium text-muted-foreground">Total Bookings</div>
//               <div className="text-2xl font-semibold">750</div>
//             </div>
//           </Card>
//         </div>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
//               <img
//                 src={adminImage}
//                 width={36}
//                 height={36}
//                 alt="Avatar"
//                 className="overflow-hidden rounded-full"
//                 style={{ aspectRatio: "36/36", objectFit: "cover" }}
//               />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Settings</DropdownMenuItem>
//             <DropdownMenuItem>Support</DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>Logout</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </header>
//       <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
//         <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-[240px_1fr]">
//           <div className="hidden border-r bg-muted/40 lg:block">
//             <nav className="grid gap-2 p-4">
//               <Link
//                 href="#"
//                 className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
                
//               >
//                 <CalendarIcon className="h-5 w-5" />
//                 Create Event
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                
//               >
//                 <UsersIcon className="h-5 w-5" />
//                 Users
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                
//               >
//                 <ClipboardIcon className="h-5 w-5" />
//                 Bookings
//               </Link>
//             </nav>
//           </div>
//           <div className="grid gap-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Upcoming Events</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Event</TableHead>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Time</TableHead>
//                       <TableHead>Location</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell className="font-medium">Annual Company Retreat</TableCell>
//                       <TableCell>June 15, 2023</TableCell>
//                       <TableCell>9:00 AM - 5:00 PM</TableCell>
//                       <TableCell>Napa Valley, CA</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Product Launch Party</TableCell>
//                       <TableCell>July 20, 2023</TableCell>
//                       <TableCell>7:00 PM - 11:00 PM</TableCell>
//                       <TableCell>San Francisco, CA</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Team Building Retreat</TableCell>
//                       <TableCell>August 5, 2023</TableCell>
//                       <TableCell>9:00 AM - 4:00 PM</TableCell>
//                       <TableCell>Yosemite National Park, CA</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Holiday Party</TableCell>
//                       <TableCell>December 15, 2023</TableCell>
//                       <TableCell>6:00 PM - 10:00 PM</TableCell>
//                       <TableCell>Los Angeles, CA</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Registered Users</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Name</TableHead>
//                       <TableHead>Email</TableHead>
//                       <TableHead>Phone</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell className="font-medium">John Doe</TableCell>
//                       <TableCell>john.doe@example.com</TableCell>
//                       <TableCell>(123) 456-7890</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Jane Smith</TableCell>
//                       <TableCell>jane.smith@example.com</TableCell>
//                       <TableCell>(987) 654-3210</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Michael Johnson</TableCell>
//                       <TableCell>michael.johnson@example.com</TableCell>
//                       <TableCell>(555) 555-5555</TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Emily Davis</TableCell>
//                       <TableCell>emily.davis@example.com</TableCell>
//                       <TableCell>(111) 222-3333</TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Upcoming Bookings</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Event</TableHead>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Status</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     <TableRow>
//                       <TableCell className="font-medium">Annual Company Retreat</TableCell>
//                       <TableCell>John Doe</TableCell>
//                       <TableCell>
//                         <Badge variant="secondary">Confirmed</Badge>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Product Launch Party</TableCell>
//                       <TableCell>Jane Smith</TableCell>
//                       <TableCell>
//                         <Badge variant="secondary">Confirmed</Badge>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Team Building Retreat</TableCell>
//                       <TableCell>Michael Johnson</TableCell>
//                       <TableCell>
//                         <Badge variant="outline">Pending</Badge>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell className="font-medium">Holiday Party</TableCell>
//                       <TableCell>Emily Davis</TableCell>
//                       <TableCell>
//                         <Badge variant="secondary">Confirmed</Badge>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Header and other UI components */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* Header content */}
      </header>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-[240px_1fr]">
          <div className="hidden border-r bg-muted/40 lg:block">
            <nav className="grid gap-2 p-4">
              <Link
                to="/admin/create-events"
                className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <CalendarIcon className="h-5 w-5" />
                Create Event
              </Link>
              <Link
                to="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <UsersIcon className="h-5 w-5" />
                Users
              </Link>
              <Link
                to="#"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <ClipboardIcon className="h-5 w-5" />
                Bookings
              </Link>
            </nav>
          </div>
          <div className="grid gap-4">
            {/* This is where the routed content will render */}
            <Outlet />
          </div>
        </main>
      </div>
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


function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
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