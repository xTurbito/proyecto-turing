import express from 'express'
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/UserController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware ,getAllUsers)  
router.get('/:id', authMiddleware ,getUser)   
router.post('/', authMiddleware , createUser)  
router.put('/:id', authMiddleware , updateUser) 
router.delete('/:id', authMiddleware ,   deleteUser) 

export default router
