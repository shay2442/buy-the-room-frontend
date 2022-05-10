import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/rooms/${id}`)
      .then((r) => r.json())
      .then((data) => setRoom(data));
  }, [id]);

  console.log("room", room);

  return (
    <div>
      {/* <img src={ place.image } alt="place picture" height="300" width="350"  /> */}
      <h1>{room.id}</h1>
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
