import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const RoomComments = () => {
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
      <h3>
        {" "}
        Comments:{" "}
        {room?.comments?.map((comment) => {
          return <div className="comment"><p>{comment.content} From: {comment.user.username}</p>
          
          </div>
        
        })}
      </h3>
    </div>
  );
};

export default RoomComments;
