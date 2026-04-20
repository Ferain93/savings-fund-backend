const jwt = require('jsonwebtoken')

/**
 * SCRUM-4: Middleware de autenticación JWT.
 * Lee el token del header Authorization: Bearer <token>,
 * verifica la firma y popula ctx.state.user con el payload.
 */
const authMiddleware = async (ctx, next) => {
  const authHeader = ctx.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    ctx.throw(401, 'Token requerido')
  }

  try {
    ctx.state.user = jwt.verify(token, process.env.JWT_SECRET)
    await next()
  } catch {
    ctx.throw(401, 'Token inválido o expirado')
  }
}

module.exports = authMiddleware
