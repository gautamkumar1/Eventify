
import {Link} from "react-router-dom"

 function FailedPayment() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Payment Failed</h1>
      </div>
      <div className="mt-8 w-full max-w-md space-y-4">
        <Link
          to="/book-ticket"
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Again Book Ticket
        </Link>
      </div>
    </div>
  )
}

export default FailedPayment
