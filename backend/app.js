import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import laporanRoutes from './routes/laporanRoutes.js'
import kecamatanRoutes from './routes/kecamatanRoutes.js'
import pelaporRoutes from './routes/pelaporRoutes.js'
import teamBranchRoutes from './routes/teamBranchRoutes.js'
import anggotaRoutes from './routes/anggotaRoutes.js'

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/kecamatan', kecamatanRoutes)
app.use('/api/laporan', laporanRoutes)
app.use('/api/pelapor', pelaporRoutes)
app.use('/api/team-branch', teamBranchRoutes)
app.use('/api/anggota', anggotaRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Laporin Yuk Berjalan' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server Express berjalan di port ${PORT}`)
})

export default app
