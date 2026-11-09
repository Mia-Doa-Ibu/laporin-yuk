import { supabase, supabaseAdmin } from '../config/supabase.js'

export const createLaporan = async (req, res) => {
  try {
    const userId = req.user.id 
    const { id_team_branch, id_kategori, title, deskripsi, foto_url } = req.body

    if (!id_team_branch || !title || !deskripsi) {
      return res.status(400).json({ error: 'id_team_branch, title, dan deskripsi wajib diisi.' })
    }

    
    const { data: pelaporData, error: pelaporErr } = await supabaseAdmin
      .from('pelapor')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (pelaporErr || !pelaporData) {
      return res.status(403).json({ error: 'Profil pelapor tidak ditemukan.' })
    }

    const { data, error } = await supabaseAdmin
      .from('laporan')
      .insert([{
        id_pelapor: pelaporData.id, 
        id_team_branch,
        id_kategori: id_kategori || null,
        title,
        deskripsi,
        foto_url: foto_url || null,
        status: 'pending'
      }])
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(201).json({
      message: 'Laporan berhasil dikirim.',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

// 2. GET ALL LAPORAN
export const getAllLaporan = async (req, res) => {
  try {
    const userRole = req.user.user_metadata?.role
    const userId = req.user.id

    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''
    const statusFilter = req.query.status || ''        
    const kategoriFilter = req.query.id_kategori || ''  
    const teamBranchFilter = req.query.id_team_branch || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabaseAdmin
      .from('laporan')
      .select(`
        id,
        title,
        deskripsi,
        foto_url,
        status,
        created_at,
        team_branch (
          id,
          nama_tim,
          kecamatan (id, nama_kecamatan, kabupaten, provinsi)
        ),
        kategori (id, nama_kategori),
        pelapor (id, nama_lengkap)
      `, { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false })

    if (userRole === 'pelapor') {
      const { data: pelaporData } = await supabaseAdmin
        .from('pelapor')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (pelaporData) {
        query = query.eq('id_pelapor', pelaporData.id)
      } else {
        query = query.eq('id_pelapor', '00000000-0000-0000-0000-000000000000')
      }

    } else if (userRole === 'team_branch') {
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

    if (statusFilter) {
      query = query.eq('status', statusFilter)
    }

    if (kategoriFilter) {
      query = query.eq('id_kategori', kategoriFilter)
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,deskripsi.ilike.%${search}%`)
    }

    const { data, error, count } = await query

    if (error) return res.status(400).json({ error: error.message })

    const totalPages = Math.ceil(count / limit)

    return res.status(200).json({
      message: 'Berhasil mengambil data laporan',
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


export const getLaporanById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabaseAdmin
      .from('laporan')
      .select(`
        *,
        team_branch (
          id,
          nama_tim,
          kecamatan (id, nama_kecamatan, kabupaten, provinsi)
        ),
        kategori (id, nama_kategori),
        pelapor (id, nama_lengkap)
      `)
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Laporan tidak ditemukan.' })
    }

    return res.status(200).json({ message: 'Detail laporan', data })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

// 4. UPDATE STATUS LAPORAN
export const updateStatusLaporan = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body 
    const userRole = req.user.user_metadata?.role
    const userId = req.user.id

    const validStatuses = ['pending', 'valid', 'invalid']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        error: 'Status laporan tidak valid. Pilih antara: pending, valid, atau invalid.' 
      })
    }

    if (userRole === 'team_branch') {
      const { data: teamData } = await supabaseAdmin
        .from('team_branch')
        .select('id')
        .eq('user_id', userId)
        .single()

      const { data: laporanData } = await supabaseAdmin
        .from('laporan')
        .select('id_team_branch')
        .eq('id', id)
        .single()

      if (!laporanData || laporanData.id_team_branch !== teamData?.id) {
        return res.status(403).json({ error: 'Anda tidak memiliki akses mengubah laporan di luar team branch Anda.' })
      }
    }

    const { data, error } = await supabaseAdmin
      .from('laporan')
      .update({ status })
      .eq('id', id)
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(200).json({
      message: 'Status laporan berhasil diperbarui.',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const deleteLaporan = async (req, res) => {
  try {
    const { id } = req.params
    const userRole = req.user.user_metadata?.role
    const userId = req.user.id

    const { data: laporan, error: fetchError } = await supabaseAdmin
      .from('laporan')
      .select('id_pelapor, status')
      .eq('id', id)
      .single()

    if (fetchError || !laporan) {
      return res.status(404).json({ error: 'Laporan tidak ditemukan.' })
    }

    if (userRole === 'pelapor') {
      const { data: pelaporData } = await supabaseAdmin
        .from('pelapor')
        .select('id')
        .eq('user_id', userId)
        .single()

      if (!pelaporData || laporan.id_pelapor !== pelaporData.id) {
        return res.status(403).json({ error: 'Anda tidak berhak menghapus laporan milik orang lain.' })
      }
      if (laporan.status !== 'pending') {
        return res.status(400).json({ error: 'Laporan yang sudah diproses tidak dapat dihapus.' })
      }
    }
    
    const { error: deleteError } = await supabaseAdmin
      .from('laporan')
      .delete()
      .eq('id', id)

    if (deleteError) return res.status(400).json({ error: deleteError.message })

    return res.status(200).json({ message: 'Laporan berhasil dihapus.' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}