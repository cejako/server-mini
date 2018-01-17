'use strict';

const cache = require('memory-cache');

/**
 * 获取cache
 * @param key
 */
function getCache(key) {
  try {
    const value = cache.get(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }

  return null;
}

/**
 * 设置cache
 * @param key
 * @param data
 */
function setCache(key, data) {
  if (!key || !data) return;

  if (typeof data === 'object') {
    data = JSON.stringify(data);
  }

  cache.put(key, data);
}

module.exports = {
  getCache,
  setCache
};