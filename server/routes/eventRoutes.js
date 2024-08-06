const express = require('express');
const { createEvent, editEvent, deleteEvent, getEvents } = require('../controllers/eventController');
const upload = require('../middlewares/multerMiddleware');
const router = express.Router();



router.post('/create-event', upload.fields([
    {
        name: "imageUrl",
        maxCount: 1
    }
]), createEvent);

router.put('/edit-event/:id', upload.fields([
    {
        name: "imageUrl",
        maxCount: 1
    }
]), editEvent);
router.delete('/delete-event/:id', deleteEvent);
router.get('/get-events', getEvents);

module.exports = router;
