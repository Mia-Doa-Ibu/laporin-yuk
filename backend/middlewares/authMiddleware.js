import { supabase } from '../config/supabase.js'

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'Token autentikasi tidak ditemukan' })

  const token = authHeader.split(' ')[1]
  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) return res.status(401).json({ error: 'Token tidak valid atau sudah kadaluwarsa' })

  req.user = user
  next()
}