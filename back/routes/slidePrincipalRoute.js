import express from 'express'
import { createSlidePrincipal, updateSlidePrincipal, deleteSlidePrincipal, getAllImagesPrincipal, getSlidePrincipal } from '../controllers/SlidePrincipalController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()


router.get('/',  getAllImagesPrincipal)
router.get('/:id',authMiddleware , getSlidePrincipal)
router.post('/', authMiddleware , createSlidePrincipal)
router.put('/:id', authMiddleware , updateSlidePrincipal)
router.delete('/:id', authMiddleware , deleteSlidePrincipal)


export default router