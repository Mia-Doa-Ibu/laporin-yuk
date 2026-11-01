import { supabaseAdmin } from '../config/supabase.js'

export const getAllPelapor = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('pelapor')
      .select('id, user_id, nama_lengkap, created_at', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false })

    if (search) {
      query = query.ilike('nama_lengkap', `%${search}%`)
    }

    const { data, error, count } = await query

    if (error) return res.status(400).json({ error: error.message })

    const totalPages = Math.ceil(count / limit)

    return res.status(200).json({
      message: 'Berhasil mengambil data pelapor',
      data,
      pagination: {
        total_data: count,
        total_pages: totalPages,
        current_page: page,
        per_page: limit,
        has_next_page: page < totalPages,
        has_prev_page: page > 1
      }
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const getPelaporById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabaseAdmin
      .from('pelapor')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Data pelapor tidak ditemukan.' })
    }

    return res.status(200).json({ message: 'Detail pelapor', data })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const updatePelapor = async (req, res) => {
  try {
    const { id } = req.params
    const { nama_lengkap } = req.body
    const userId = req.user.id
    const userRole = req.user.user_metadata?.role

    if (userRole === 'pelapor') {
      const { data: checkData } = await supabaseAdmin
        .from('pelapor')
        .select('user_id')
        .eq('id', id)
        .single()

      if (!checkData || checkData.user_id !== userId) {
        return res.status(403).json({ error: 'Anda tidak berhak mengubah profil orang lain.' })
      }
    }

    const { data, error } = await supabaseAdmin
      .from('pelapor')
      .update({ nama_lengkap, updated_at: new Date() })
      .eq('id', id)
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(200).json({
      message: 'Profil pelapor berhasil diperbarui.',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const deletePelapor = async (req, res) => {
  try {
    const { id } = req.params

    // Ambil user_id untuk dihapus juga dari auth jika diperlukan
    const { data: pelapor } = await supabaseAdmin
      .from('pelapor')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!pelapor) {
      return res.status(404).json({ error: 'Pelapor tidak ditemukan.' })
    }

    // Hapus dari tabel pelapor (tabel users & auth bisa di-cascade atau dihapus manual)
    const { error } = await supabaseAdmin
      .from('pelapor')
      .delete()
      .eq('id', id)

    if (error) return res.status(400).json({ error: error.message })

    // Hapus juga dari Supabase Auth
    await supabaseAdmin.auth.admin.deleteUser(pelapor.user_id)

    return res.status(200).json({ message: 'Pelapor berhasil dihapus.' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}