const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')
const logger = require('koa-logger')

const index = require('./routes/index')
const wx = require('./routes/wx')

// error handler
onerror(app)

// middlewares
app.use(xmlParser())
// app.use(function(ctx, next) {
//   // the parsed body will store in this.request.body
//   // if nothing was parsed, body will be undefined
//   ctx.body = ctx.request.body
//   return next()
// })

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(wx.routes(), wx.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
