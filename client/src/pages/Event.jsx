import { useAuth0 } from "@auth0/auth0-react"

function Event() {
  const {isLoading, error , isAuthenticated} = useAuth0()
  console.log('asjdasd,',isLoading, error,isAuthenticated)
  return ( 
    <div className="flex flex-col min-h-screen justify-center items-center">Event</div>
  )
}

export default Event