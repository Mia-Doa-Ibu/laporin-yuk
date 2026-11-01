import express from 'express'
import {
  getAllKecamatan,
  getKecamatanById,
  createKecamatan,
  updateKecamatan,
  deleteKecamatan
} from '../controllers/kecamatanController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

// Route Publik (Bisa diakses siapa saja untuk kebutuhan dropdown form)
router.get('/', getAllKecamatan)
router.get('/:id', getKecamatanById)

// Route Terproteksi (Hanya Admin yang bisa menambah, mengubah, dan menghapus)
// router.post('/', requireAuth, requireRole(['admin']), createKecamatan)
// router.put('/:id', requireAuth, requireRole(['admin']), updateKecamatan)
// router.delete('/:id', requireAuth, requireRole(['admin']), deleteKecamatan)

router.post('/', createKecamatan)
router.put('/:id', updateKecamatan)
router.delete('/:id', deleteKecamatan)

export default router