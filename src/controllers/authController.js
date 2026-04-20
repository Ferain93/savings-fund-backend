const { registerUser, loginUser, refreshToken } = require('../services/authService')

/**
 * SCRUM-2: POST /auth/register
 * Solo accesible por admin (authMiddleware + authorize('admin') en la ruta).
 * Body: { email, password, role: 'admin' | 'socio' }
 * Response 201: { id, email, role, created_at }
 */
const register = async (ctx) => {
  const { email, password, role } = ctx.request.body

  // Validar presencia de campos
  if (!email || !password || !role) {
    ctx.throw(400, 'email, password y role son requeridos')
  }

  // Validar formato email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    ctx.throw(400, 'Formato de email inválido')
  }

  // Validar longitud mínima de contraseña (SCRUM-2)
  if (password.length < 8) {
    ctx.throw(400, 'La contraseña debe tener al menos 8 caracteres')
  }

  // Validar que role sea válido
  if (!['admin', 'socio'].includes(role)) {
    ctx.throw(400, 'El rol debe ser admin o socio')
  }

  const user = await registerUser(email, password, role)
  ctx.status = 201
  ctx.body = user
}

/**
 * SCRUM-3: POST /auth/login
 * Ruta pública.
 * Body: { email, password }
 * Response 200: { accessToken, user: { id, email, role } }
 */
const login = async (ctx) => {
  const { email, password } = ctx.request.body

  if (!email || !password) {
    ctx.throw(400, 'email y password son requeridos')
  }

  const result = await loginUser(email, password)
  ctx.status = 200
  ctx.body = result
}

/**
 * SCRUM-6: POST /auth/refresh-token
 * Protegida por authMiddleware. Emite un nuevo token con el mismo payload.
 * Header: Authorization: Bearer <token>
 * Response 200: { accessToken }
 */
const refresh = async (ctx) => {
  const result = await refreshToken(ctx.state.user)
  ctx.status = 200
  ctx.body = result
}

module.exports = { register, login, refresh }
