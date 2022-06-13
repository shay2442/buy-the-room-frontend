import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { baseUrl, headers } from '../../Globals'

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch(baseUrl + `/rooms/${id}`)
      .then((r) => r.json())
      .then((data) => setRoom(data));
  }, [id, setRoom]);

  if (!room) {
    return;
  }

  console.log("items", room.items);

  return (
    <div className="details-container">
      {room.images.length > 0 && (
        <div className="image-details-container">
          <button
            className="back-arrow-button"
            disabled={currentImageIndex === 0}
            onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
          >
            ⬅️
          </button>
          <img
            src={room.images[currentImageIndex].url}
            style={{ height: "300px", width: "400px" }}
          />
          <button
            className="forward-arrow-button"
            disabled={currentImageIndex === room.images.length - 1}
            onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
          >
            ➡️
          </button>
        </div>
      )}

      <h3>
        {" "}
        Items Included:{" "}
        {room?.items?.length > 0 &&
          room.items.split(",").map((item) => {
            return <p>{item}</p>;
          })}
      </h3>
    </div>
  );
};

export default RoomDetails;
