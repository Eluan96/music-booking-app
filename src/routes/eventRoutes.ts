import { Router} from 'express';
import { auth } from '../middleware/auth';
import { createEvent } from '../controllers/eventControllers/createEvent';
import { getAllEvents } from '../controllers/eventControllers/getAllEvents';
import { getEventById } from '../controllers/eventControllers/getSingleEvent';
import { deleteEvent } from '../controllers/eventControllers/deleteEvent';
import { updateEvent } from '../controllers/eventControllers/updateEventDetails';



const router = Router();

router.post('/create-event', auth, createEvent)
router.get('/get-all-events', auth, getAllEvents)
router.get('/get-single-event/:id', auth, getEventById)
router.delete('/delete-event/:id', auth, deleteEvent)
router.put('/update-event-details/:id', auth, updateEvent)

export default router;