function BucketForm() {
  return (
    <div className="BucketForm">
      <h2>버킷리스트 추가</h2>
      <form>
        <input type="text" placeholder="하고 싶은 일을 입력하세요" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}

export default BucketForm;
