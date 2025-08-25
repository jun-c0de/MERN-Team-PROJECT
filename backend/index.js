const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONT_ORIGIN,
        credentials: true,
    })
);

// 라우트 불러오기
const authRoutes = require("./routes/authRoutes");
const bucketRoutes = require("./routes/bucketRoutes");

// 게스트 로그인(익명 인증) 라우트
app.use("/api/auth", authRoutes);

// 버킷리스트 API (인증 없이 사용 가능)
app.use("/api/buckets", bucketRoutes);

// 테스트용 기본 라우트
app.get("/", (req, res) => {
    res.send("Hello Express");
});

// MongoDB 연결
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB 연결 성공"))
    .catch((err) => console.log("MongoDB 연결 실패", err));

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
