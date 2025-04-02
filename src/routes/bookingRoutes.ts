import { Router} from 'express';
import { auth } from '../middleware/auth';
import { createBooking } from '../controllers/bookingControllers/createBooking';
import { getAllBookings } from '../controllers/bookingControllers/getAllBookings';
import { getBookingById } from '../controllers/bookingControllers/getSingleBooking';
import { updatePaymentStatus } from '../controllers/bookingControllers/updatePaymentStatus';
import { deleteBooking } from '../controllers/bookingControllers/deleteBooking';


const router = Router();

router.post('/create-booking', auth, createBooking)
router.get('/get-all-bookings', auth, getAllBookings)
router.get('/get-single-booking/:id', auth, getBookingById)
router.put('/update-payment-status/:id', auth, updatePaymentStatus)
router.delete('/delete-booking/:id', auth, deleteBooking)

export default router;