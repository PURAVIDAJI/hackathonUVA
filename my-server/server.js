const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

// body-parser 설정
app.use(bodyParser.json());

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // MySQL 사용자
  password: "1111", // MySQL 비밀번호
  database: "secondHand", // MySQL 데이터베이스 이름
});

// 데이터베이스 연결
db.connect((err) => {
  if (err) {
    console.error("MySQL Connection error:", err);
    return;
  }
  console.log("You are connected with MySQL Database");
});

// item post API
app.post("/create-post", (req, res) => {
  const { title, price, description, image, category, user_id, date } =
    req.body;

  const query = `INSERT INTO product (title, price, description, image, category, user_id, date)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [title, price, description, image, category, user_id, date],
    (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        // 에러를 JSON 형식으로 클라이언트에게 반환
        return res
          .status(500)
          .json({ error: "Error saving post", details: err.message });
      }
      // 성공 메시지를 JSON 형식으로 반환
      return res.status(200).json({ message: "Post created successfully" });
    }
  );
});
//item get API
app.get("/items", (req, res) => {
  const query = "SELECT * FROM product";
  db.query(query, (err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      return res.status(500).json({ error: "Failed to fetch items" });
    }
    return res.status(200).json(result); //result -json
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
