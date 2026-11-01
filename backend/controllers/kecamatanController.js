import { supabase, supabaseAdmin } from '../config/supabase.js'

export const getAllKecamatan = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ''

    const from = (page - 1) * limit
    const to = from + limit - 1

    let query = supabase
      .from('kecamatan')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('nama_kecamatan', { ascending: true })

    if (search) {
      query = query.ilike('nama_kecamatan', `%${search}%`)
    }

    const { data, error, count } = await query

    if (error) return res.status(400).json({ error: error.message })

    const totalPages = Math.ceil(count / limit)

    return res.status(200).json({
      message: 'Berhasil mengambil data kecamatan',
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

export const getKecamatanById = async (req, res) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('kecamatan')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return res.status(404).json({ error: 'Data kecamatan tidak ditemukan' })
    }

    return res.status(200).json({ message: 'Detail kecamatan', data })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}


export const createKecamatan = async (req, res) => {
  try {
    const { nama_kecamatan, kabupaten, provinsi } = req.body

    const { data, error } = await supabaseAdmin
      .from('kecamatan')
      .insert([{ nama_kecamatan, kabupaten, provinsi }])
      .select()

    if (error) return res.status(400).json({ error: error.message })

    return res.status(201).json({
      message: 'Kecamatan berhasil ditambahkan',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const updateKecamatan = async (req, res) => {
  try {
    const { id } = req.params
    const { nama_kecamatan, kabupaten, provinsi } = req.body

    const { data, error } = await supabaseAdmin
      .from('kecamatan')
      .update({ nama_kecamatan, kabupaten, provinsi, updated_at: new Date() })
      .eq('id', id)
      .select()

    if (error) return res.status(400).json({ error: error.message })
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Kecamatan tidak ditemukan untuk diupdate' })
    }

    return res.status(200).json({
      message: 'Kecamatan berhasil diperbarui',
      data: data[0]
    })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

export const deleteKecamatan = async (req, res) => {
  try {
    const { id } = req.params

    const { error } = await supabaseAdmin
      .from('kecamatan')
      .delete()
      .eq('id', id)

    if (error) return res.status(400).json({ error: error.message })

    return res.status(200).json({ message: 'Kecamatan berhasil dihapus' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}