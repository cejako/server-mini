'use strict';

const cheerio = require('cheerio');

/**
 * 解析请求结果
 * @param html
 */
function parser(html) {
  if (html) {
    const $ = cheerio.load(html);
    let nametop = $('.nametop');
    // 结果
    let score = $(nametop).children('.name_num').text(),  // 总得分
      result = {},          // 天，人，地，外，总格
      resultDetail = {},    // 天，人，地，外，总格的详细情况
      resultLis = $(nametop).children('ul').children('li');
    if (resultLis && resultLis.length > 0) {
      resultLis.each((index, li) => {
        result[index] = $(li).children('span').text();
      })
    }

    // 结果详细
    let nameContents = $('.sub_name_contents'),
      detail = parseText($(nameContents).text());
    // 天，人，地，外，总格详细
    let tabs = $('#name_tabs'),
      tabsNameContents = $(tabs).children('.name_content');
    if (tabsNameContents && tabsNameContents.length > 0) {
      tabsNameContents.each((index, content) => {
        resultDetail[index] = parseText($(content).text())
      })
    }

    return {
      score,
      result,
      detail,
      resultDetail,
    };
  }
}

/**
 * 读取数组中的元素，判空处理
 * @param arr
 * @param index
 * @returns {*}
 */
function getItem(arr, index) {
  if (arr && arr.length > 0 && index > -1 && index < arr.length) {
    return arr[index];
  }

  return '';
}

/**
 * 解析大段文本
 * @param text
 */
function parseText(text) {
  return text.replace(/[\n|\s]+/g, '\n').replace(/^\n|\n$/g, '');
}

module.exports = parser;