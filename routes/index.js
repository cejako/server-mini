const router = require('koa-router')();
const request = require('superagent');
const superagent = require('superagent-charset')(request);
const urlencode = require('urlencode');
const parser = require('../core/parser');

const failResponse = {
  status: 'fail'
};

router.get('/', async(ctx, next) => {
  ctx.body = 'rock the world!';
});

// 处理查询姓名请求
router.get('/cgi', async(ctx, next) => {
  const {
      word = ''
    } = ctx.query,
    desUrl = ``;
  const res = await superagent
    .get(desUrl)
    .charset('gb2312');

  ctx.body = parser(res.text);
});

module.exports = router;
