export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.user_metadata?.role || req.user.app_metadata?.role

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Akses ditolak. Role Anda tidak memiliki izin.' })
    }

    next()
  }
}