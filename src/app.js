const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

const app = new Koa();

app.use(json());
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

// Health check
app.use(async (ctx, next) => {
  if (ctx.path === '/health') {
    ctx.body = { status: 'ok' };
  } else {
    await next();
  }
});

module.exports = app;