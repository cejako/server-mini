const router = require('koa-router')();
const request = require('superagent');
const superagent = require('superagent-charset')(request);
const urlencode = require('urlencode');
const access = require('../core/access');
const customService = require('../core/custom_service');
const verify = require('../core/verify');
const wx = require('../core/wx');

const failResponse = {
  status: 'fail'
};

// 处理微信小程序服务器GET消息
router.get('/wx_login', async(ctx, next) => {
  const {
    code
  } = ctx.query;

  const result = await wx.login(code);
  console.log('login result', result);
  if (result) {
    ctx.body = result;
  } else {
    ctx.body = failResponse;
  }
});

// 处理微信小程序服务器GET消息
router.get('/handle_wx_msg', async(ctx, next) => {
  // 校验signature
  if (verify.verifySignature(ctx.query)) {
    ctx.body = ctx.query.echostr;
  } else {
    ctx.body = failResponse;
  }
});

// 处理微信小程序服务器POST消息
router.post('/handle_wx_msg', async(ctx, next) => {
  // 先校验是否来自微信服务器的消息
  if (!verify.verifySignature(ctx.query || ctx.request.body)) {
    ctx.body = failResponse;
    return;
  }
  console.log('ctx.request.body', ctx.request.body);
  // POST
  const {
    ToUserName,
    FromUserName,
    CreateTime,
    MsgType,
    Event,
    SessionFrom
  } = ctx.request.body || {};

  // 处理进入客服会话事件
  if (MsgType === 'event' && Event === 'user_enter_tempsession') {
    // TODO: 未处理消息解密
    // 发送客服消息
    const msg = {
      touser: FromUserName || ctx.query.openid,
      msgtype: 'link',
      link: {
        "title": "免费拿会员",
        "description": "关注公众号，免费拿各大视频网站会员",
        "url": "https://mp.weixin.qq.com/s?__biz=MjM5MTU0NTAyMw==&mid=2649419915&idx=1&sn=7dc63f60d981dc18494e933cb7e9d07a&chksm=beadb35b89da3a4d29ff4b504f01100e07389c861c774e05f0035a9d511a81d2c9c77f17d0fe#rd",
        "thumb_url": "https://brup.shengri.cn/goods/2016/07/27110034_ea82e2c21d267cfe43b914c737ed21cf.jpg"
      },
      // text: {
      //   content: '文本内容....<a href="http://www.qq.com">点我试试</a>'
      // }
    };

    const sendResult = await customService.sendMessage(msg);
  }

  ctx.body = {};
});

module.exports = router;
