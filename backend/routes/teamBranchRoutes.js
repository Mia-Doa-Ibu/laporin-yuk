import express from 'express'
import { 
  getAllTeamBranch, 
  getTeamBranchById, 
  updateTeamBranch, 
  verifyTeamBranch, 
  deleteTeamBranch ,
 
} from '../controllers/teamBranchController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'
import { requireRole } from '../middlewares/roleMiddleware.js'

const router = express.Router()

// router.use(requireAuth)

router.get('/', getAllTeamBranch)
router.get('/:id', getTeamBranchById)
router.put('/:id', requireRole(['team_branch', 'admin']), updateTeamBranch)
router.patch('/:id/verify', requireRole(['admin']), verifyTeamBranch) 
router.delete('/:id', requireRole(['admin']), deleteTeamBranch)

export default router