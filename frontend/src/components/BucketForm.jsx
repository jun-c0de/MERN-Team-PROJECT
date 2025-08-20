import "./css/BucketForm.css"

function BucketForm() {
  return (
    <div className="BucketForm">
      <h2 className="bf-title">버킷리스트 추가</h2>
      <form className="bf-form">
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
