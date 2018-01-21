'use strict';

const request = require('superagent');
const superagent = require('superagent-charset')(request);
const access = require('./access');

/**
 * 发送客服消息
 * 发送客服消息接口不需要加密
 */
async function sendMessage(msg) {
  const accessToken = await access.getAccessToken(),
    url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${accessToken.access_token}`;
  // 发送请求
  console.log('start send custom msg:', msg);
  const result = await superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(msg);

  if (result.body.errcode) {
    console.log(result.body);
  }

  return result.body;
}

module.exports = {
  sendMessage
};