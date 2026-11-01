import express from 'express'
import {
  createLaporan,
  getAllLaporan,
  getLaporanById,
  updateStatusLaporan
} from '../controllers/laporanController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.use(requireAuth)
router.post('/', requireRole(['pelapor']), createLaporan)
router.get('/', getAllLaporan)
router.get('/:id', getLaporanById)
router.patch('/:id/status', requireRole(['team_branch', 'admin']), updateStatusLaporan)

export default router