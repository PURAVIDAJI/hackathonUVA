const mysql = require('mysql2');

// 创建数据库连接
const pool = mysql.createPool({
  host: 'localhost', // 你的数据库主机
  user: 'root',      // 数据库用户名
  password: 'cui020909', // 数据库密码
  database: 'myAppDatabase'  // 你的数据库名
});

module.exports = pool.promise();
