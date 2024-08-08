
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { createEvent } from "../redux/event/eventsSlice"

export default function CreateEvent() {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    imageUrl: ""
  })
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.events);

  useEffect(()=>{
    if(error){
      toast.error("Create event failed")
    }
    if(status === "succeeded"){
      toast.success("Event created successfully")
      setEvent({ title: "", description: "", location: "", date: "", time: "", imageUrl: "" });
    }
  },[status, error])


  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEvent({ ...event, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Constructing the form data to send as multipart/form-data if there's an image file
    const eventData = new FormData();
    for (const key in event) {
      eventData.append(key, event[key]);
    }

    // Dispatch the createEvent action with the formData
    dispatch(createEvent(event));
  };
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-2xl mx-auto p-6 sm:p-8 md:p-10">
          <CardHeader className="mb-6">
            <CardTitle className="text-3xl font-bold">Create a New Event</CardTitle>
            <CardDescription>Fill out the details below to list your event.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" name="title" value={event.title} onChange={handleInput} placeholder="Enter event title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} name="description" value={event.description} onChange={handleInput} placeholder="Provide details about the event" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" value={event.location} onChange={handleInput} placeholder="Enter event location" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" value={event.date} onChange={handleInput} type="date" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" value={event.time} onChange={handleInput} type="time" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Event Image</Label>
                  <Input id="image" name="imageUrl" value={event.imageUrl} onChange={handleInput} type="file" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
