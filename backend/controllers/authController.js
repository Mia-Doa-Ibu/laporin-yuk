import { supabase, supabaseAdmin } from '../config/supabase.js'

const ALLOWED_ROLES = ['pelapor', 'team_branch', 'admin']

export const register = async (req, res) => {
  const { role, email, password, confirm_password, ...profileData } = req.body

  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ error: 'Role pendaftaran tidak valid atau belum disertakan di JSON.' })
  }

  if (!password || !confirm_password) {
    return res.status(400).json({ error: 'Password dan konfirmasi password wajib diisi.' })
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Konfirmasi password tidak cocok dengan password.' })
  }
  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, 
    user_metadata: { role }
  })

  if (authError) {
    return res.status(400).json({ error: 'Gagal membuat akun Auth: ' + authError.message })
  }

  const userId = authData.user.id

  const { error: userError } = await supabaseAdmin.from('users').insert([{
    id: userId,
    email,
    role
  }])

  if (userError) {
    return res.status(500).json({ error: 'Gagal menyimpan ke tabel users: ' + userError.message })
  }

  if (role === 'pelapor') {
    await supabaseAdmin.from('pelapor').insert([{
      user_id: userId,
      nama_lengkap: profileData.nama_lengkap
    }])
  } else if (role === 'team_branch') {
    await supabaseAdmin.from('team_branch').insert([{
      user_id: userId,
      nama_tim: profileData.nama_tim,
      id_kecamatan: profileData.id_kecamatan,
      nomor_ketua:profileData.nomor_ketua,
      is_verified: false
    }])
  }

  return res.status(201).json({
    message: `Registrasi ${role} berhasil.`,
    user: authData.user
  })
}

export const login = async (req, res) => {
  
  const { email, password } = req.body

  // if (!ALLOWED_ROLES.includes(role)) {
  //   return res.status(400).json({ error: 'Role login tidak valid atau belum disertakan di JSON.' })
  // }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return res.status(401).json({ error: 'Email atau password salah.' })

  // const userRole = data.user.user_metadata?.role
  // if (userRole !== role) {
  //   return res.status(403).json({ error: `Akses ditolak. Akun ini bukan ber-role ${role}.` })
  // }

  // if (role === 'team_branch') {
  //   const { data: teamData } = await supabaseAdmin
  //     .from('team_branch')
  //     .select('is_verified')
  //     .eq('user_id', data.user.id)
  //     .single()

  //   if (teamData && !teamData.is_verified) {
  //     return res.status(403).json({ error: 'Akun Team Branch Anda belum diverifikasi oleh Admin.' })
  //   }
  // }

  return res.json({
    message: `Login  berhasil.`,
    access_token: data.session.access_token,
    user: data.user
  })
}