const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

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

app.post("/createaccount", (req, res) => {
  const { user_name, email, password } = req.body;

  // 비밀번호 해싱
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Hashing error:", err);
      return res.status(500).json({ error: "Error hashing password" });
    }

    // 해싱된 비밀번호를 사용해 사용자 정보 삽입 쿼리 작성
    const query = `INSERT INTO user (user_name, email, password) VALUES (?, ?, ?)`;

    db.query(
      query,
      [user_name, email, hashedPassword], // 해싱된 비밀번호 사용
      (err, result) => {
        if (err) {
          console.error("MySQL query error:", err);
          // 오류 메시지를 JSON 형식으로 클라이언트에 반환
          return res
            .status(500)
            .json({ error: "Error saving user", details: err.message });
        }
        // 성공 메시지를 JSON 형식으로 반환
        return res.status(201).json({ message: "User created successfully!" });
      }
    );
  });
});

app.post("/login", (req, res) => {
  const { user_name, password } = req.body;
  console.log("Login request received:", req.body);

  // 데이터베이스에서 사용자 찾기
  const query = "SELECT * FROM user WHERE user_name = ?";

  db.query(query, [user_name], (err, rows) => {
    if (err) {
      console.error("MySQL query error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    // 사용자가 없을 경우 처리
    if (rows.length === 0) {
      return res.status(401).json({ error: "User not found" });
    }

    const user = rows[0];

    // 비밀번호 비교
    bcrypt.compare(password, user.password, (err, isPasswordCorrect) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ error: "Error comparing passwords" });
      }

      // 비밀번호가 틀린 경우 처리
      if (!isPasswordCorrect) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // 로그인 성공 시 처리
      console.log("Login successful for user:", user_name);
      return res.status(200).json({ message: "Login successful" });
    });
  });
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
  const query = `
    SELECT product.item_id, product.title, product.price, product.description, product.image, 
           product.likes, product.chat, product.category, product.myFav, product.date, 
           user.user_name 
    FROM product 
    INNER JOIN user ON product.user_id = user.id;`;
  db.query(query, (err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch items", details: err.message });
    }
    return res.status(200).json(result); //result -json
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
