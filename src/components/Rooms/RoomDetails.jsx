import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:3001/rooms/${id}`)
      .then((r) => r.json())
      .then((data) => setRoom(data));
  }, [id, setRoom]);

  if (!room) {
    return;
  }

  return (
    <div>
      {/* <img src={ place.image } alt="place picture" height="300" width="350"  /> */}
      <button
        disabled={currentImageIndex === 0}
        onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
      >
        Previous Image
      </button>
      <img
        src={room.images[currentImageIndex].url}
        style={{ height: "300px", width: "400px" }}
      />
      <button
        disabled={currentImageIndex === room.images.length - 1}
        onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
      >
        Next Image
      </button>
      <h3>
        {" "}
        Items Included:{" "}
        {room?.items?.map((item) => {
          return <p>{item}</p>;
        })}
      </h3>
    </div>
  );
};

export default RoomDetails;
