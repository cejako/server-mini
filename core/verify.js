'use strict';

const crypto = require('crypto');

/**
 * 获取微信小程序access_token
 */
function verifySignature(params) {
  // params
  const {
    signature,
    token = 'rocktheworld',
    timestamp,
    nonce,
    echostr
  } = params || {};
  // 校验signature
  // 1、将token、timestamp、nonce三个参数进行字典序排序
  let arr = [token, timestamp, nonce],
    str = arr.sort().join('');
  const hash = crypto.createHash('sha1');
  if (str) {
    hash.update(str);
    const sha1Str = hash.digest('hex');
    console.log('sha1Str === signature', sha1Str === signature);
    if (sha1Str === signature) {
      return true;
    }
  }

  return false;
}

module.exports = {
  verifySignature
};