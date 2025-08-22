import "./css/BucketForm.css";

function BucketForm() {
  return (
    <div className="BucketForm">
      <h2 className="bf-title">버킷리스트 추가</h2>
      <form className="bf-form">
        <select name="category" id="category" className="bf-select">
          <option value="1">여행</option>
          <option value="2">독서</option>
          <option value="3">운동</option>
          <option value="4">기타</option>
        </select>
        <input
          type="text"
          className="bf-input"
          placeholder="하고 싶은 일을 입력하세요 ✍️"
        />
        <button type="submit" className="btn btn-primary">
          추가
        </button>
      </form>
    </div>
  );
}

export default BucketForm;
