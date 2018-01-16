const router = require('koa-router')();
const request = require('superagent');
const superagent = require('superagent-charset')(request);
const urlencode = require('urlencode');
const parser = require('../core/parser');

router.get('/', async(ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

// 处理查询姓名请求
router.get('/cgi', async(ctx, next) => {
  const {
      word = ''
    } = ctx.query,
    desUrl = `http://www.1518.com/s?st=2&FrontType=1&word=${urlencode(decodeURIComponent(word), 'gb2312')}`;
  const res = await superagent
    .get(desUrl)
    .charset('gb2312');

  ctx.body = parser(res.text);
});

module.exports = router
