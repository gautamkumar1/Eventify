const Event = require('../models/Event');
const cloudinary = require('../cloudinary/cloudinary');
const multer = require('multer');
const { Op } = require('sequelize');
const uploadOnCloudinary = require('../cloudinary/cloudinary');

const storage = multer.memoryStorage();
const upload = multer({ storage });



exports.createEvent = async (req, res) => {
    try {
      const { title, description, date, time, location } = req.body;
  
      // Check for required fields
      if (!title || !description || !date || !time || !location) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      let eventImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.imageUrl) &&
    req.files.imageUrl.length > 0
  ) {
    eventImageLocalPath = req.files.imageUrl[0].path;
  }
  const imageUrl = await uploadOnCloudinary(eventImageLocalPath);
      // Create the event
      const event = await Event.create({ title, description, date, time, location, imageUrl: imageUrl?.url || "", });
  
      // Send the response
      res.status(201).json({
        message: "Event created successfully",
        event: event,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Event creation failed" });
    }
  };
  
  
exports.editEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time, location } = req.body;

        let imageUrl = '';
        if (req.file) {
            const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) {
                    throw new Error('Image upload failed');
                }
                return result.secure_url;
            }).end(req.file.buffer);
            imageUrl = result.secure_url;
        }

        const updatedEvent = await Event.update(
            { title, description, date, time, location, imageUrl },
            { where: { id } }
        );
        res.status(200).json({ message: "Event updated successfully" ,
            updatedEvent:updatedEvent
        });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: "Event updated failed" });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.destroy({ where: { id } });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: 'Event deleted failed' });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.findAll();
        res.status(200).json({ message: 'All Event fetched successfully' ,
            events:events
        });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: 'All Event fetched failed' });
    }
};
