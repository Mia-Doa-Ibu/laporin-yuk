import express from 'express'
import {
  createAnggota,
  getAllAnggota,
  getAnggotaById,
  updateAnggota,
  deleteAnggota
} from '../controllers/anggotaController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

router.use(requireAuth)

router.post('/', requireRole(['team_branch', 'admin']), createAnggota)
router.get('/', getAllAnggota)
router.get('/:id', getAnggotaById)
router.put('/:id', requireRole(['team_branch', 'admin']), updateAnggota)
router.delete('/:id', requireRole(['team_branch', 'admin']), deleteAnggota)

export default router