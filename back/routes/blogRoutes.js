import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from '../controllers/BlogController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', authMiddleware ,getAllBlogs)  
router.get('/:id', authMiddleware ,getBlog)   
router.post('/', authMiddleware , createBlog)  
router.put('/:id',authMiddleware , updateBlog) 
router.delete('/:id', authMiddleware ,deleteBlog) 

export default router
