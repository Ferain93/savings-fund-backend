const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../../database/connection')

/**
 * SCRUM-2: Registra un nuevo usuario.
 * Hashea la contraseña y guarda el usuario vinculado al role_id correspondiente.
 *
 * @param {string} email
 * @param {string} password - Contraseña en texto plano (nunca se guarda)
 * @param {string} role - 'admin' | 'socio'
 * @returns {{ id, email, role, created_at }}
 */
async function registerUser(email, password, role) {
  // Buscar el role_id a partir del nombre del rol
  const roleRow = await db('roles').where({ name: role }).first()
  if (!roleRow) {
    const err = new Error('Rol no válido')
    err.status = 400
    throw err
  }

  // Verificar si el email ya existe
  const existing = await db('users').where({ email }).first()
  if (existing) {
    const err = new Error('El email ya está registrado')
    err.status = 409
    throw err
  }

  // Hashear contraseña — mínimo 10 rounds (SCRUM-2)
  const password_hash = await bcrypt.hash(password, 10)

  const [id] = await db('users').insert({
    email,
    password_hash,
    role_id: roleRow.id,
  })

  const user = await db('users as u')
    .join('roles as r', 'u.role_id', 'r.id')
    .where('u.id', id)
    .select('u.id', 'u.email', 'r.name as role', 'u.created_at')
    .first()

  return user
}

/**
 * SCRUM-3: Autentica un usuario y devuelve un JWT.
 *
 * @param {string} email
 * @param {string} password
 * @returns {{ accessToken: string, user: { id, email, role } }}
 */
async function loginUser(email, password) {
  const user = await db('users as u')
    .join('roles as r', 'u.role_id', 'r.id')
    .where('u.email', email)
    .select('u.id', 'u.email', 'u.password_hash', 'u.is_active', 'r.name as role')
    .first()

  // Respuesta genérica para no revelar si el email existe
  if (!user || !user.is_active) {
    const err = new Error('Credenciales incorrectas')
    err.status = 401
    throw err
  }

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) {
    const err = new Error('Credenciales incorrectas')
    err.status = 401
    throw err
  }

  const payload = { id: user.id, email: user.email, role: user.role }
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  return { accessToken, user: payload }
}

/**
 * SCRUM-6: Verifica el token actual y emite uno nuevo con tiempo renovado.
 *
 * @param {string} token - Token actual (ya verificado por authMiddleware)
 * @param {object} userPayload - ctx.state.user inyectado por authMiddleware
 * @returns {{ accessToken: string }}
 */
async function refreshToken(userPayload) {
  const { id, email, role } = userPayload
  const accessToken = jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return { accessToken }
}

module.exports = { registerUser, loginUser, refreshToken }
