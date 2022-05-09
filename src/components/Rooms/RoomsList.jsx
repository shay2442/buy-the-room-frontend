import React from "react";
import RoomCard from "./RoomCard";

const RoomsList = ({ rooms }) => {
  const roomCards = rooms.map((room) => <
    RoomCard key={room.id} room={room} />);

  return <div className="card-container">{roomCards}</div>;
};

export default RoomsList;
