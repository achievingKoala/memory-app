const fs = require('fs');
const path = require('path');

// 读取收藏ID列表
const favoriteIds = JSON.parse(fs.readFileSync('./src/likedData/favorite-ids.json', 'utf8'));

// 读取CSV文件
const csvContent = fs.readFileSync('./src/likedData/all_reframe_3_rows.csv', 'utf8');
const lines = csvContent.split('\n');

// 处理标题行
const header = lines[0].trim();
const newHeader = header.includes('favorite') ? header : header + ',favorite';

// 处理数据行
const newLines = [newHeader];
for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const columns = line.split(',');
    const id = columns[0];
    const isFavorite = favoriteIds.includes(id) ? '1' : '0';
    
    // 如果已有favorite列，替换；否则添加
    if (header.includes('favorite')) {
        columns[columns.length - 1] = isFavorite;
        newLines.push(columns.join(','));
    } else {
        newLines.push(line + ',' + isFavorite);
    }
}

// 写回文件
fs.writeFileSync('./src/likedData/all_reframe_3_rows.csv', newLines.join('\n'));
console.log('同步完成！');