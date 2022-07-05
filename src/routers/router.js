import express from 'express'
import { directToOnboarding, renderIndex, } from '../controllers/uiController.js'
import { renderOnboarding } from '../controllers/uiController.js'

export const router = express.Router()

router
    .get('/', directToOnboarding)
    .post('/', renderIndex)
    
    .get('/onboarding', renderOnboarding)



