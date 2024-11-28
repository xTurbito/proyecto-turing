import express from 'express'
import { createSocio, deleteSocio, getAllSocios, getSocio, updateSocio } from '../controllers/SociosController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router =  express.Router()

router.get('/', getAllSocios)
router.get('/:id', authMiddleware , getSocio)
router.post('/', authMiddleware , createSocio)
router.put('/:id',  authMiddleware , updateSocio)
router.delete('/:id', authMiddleware , deleteSocio)


export default router