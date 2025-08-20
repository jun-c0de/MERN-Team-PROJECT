import BucketItem from "./BucketItem";
import "./css/BucketList.css"

function BucketList() {
  return (
    <div className="BucketList">
      <h2>나의 버킷리스트</h2>
      <ul>
        <BucketItem />
        <BucketItem />
      </ul>
    </div>
  );
}

export default BucketList;
