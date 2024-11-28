import express from 'express'
import { createSlideDesarrollo, updateSlideDesarrollo, deleteSlideDesarrollo, getAllSlideDesarrollos, getSlideDesarrollo } from '../controllers/SlideDesarrollosController.js'
import authMiddleware from '../middlewares/authMiddleware.js'


const router = express.Router()

router.get('/', getAllSlideDesarrollos)
router.get('/:id', authMiddleware , getSlideDesarrollo)
router.post('/', authMiddleware , createSlideDesarrollo)
router.put('/:id', authMiddleware , updateSlideDesarrollo)
router.delete('/:id', authMiddleware , deleteSlideDesarrollo)

export default router