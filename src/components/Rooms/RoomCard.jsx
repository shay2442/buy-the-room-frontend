import React from "react";
import styled from 'styled-components'

const RoomCard = ({ room }) => {
  const { id, image, category, city, state, description, price } = room;
  return (
      <RoomsWrapper>
    <div className="card">
      <img className="image" src={room.image} alt="No Pic" />
      <div>
        <strong>Category: {room.category}</strong>
      </div>
      <div>City: {room.city}</div>
      <div>State: {room.state}</div>
      <div>Description: {room.description}</div>
      <div>Price : ${room.price}</div>
    </div>
    </RoomsWrapper>
  );
};
const RoomsWrapper = styled.div `
 width: 200px;
    margin: 10px;
    padding: 25px;
    box-shadow:  0 0 20px rgba(0, 0, 0, 1.0), 0 0 40px rgba(0, 0, 0, 0.12);
    border-radius: 5px;`

export default RoomCard;
