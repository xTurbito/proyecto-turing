import express from 'express'
import { createRol, deleteRol, getAllRoles, getRol, updateRol } from '../controllers/RolController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()


router.get('/', authMiddleware, getAllRoles)  
router.get('/:id',  authMiddleware ,getRol)   
router.post('/', authMiddleware, createRol)    
router.put('/:id', authMiddleware, updateRol)
router.delete('/:id', authMiddleware, deleteRol) 

export default router
