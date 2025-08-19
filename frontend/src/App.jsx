// src/App.jsx
import "./App.css";
import BucketForm from "./components/BucketForm";
import BucketList from "./components/BucketList";

function App() {
  return (
    <div className="App">
      <h1>익명 버킷리스트</h1>
      <BucketForm />
      <BucketList />
    </div>
  );
}

export default App;
