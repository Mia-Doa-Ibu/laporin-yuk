import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import laporanRoutes from './routes/laporanRoutes.js'
// import adminRoutes from './routes/adminRoutes.js'
import  kecamatanRoutes from './routes/kecamatanRoutes.js'
import pelaporRoutes from './routes/pelaporRoutes.js'
import teamBranchRoutes from './routes/teamBranchRoutes.js'
import anggotaRoutes from './routes/anggotaRoutes.js'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/kecamatan', kecamatanRoutes)


app.use('/api/laporan', laporanRoutes)
// app.use('/api/admin', adminRoutes)
app.use('/api/pelapor', pelaporRoutes)
app.use('/api/team-branch', teamBranchRoutes)
app.use('/api/anggota', anggotaRoutes)
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server Express berjalan di port ${PORT}`)
})