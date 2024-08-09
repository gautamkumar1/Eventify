
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { createEvent } from "../redux/event/eventsSlice"

export default function EditEvent() {
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
      toast.error("Event Edited Failed")
    }
    if(status === "succeeded"){
      toast.success("Event Edited successfully")
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
      <Card className="w-full max-w-2xl mx-auto p-6 sm:p-8 md:p-10 bg-gray-800">
        <CardHeader className="mb-6">
          <CardTitle className="text-3xl font-bold text-white">Edit Event</CardTitle>
          <CardDescription className="text-gray-400">Fill out the details below to list edit your event.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Form */}
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-gray-300">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={event.title}
                onChange={handleInput}
                placeholder="Enter event title"
                className="text-gray-200 bg-gray-900"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                rows={4}
                name="description"
                value={event.description}
                onChange={handleInput}
                placeholder="Provide details about the event"
                className="text-gray-200 bg-gray-900"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="location" className="text-gray-300">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={event.location}
                  onChange={handleInput}
                  placeholder="Enter event location"
                  className="text-gray-200 bg-gray-900"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date" className="text-gray-300">Date</Label>
                <Input
                  id="date"
                  name="date"
                  value={event.date}
                  onChange={handleInput}
                  type="date"
                  className="text-gray-200 bg-gray-900"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="time" className="text-gray-300">Time</Label>
                <Input
                  id="time"
                  name="time"
                  value={event.time}
                  onChange={handleInput}
                  type="time"
                  className="text-gray-200 bg-gray-900"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image" className="text-gray-300">Event Image</Label>
                <Input
                  id="image"
                  name="imageUrl"
                  value={event.imageUrl}
                  onChange={handleInput}
                  type="file"
                  className="text-gray-300 bg-gray-900 file:text-gray-300 file:bg-gray-700 file:border-none"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" className="bg-blue-600 text-white">Create Event</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  </div>
  
  )
}
