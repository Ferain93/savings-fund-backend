const Router = require('koa-router')
const authMiddleware = require('../middlewares/auth')
const authorize = require('../middlewares/authorize')
const { register, login, refresh } = require('../controllers/authController')

const router = new Router({ prefix: '/auth' })

// POST /auth/login — Ruta pública (SCRUM-3)
router.post('/login', login)

// POST /auth/register — Solo admin (SCRUM-2)
router.post('/register', authMiddleware, authorize('admin'), register)

// POST /auth/refresh-token — Usuario autenticado (SCRUM-6)
router.post('/refresh-token', authMiddleware, refresh)

module.exports = router
