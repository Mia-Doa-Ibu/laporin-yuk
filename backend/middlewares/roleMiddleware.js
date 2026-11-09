export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Token autentikasi tidak ditemukan atau tidak valid' })
    }

    const userRole = req.user.user_metadata?.role || req.user.app_metadata?.role

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Akses ditolak. Role Anda tidak memiliki izin.' })
    }

    next()
  }
}