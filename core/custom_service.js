'use strict';

const request = require('superagent');
const superagent = require('superagent-charset')(request);
const access = require('./access');

/**
 * 获取微信小程序access_token
 */
async function sendMessage(msg) {
  const accessToken = await access.getAccessToken(),
    url = `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${accessToken}`;
  return await superagent
    .post(url)
    .set('Content-Type', 'application/json')
    .send(msg);
}

module.exports = {
  sendMessage
};