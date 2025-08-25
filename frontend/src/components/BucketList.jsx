import { useState, useMemo } from "react";
import BucketItem from "./BucketItem";
import "./css/BucketList.css";

function BucketList({ items, onToggle, onEditText, onEditCategory, onRemove }) {
  const [q, setQ] = useState("");

  // 검색어에 따라 필터링
  const filteredItems = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return items;
    return items.filter((item) => (item.text ?? "").toLowerCase().includes(kw));
  }, [items, q]);

  return (
    <div className="BucketList">
      <h2>나의 버킷리스트</h2>

      {/* 검색 입력창 */}
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="검색어를 입력하세요 ✍️"
        className="bf-search"
      />

      <ul>
        {filteredItems.length === 0 ? (
          <li>검색된 버킷리스트가 없어요!</li>
        ) : (
          filteredItems.map((item) => (
            <BucketItem
              key={item._id}
              item={item}
              onToggle={onToggle}
              onEditText={onEditText}
              onEditCategory={onEditCategory}
              onRemove={onRemove}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default BucketList;
