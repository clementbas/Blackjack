import express from 'express'
import {  getUserById, registerUser, loginUser, patchUser } from '../controllers/users.controller.js'
import authMiddleware from '../middlewares/auth.js'

// Create a new router
const router = express.Router()

// Define the routes and the functions that will be executed when those routes are requested
// The functions are imported from the controller(s)
router.post('/register',registerUser) // Will match POST /users/register
router.post('/login', loginUser) // Will match POST /users/login
router.patch('/:id', authMiddleware, patchUser) // Will match PATCH /users/:id
router.get('/:id', authMiddleware, getUserById) // Will match GET /users/:id

// Export the router to be used on the app
export default router