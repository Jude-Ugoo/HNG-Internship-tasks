import { Router } from 'express'
import { register } from '../controllers/auth.controller'

const authRoute = Router()

authRoute.post('/register', register)

export default authRoute