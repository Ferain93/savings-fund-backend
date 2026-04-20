/**
 * SCRUM-5: Middleware de autorización por rol.
 * Uso: router.post('/ruta', authMiddleware, authorize('admin'), controller)
 *
 * @param {string} role - Rol requerido: 'admin' | 'socio'
 */
const authorize = (role) => async (ctx, next) => {
  if (ctx.state.user?.role !== role) {
    ctx.throw(403, 'Acceso denegado')
  }
  await next()
}

module.exports = authorize
