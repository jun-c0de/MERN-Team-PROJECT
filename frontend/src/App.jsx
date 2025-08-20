// src/App.jsx
import "./App.css";
import BucketForm from "./components/BucketForm";
import BucketList from "./components/BucketList";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <div className="app-card">
        <Header />

        <BucketForm />
        <BucketList />
      </div>
    </div>
  );
}

export default App;
