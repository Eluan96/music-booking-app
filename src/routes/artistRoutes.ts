import { Router} from 'express';
import { auth } from '../middleware/auth';
import { createArtist } from '../controllers/artistControllers/createArtist';
import { deleteArtist } from '../controllers/artistControllers/deleteArtist';
import { getAllArtists } from '../controllers/artistControllers/getAllArtist';
import { getArtistById } from '../controllers/artistControllers/getSingleArtist';
import { updateArtist } from '../controllers/artistControllers/updateArtistDetails';
import { updateAvailability } from '../controllers/artistControllers/updateArtistAvailability';

const router = Router();

router.post('/create-artist', auth, createArtist)
router.delete('/delete-artist/:id', auth, deleteArtist)
router.get('/get-all-artist', auth, getAllArtists)
router.get('/get-single-artist/:id', auth, getArtistById)
router.put('/update-artist-details', auth, updateArtist)
router.put('/update-artist-availability', auth, updateAvailability)

export default router;