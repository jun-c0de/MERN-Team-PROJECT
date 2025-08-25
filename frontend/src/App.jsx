import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import "./api/bucket"
import BucketForm from "./components/BucketForm";
import BucketList from "./components/BucketList";
import Header from "./components/Header";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL ?? "http://localhost:3000").replace(
    /\/+$/,
    ""
  ),
});

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        await ensureGuestAuth(); // 게스트 인증 체크
        const res = await api.get("/api/buckets");
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.buckets ?? [];
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

  const onCreate = async ({ text, category }) => {
    try {
      const res = await api.post("/api/buckets", { text, category });
      setItems((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("추가 실패", err);
    }
  };

  const onToggle = async (id, nextChecked) => {
    try {
      const res = await api.patch(`/api/buckets/${id}/check`, {
        isCompleted: nextChecked,
      });
      const updated = res.data.bucket ?? res.data;
      setItems((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
    } catch (err) {
      console.error("체크 실패", err);
    }
  };

  const onEditText = async (id, nextText) => {
    try {
      const res = await api.patch(`/api/buckets/${id}/text`, {
        text: nextText,
      });
      const updated = res.data.bucket ?? res.data;
      setItems((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
    } catch (err) {
      console.error("수정 실패", err);
    }
  };

  const onEditCategory = async (id, nextCategory) => {
    try {
      const res = await api.patch(`/api/buckets/${id}/category`, {
        category: nextCategory,
      });
      const updated = res.data.bucket ?? res.data;
      setItems((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
    } catch (err) {
      console.error("카테고리 수정 실패", err);
    }
  };

  const onRemove = async (id) => {
    try {
      const res = await api.delete(`/api/buckets/${id}`);
      if (Array.isArray(res.data?.buckets)) {
        setItems(res.data.buckets);
      } else {
        setItems((prev) => prev.filter((b) => b._id !== id));
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
          items={items}
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
