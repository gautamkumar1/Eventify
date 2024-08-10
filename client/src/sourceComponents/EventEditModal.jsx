
import { useState } from 'react';
import { Button } from "../../components/ui/button";
import { useDispatch } from 'react-redux';
import { editEvent } from '../redux/event/eventsSlice';

const EventEditModal = ({ event, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    date: event.date,
    time: event.time,
    imageUrl: event.imageUrl,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editEvent({ id: event.id, eventData: formData }));
    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter event title"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter event description"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter event location"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date.split('T')[0]} // Extract date part
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">
              Image URL:
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border border-gray-600 rounded bg-gray-900 text-white placeholder-gray-500"
                placeholder="Enter image URL (optional)"
              />
            </label>
          </div>
          <div className="flex gap-4">
            <Button type="submit" size="sm" variant="outline" className="flex-1">
              Save
            </Button>
            <Button type="button" size="sm" variant="destructive" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEditModal;
