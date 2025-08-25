import "./css/BucketItem.css";

function BucketItem({ item, onToggle, onEditText, onEditCategory, onRemove }) {
  return (
    <li className={`BucketItem ${item.isCompleted ? "completed" : ""}`}>
      <div className="bi-left">
        <input
          type="checkbox"
          className="bi-check"
          checked={item.isCompleted}
          onChange={(e) => onToggle(item._id, e.target.checked)}
        />
        <span className="bi-title">{item.text}</span>
        <em className="bi-category">[{item.category}]</em>
      </div>

      <div className="bi-actions">
        <button
          className="btn btn-ghost"
          onClick={() => {
            const nextText = prompt("새 텍스트를 입력하세요", item.text);
            if (nextText) onEditText(item._id, nextText);
          }}
        >
          수정
        </button>

        <button className="btn btn-ghost"
          onClick={() => {
            const nextCategory = prompt("새 카테고리를 입력하세요", item.category);
            if (nextCategory) onEditCategory(item._id, nextCategory);
          }}
        >
          카테고리
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onRemove(item._id)}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default BucketItem;
