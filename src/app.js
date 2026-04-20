const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const cors = require('@koa/cors')
const authRouter = require('./routes/auth')

const app = new Koa()

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(json())
app.use(bodyParser())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = { error: err.message }
  }
})

// Health check
app.use(async (ctx, next) => {
  if (ctx.path === '/health') {
    ctx.body = { status: 'ok' }
  } else {
    await next()
  }
})

// Rutas
app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

module.exports = app
