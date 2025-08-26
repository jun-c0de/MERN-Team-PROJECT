import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import BucketForm from "./components/BucketForm";
import BucketList from "./components/BucketList";
import { api, ensureGuestAuth } from "./api/bucket";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = "/api/buckets";

  // ====== READ (목록 조회) ======
  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        await ensureGuestAuth(); // 게스트 인증 체크
        const res = await api.get(API);
        const data = Array.isArray(res.data) ? res.data : res.data.buckets ?? [];
        setItems(data);
        console.log("불러온 버킷:", data);
      } catch (error) {
        console.error("가져오기 실패", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuckets();
  }, []);

  // ====== CREATE (추가) ======
  const onCreate = async ({ text, category }) => {
    if (!text?.trim()) return;
    try {
      const res = await api.post(API, { text: text.trim(), category });
      const created = res.data?.bucket ?? res.data;
      if (Array.isArray(res.data?.buckets)) {
        setItems(res.data.buckets);
      } else {
        setItems((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error("추가 실패", err);
    }
  };

  // ====== UPDATE (체크 토글) ======
  const onToggle = async (id, nextChecked) => {
    try {
      const { data } = await api.patch(`${API}/${id}/check`, { isCompleted: nextChecked });
      if (Array.isArray(data?.buckets)) {
        setItems(data.buckets);
      } else {
        const updated = data?.bucket ?? data;
        setItems((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      }
    } catch (err) {
      console.error("체크 실패", err);
    }
  };

  // ====== UPDATE (텍스트 수정) ======
  const onEditText = async (id, nextText) => {
    const value = nextText?.trim();
    if (!value) return;
    try {
      const { data } = await api.patch(`${API}/${id}/text`, { text: value });
      if (Array.isArray(data?.buckets)) {
        setItems(data.buckets);
      } else {
        const updated = data?.bucket ?? data;
        setItems((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      }
    } catch (err) {
      console.error("수정 실패", err);
    }
  };

  // ====== UPDATE (카테고리 수정) ======
  const onEditCategory = async (id, nextCategory) => {
    try {
      const { data } = await api.patch(`${API}/${id}/category`, { category: nextCategory });
      if (Array.isArray(data?.buckets)) {
        setItems(data.buckets);
      } else {
        const updated = data?.bucket ?? data;
        setItems((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      }
    } catch (err) {
      console.error("카테고리 수정 실패", err);
    }
  };

  // ====== DELETE (삭제) ======
  const onRemove = async (id) => {
    try {
      const { data } = await api.delete(`${API}/${id}`);
      if (Array.isArray(data?.buckets)) {
        setItems(data.buckets);
      } else {
        const deletedId = data?.deletedId ?? data?.bucket?._id ?? data?._id ?? id;
        setItems((prev) => prev.filter((b) => b._id !== deletedId));
      }
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  return (
    <div className="App">
      <div className="app-card">
        <Header />

        {loading && <p>로딩 중...</p>}

        <BucketForm onCreate={onCreate} />

        <BucketList
          items={Array.isArray(items) ? items : []}
          onToggle={onToggle}
          onEditText={onEditText}
          onEditCategory={onEditCategory}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
}

export default App;
