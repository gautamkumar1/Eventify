const express = require('express');
const { createEvent, editEvent, deleteEvent, getEvents } = require('../controllers/eventController');
const upload = require('../middlewares/multerMiddleware');
const { isAuthenticated,isAuthorized } = require('../middlewares/AuthMiddleware');
const { getAllUsersData, updateUser, deleteUser } = require('../controllers/authController');
const router = express.Router();

router.post('/create-event', isAuthenticated,isAuthorized(),upload.fields([
    {
        name: "imageUrl",
        maxCount: 1
    }
]), createEvent);

router.put('/edit-event/:id', isAuthenticated,isAuthorized(),upload.fields([
    {
        name: "imageUrl",
        maxCount: 1
    }
]), editEvent);
router.delete('/delete-event/:id', isAuthenticated,isAuthorized(),deleteEvent);
router.get('/get-events', getEvents);
router.get('/get-users', isAuthenticated,isAuthorized(),getAllUsersData);
router.put('/update-users/:id', isAuthenticated,isAuthorized(),updateUser);
router.delete('/delete-users/:id', isAuthenticated,isAuthorized(),deleteUser);
module.exports = router;
