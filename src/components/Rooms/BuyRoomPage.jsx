import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl, headers } from '../../Globals'
const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState({});

  useEffect(() => {
    fetch(baseUrl + `/rooms/${id}`)
      .then((r) => r.json())
      .then((data) => setRoom(data));
  }, [id]);

  console.log("room", room);

  return (
    <div>
      {/* <img src={ place.image } alt="place picture" height="300" width="350"  /> */}
      {/* <h1>{room.image}</h1> */}
      <img
          className="image"
          src={room.image}
          alt="No Pic"
          height="200"
          width="200"
        />
      <h3>
        {" "}
        Items Included:{" "}
        {room?.items?.map((item) => {
          return <p>{item}</p>;
        })}
      </h3>
      <button>Purchase Room!</button>
      <button>EMAIL Seller</button>
    </div>
  );
};

export default RoomDetails;