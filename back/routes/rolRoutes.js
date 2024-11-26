import express from 'express'
import { createRol, deleteRol, getAllRoles, getRol, updateRol } from '../controllers/RolController.js'

const router = express.Router()


router.get('/', getAllRoles)  
router.get('/:id', getRol)   
router.post('/', createRol)  
router.put('/:id', updateRol)
router.delete('/:id', deleteRol) 

export default router
