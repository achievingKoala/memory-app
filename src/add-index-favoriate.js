// add-index-favorite.js
const fs = require('fs');
const path = './all-reframe.js';

const src = fs.readFileSync(path, 'utf-8');

// 提取 data 数组字符串
const match = src.match(/export const data = (\[[\s\S]*\])/m);
// const match = src.match(/export const data = (\[[\s\S]*\]);/);
if (!match) {
  throw new Error('未找到 data 导出!');
}
const arrStr = match[1];
// 用 new Function 安全地 eval
const data = (new Function('return ' + arrStr))();

data.forEach((item, i) => {
  item.index = i + 1;   // 总序号从1开始
  item.favorite = true; // 默认未收藏
});

// 重组新内容
const newJs = `export const data = ${JSON.stringify(data, null, 4)}\n`;

fs.writeFileSync(path, newJs, 'utf-8');
console.log('加序号和收藏完成');