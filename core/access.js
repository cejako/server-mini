'use strict';

const config = require('./config');
const request = require('superagent');
const superagent = require('superagent-charset')(request);
const cache = require('./cache');

/**
 * 获取微信小程序access_token
 */
async function getAccessTokenmmediately() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`;
  const res = await superagent
    .get(url);

  return res.body;
}

/**
 * 获取微信小程序access_token
 */
async function getAccessToken() {
  const cacheKey = 'access_token',
    accessToken = cache.getCache(cacheKey);
  // 非空且未过期
  if (accessToken && accessToken.expire && accessToken.expire > new Date().getTime()) {
    return accessToken;
  } else {
    const newToken = await getAccessTokenmmediately();
    if (newToken && newToken.access_token && newToken.expires_in) {
      newToken.expire = new Date().getTime() + newToken.expires_in * 1000;
      // setCache
      cache.setCache(cacheKey, newToken);
      return newToken;
    }
  }

  return null;
}

module.exports = {
  getAccessToken
};