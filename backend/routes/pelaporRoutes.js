import express from 'express'
import { getAllPelapor, getPelaporById, updatePelapor, deletePelapor } from '../controllers/pelaporController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.use(requireAuth)

router.get('/', requireRole(['admin']), getAllPelapor)
router.get('/:id', getPelaporById)
router.put('/:id', requireRole(['pelapor', 'admin']), updatePelapor)
router.delete('/:id', requireRole(['admin']), deletePelapor)

export default router