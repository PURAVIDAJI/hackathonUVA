const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // 引入数据库连接
const cors = require('cors');
const bcrypt = require('bcrypt'); // 使用 bcrypt 进行密码哈希比较

const app = express();

app.use(cors()); // 启用 CORS
app.use(bodyParser.json()); // 解析 JSON 请求体

// 注册新用户的 API
app.post('/createaccount', async (req, res) => {
  const { user_name, email, password } = req.body;

  try {
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 将用户信息插入数据库
    const [rows] = await db.execute(
      'INSERT INTO user (user_name, email, password) VALUES (?, ?, ?)',
      [user_name, email, hashedPassword] // 使用 hashedPassword
    );
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 用户登录的 API
app.post('/login', async (req, res) => {
  const { user_name, password } = req.body;
  console.log("Login request received:", req.body); 

  try {
    // 从数据库中查找用户
    const [rows] = await db.execute(
      'SELECT * FROM user WHERE user_name = ?',
      [user_name]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = rows[0];

    // 比较数据库中的加密密码与输入的密码
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("Input Password:", password);
    console.log("Stored Hashed Password:", user.password);

    // 检查密码是否匹配
    if (!isPasswordCorrect) { // 如果密码不匹配
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
