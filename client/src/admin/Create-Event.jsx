/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../../components/ui/card"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover"
import { Button } from "../../components/ui/button"
import { Calendar } from "../../components/ui/calendar"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../redux/event/eventsSlice';

export default function CreateEvent() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image: null,
  });

  const { status, error } = useSelector((state) => state.events);

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files ? files[0] : value,
    }));
  };
  const handleDateSelect = (date) => {
    date.preventDefault()
    setFormData({...formData, date });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Constructing the form data to send as multipart/form-data if there's an image file
    const eventData = new FormData();
    for (const key in formData) {
      eventData.append(key, formData[key]);
    }

    // Dispatch the createEvent action with the formData
    dispatch(createEvent(eventData));
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Create an Event</CardTitle>
            <CardDescription>Fill out the form below to create a new event.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Event Title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Event Description" value={formData.description} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className="w-full justify-start font-normal">
                        <CalendarDaysIcon className="mr-2 h-4 w-4 -translate-x-1" />
                        {formData.date ? formData.date : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        initialFocus
                        onSelect={(date) => {
                          // Prevent default behavior if necessary
                          date.preventDefault && date.preventDefault();
                          setFormData({ ...formData, date: date.toISOString().split('T')[0] });
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" value={formData.time} onChange={handleChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Event Location" value={formData.location} onChange={handleChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Event Image</Label>
                <Input id="image" type="file" onChange={handleChange} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleDateSelect}>Cancel</Button>
              <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Creating...' : 'Create Event'}
              </Button>
            </CardFooter>
          </form>
          {status === 'failed' && <p className="text-red-500">{error}</p>}
        </Card>
      </main>
      <footer className="bg-muted px-4 md:px-6 py-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">&copy; 2024 Event Planner. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium hover:underline">
            Terms of Service
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Privacy Policy
          </a>
        </nav>
      </footer>
    </div>
  );
}


function CalendarDaysIcon(props) {
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
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}


