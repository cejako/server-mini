const router = require('koa-router')();
const request = require('superagent');
const superagent = require('superagent-charset')(request);
const urlencode = require('urlencode');
const access = require('../core/access');
const customService = require('../core/custom_service');
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

// 获取access_token
router.get('/access', async(ctx, next) => {
    ctx.body = await access.getAccessToken();
});

// 处理微信小程序服务器消息
router.get('/handle', async(ctx, next) => {
  const {
    ToUserName,
    FromUserName,
    CreateTime,
    MsgType,
    Event,
    SessionFrom
  } = ctx.body;

  // 处理进入客服会话事件
  if (MsgType === 'event' && Event === 'user_enter_tempsession') {
    // 发送客服消息
    const msg = {
      touser: FromUserName,
      msgtype: 'text',
      text: {
        content: '文本内容....<a href="http://www.qq.com">点我试试</a>'
      }
    };

    customService.sendMessage(msg);
  }
});

module.exports = router;
