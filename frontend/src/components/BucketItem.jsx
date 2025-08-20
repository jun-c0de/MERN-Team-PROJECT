import "./css/BucketItem.css"

function BucketItem() {
  return (
    <li className="BucketItem">
      <div className="bi-left">
        <input type="checkbox" className="bi-check" />
        <span className="bi-title">예시 버킷 아이템 ✈️</span>
      </div>

      <div className="bi-actions">
        <button className="btn btn-ghost">수정</button>
        <button className="btn btn-danger">삭제</button>
      </div>
    </li>
  );
}

export default BucketItem;

