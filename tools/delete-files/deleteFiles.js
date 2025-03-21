const fs = require('fs');
const path = require('path');

// 读取文件名列表
const fileNames = fs.readFileSync('tools/delete-files/files_to_delete.txt', 'utf8').split('\n').map(line => line.trim()).filter(line => line);

// 目录路径
const directoryPath = 'public/image';

// 递归删除文件
function deleteFilesInDirectory(dir, filesToDelete) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return console.error('无法扫描目录: ' + err);
    }

    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          return console.error('无法获取文件信息: ' + err);
        }

        if (stats.isDirectory()) {
          // 如果是目录，递归删除
          deleteFilesInDirectory(filePath, filesToDelete);
        } else {
          // 如果是文件，检查是否在要删除的文件列表中
          if (filesToDelete.includes(file)) {
            fs.unlink(filePath, err => {
              if (err) {
                return console.error('无法删除文件: ' + err);
              }
              console.log(`已删除文件: ${filePath}`);
            });
          }
        }
      });
    });
  });
}

// 开始删除文件
deleteFilesInDirectory(directoryPath, fileNames);