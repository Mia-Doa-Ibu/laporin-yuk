import { supabaseAdmin } from '../config/supabase.js'
const ALLOWED_MEMBER_ROLES = ['ketua', 'anggota']
export const getAllTeamBranch = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const kecamatanFilter = req.query.id_kecamatan || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('team_branch')
      .select(`
        id,
        user_id,
        nama_tim,
        nomor_ketua
        is_verified,
        created_at,
        kecamatan (id, nama_kecamatan, kabupaten, provinsi)
      `, { count: 'exact' })
      .range(from, to)
      .order('nama_tim', { ascending: true })

    if (search) {
      query = query.ilike('nama_tim', `%${search}%`)
    }

    if (kecamatanFilter) {
      query = query.eq('id_kecamatan', kecamatanFilter)
    }

    const { data, error, count } = await query

    if (error) return res.status(400).json({ error: error.message })

    const totalPages = Math.ceil(count / limit)

    return res.status(200).json({
      message: 'Berhasil mengambil data team branch',
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

export const getTeamBranchById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabaseAdmin
      .from('team_branch')
      .select(`
        *,
        kecamatan (id, nama_kecamatan, kabupaten, provinsi)
      `)
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Team branch tidak ditemukan.' })
    }

    return res.status(200).json({ message: 'Detail team branch', data })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const updateTeamBranch = async (req, res) => {
  try {
    const { id } = req.params
    const { nama_tim, id_kecamatan } = req.body
    const userId = req.user.id
    const userRole = req.user.user_metadata?.role

    if (userRole === 'team_branch') {
      const { data: checkData } = await supabaseAdmin
        .from('team_branch')
        .select('user_id')
        .eq('id', id)
        .single()

      if (!checkData || checkData.user_id !== userId) {
        return res.status(403).json({ error: 'Anda tidak berhak mengubah data team branch lain.' })
      }
    }

    const { data, error } = await supabaseAdmin
      .from('team_branch')
      .update({ 
        nama_tim: nama_tim || undefined, 
        id_kecamatan: id_kecamatan || undefined, 
        updated_at: new Date() 
      })
      .eq('id', id)
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(200).json({
      message: 'Team branch berhasil diperbarui.',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const verifyTeamBranch = async (req, res) => {
  try {
    const { id } = req.params
    const { is_verified } = req.body // boolean: true / false

    if (typeof is_verified !== 'boolean') {
      return res.status(400).json({ error: 'Status is_verified harus berupa boolean (true/false).' })
    }

    const { data, error } = await supabaseAdmin
      .from('team_branch')
      .update({ is_verified, updated_at: new Date() })
      .eq('id', id)
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(200).json({
      message: `Status verifikasi team branch berhasil diubah menjadi ${is_verified}.`,
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const deleteTeamBranch = async (req, res) => {
  try {
    const { id } = req.params

    const { data: team } = await supabaseAdmin
      .from('team_branch')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!team) {
      return res.status(404).json({ error: 'Team branch tidak ditemukan.' })
    }

    const { error } = await supabaseAdmin
      .from('team_branch')
      .delete()
      .eq('id', id)

    if (error) return res.status(400).json({ error: error.message })

    // Hapus akun dari Supabase Auth
    await supabaseAdmin.auth.admin.deleteUser(team.user_id)

    return res.status(200).json({ message: 'Team branch berhasil dihapus.' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
