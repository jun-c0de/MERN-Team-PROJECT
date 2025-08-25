import { useState } from "react";
import "./css/BucketForm.css";

function BucketForm({ onCreate }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("여행"); // 백엔드 허용 값으로 초기화

  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 리로드 방지

    if (!text.trim()) return; // 빈값 방지

    onCreate({ text, category }); // App.jsx에 전달
    setText(""); // 입력 초기화
    setCategory("여행"); // 선택 초기화
  };

  return (
    <div className="BucketForm">
      <h2 className="bf-title">버킷리스트 추가</h2>
      <form className="bf-form" onSubmit={handleSubmit}>
        <select
          name="category"
          id="category"
          className="bf-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="여행">여행</option>
          <option value="독서">독서</option>
          <option value="운동">운동</option>
          <option value="기타">기타</option>
        </select>

        <input
          type="text"
          className="bf-input"
          placeholder="하고 싶은 일을 입력하세요 ✍️"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit" className="btn btn-primary">
          추가
        </button>
      </form>
    </div>
  );
}

export default BucketForm;
