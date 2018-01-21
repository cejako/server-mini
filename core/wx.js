'use strict';

const _ = require('lodash/core');
const request = require('superagent');
const superagent = require('superagent-charset')(request);
const config = require('./config');

/**
 * 发送客服消息
 * 发送客服消息接口不需要加密
 */
async function login(code) {
  if (!code) return null;
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appid}&secret=${config.secret}&js_code=${code}&grant_type=authorization_code`;
  // 发送请求
  console.log('login code:', code);
  const result = await superagent
    .get(url);

  if (_.isEmpty(result.body) && result.text) {
    try {
      const body = JSON.parse(result.text);
      if (result.body.errcode) {
        console.log(result.body);
      }
      return body;
    } catch (e) {
      console.log('parse result.text error', e)
    }
  }

  return null;
}

module.exports = {
  login
};