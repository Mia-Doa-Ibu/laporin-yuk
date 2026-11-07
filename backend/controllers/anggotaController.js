import { supabaseAdmin } from '../config/supabase.js'

const ALLOWED_MEMBER_ROLES = ['ketua', 'anggota']

export const createAnggota = async (req, res) => {
  try {
    const userId = req.user.id
    const userRole = req.user.user_metadata?.role
    const { nik, id_team_branch, gender, umur, nama, role } = req.body

    if (!nik || !gender || !umur || !nama) {
      return res.status(400).json({ error: 'nik, gender, umur, dan nama wajib diisi.' })
    }

    const memberRole = role || 'anggota'
    if (!ALLOWED_MEMBER_ROLES.includes(memberRole)) {
      return res.status(400).json({ error: 'Role anggota tidak valid. Pilih antara "ketua" atau "anggota".' })
    }

    let targetTeamId = id_team_branch

    if (userRole === 'team_branch') {
      const { data: teamData, error: teamErr } = await supabaseAdmin
        .from('team_branch')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (teamErr || !teamData) {
        return res.status(404).json({ error: 'Data team branch untuk akun ini tidak ditemukan.' })
      }
      targetTeamId = teamData.id
    }

    if (!targetTeamId) {
    return res.status(400).json({ error: 'id_team_branch wajib diisi.' })
    }

    const { data, error } = await supabaseAdmin
      .from('anggota')
      .insert([{
        nik,
        id_team_branch: targetTeamId,
        gender,
        umur,
        nama,
        role: memberRole
      }])
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(201).json({
      message: 'Anggota berhasil ditambahkan.',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const getAllAnggota = async (req, res) => {
  try {
    const userRole = req.user.user_metadata?.role
    const userId = req.user.id

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const teamBranchFilter = req.query.id_team_branch || ''
    const roleFilter = req.query.role || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('anggota')
      .select(`
        id,
        nik,
        nama,
        gender,
        umur,
        role,
        created_at,
        team_branch (
          id,
          nama_tim,
          kecamatan (id, nama_kecamatan, kabupaten, provinsi)
        )
      `, { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false })

    if (userRole === 'team_branch') {
      const { data: teamData } = await supabaseAdmin
        .from('team_branch')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (teamData) {
        query = query.eq('id_team_branch', teamData.id)
      } else {
        query = query.eq('id_team_branch', '00000000-0000-0000-0000-000000000000')
      }
    } else if (userRole === 'admin' && teamBranchFilter) {
      query = query.eq('id_team_branch', teamBranchFilter)
    }

    if (roleFilter && ALLOWED_MEMBER_ROLES.includes(roleFilter)) {
      query = query.eq('role', roleFilter)
    }

    if (search) {
      query = query.or(`nama.ilike.%${search}%,nik.ilike.%${search}%`)
    }

    const { data, error, count } = await query

    if (error) return res.status(400).json({ error: error.message })

    const totalPages = Math.ceil(count / limit)

    return res.status(200).json({
      message: 'Berhasil mengambil data anggota',
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

export const getAnggotaById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabaseAdmin
      .from('anggota')
      .select(`
        *,
        team_branch (
          id,
          nama_tim,
          kecamatan (id, nama_kecamatan, kabupaten, provinsi)
        )
      `)
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Data anggota tidak ditemukan.' })
    }

    return res.status(200).json({ message: 'Detail anggota', data })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const updateAnggota = async (req, res) => {
  try {
    const { id } = req.params
    const { nik, gender, umur, nama, role } = req.body
    const userRole = req.user.user_metadata?.role
    const userId = req.user.id

    if (role && !ALLOWED_MEMBER_ROLES.includes(role)) {
      return res.status(400).json({ error: 'Role anggota tidak valid. Pilih antara "ketua" atau "anggota".' })
    }

    if (userRole === 'team_branch') {
      const { data: teamData } = await supabaseAdmin
        .from('team_branch')
        .select('id')
        .eq('user_id', userId)
        .single()

      const { data: anggotaData } = await supabaseAdmin
        .from('anggota')
        .select('id_team_branch')
        .eq('id', id)
        .single()

      if (!anggotaData || anggotaData.id_team_branch !== teamData?.id) {
        return res.status(403).json({ error: 'Anda tidak memiliki akses mengubah anggota di luar tim Anda.' })
      }
    }

    const { data, error } = await supabaseAdmin
      .from('anggota')
      .update({
        nik: nik || undefined,
        gender: gender || undefined,
        umur: umur || undefined,
        nama: nama || undefined,
        role: role || undefined
      })
      .eq('id', id)
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(200).json({
      message: 'Data anggota berhasil diperbarui.',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const deleteAnggota = async (req, res) => {
  try {
    const { id } = req.params
    const userRole = req.user.user_metadata?.role
    const userId = req.user.id

    if (userRole === 'team_branch') {
      const { data: teamData } = await supabaseAdmin
        .from('team_branch')
        .select('id')
        .eq('user_id', userId)
        .single()

      const { data: anggotaData } = await supabaseAdmin
        .from('anggota')
        .select('id_team_branch')
        .eq('id', id)
        .single()

      if (!anggotaData || anggotaData.id_team_branch !== teamData?.id) {
        return res.status(403).json({ error: 'Anda tidak memiliki akses menghapus anggota di luar tim Anda.' })
      }
    }

    const { error } = await supabaseAdmin
      .from('anggota')
      .delete()
      .eq('id', id)

    if (error) return res.status(400).json({ error: error.message })

    return res.status(200).json({ message: 'Anggota berhasil dihapus.' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}