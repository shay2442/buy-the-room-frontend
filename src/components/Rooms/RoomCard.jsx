import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// import Cart from "../Cart"

const RoomCard = ({ room, addToCart, handleDelete, user }) => {
  const navigate = useNavigate();
  const {
    id,
    image,
    category,
    city,
    state,
    description,
    price,
    items,
    seller,
  } = room;
  const userIsSeller = user.id === seller.id;
  return (
    <div>
      <Card>
        <div className="card">
          <img
            className="image"
            src={room.image}
            alt="No Pic"
            height="200"
            width="280"
          />
          <div>
            <strong>Category: {room.category}</strong>
          </div>
          <div>
            <b>City:</b> {room.city}
          </div>
          <div>
            <b>State:</b> {room.state}
          </div>
          <div>
            <b>Description:</b> {room.description}
          </div>
          <div>
            <b>Price :$ </b>
            {room.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>

          <button onClick={() => navigate(`/rooms/${room.id}`)}>Details</button>
          <button onClick={() => navigate(`/rooms/${room.id}/comments`)}>
            Comments
          </button>

          <button
            onClick={() => {
              addToCart(room);
              navigate("/cart");
            }}
          >
            Add to 🛒
          </button>

          {userIsSeller && (
            <>
              <button onClick={() => handleDelete(id)}>🗑</button>
              <button onClick={() => navigate(`/rooms/${room.id}/edit`)}>
                Edit
              </button>
            </>
          )}
        </div>
      </Card>
      {/* <Cart room={room}/> */}
    </div>
  );
};

export default RoomCard;

const Card = styled.div`
  width: 280px;
  height: 450px;
  margin: 10px;
  padding: 25px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 1), 0 0 40px rgba(0, 0, 0, 0.12);
  border-radius: 5px;

  button {
    color: rgb(119, 134, 148);
    font-size: 25px;
    line-height: 15px;
    padding: 8px;
    border-radius: 10px;
    font-family: Georgia, serif;
    font-weight: normal;
    text-decoration: none;
    font-style: normal;
    font-variant: normal;
    text-transform: none;
    background-color: white;
    display: inline-block;
    margin-bottom: 0px;
  }
  button:hover {
    background: rgb(180, 204, 219);
  }
`;

// a.link:hover{
//   color: black;
// }

// const Button = styled.button`
//   color: rgb(119, 134, 148); font-size: 25px; line-height: 15px; padding: 8px; border-radius: 10px; font-family: Georgia, serif; font-weight: normal; text-decoration: none; font-style: normal; font-variant: normal; text-transform: none; background-color: white; display: inline-block; float: left;
//   bottom: 0px;

//   }
//   .details-button:hover {
//   background: #1C6EA4; }
//   .details-button:active {
//   background: #144E75; }`

// const Button2 = styled.button`
//   color: rgb(119, 134, 148); font-size: 25px; line-height: 15px; padding: 8px; border-radius: 10px; font-family: Georgia, serif; font-weight: normal; text-decoration: none; font-style: normal; font-variant: normal; text-transform: none; background-color: white; display: inline-block; float: right;
//   bottom: 0px;

//   }
//   .details-button:hover {
//   background: #1C6EA4; }
//   .details-button:active {
//   background: #144E75; }`

// const Container = styled.div`
//  justify-content: center;
//  align-items: center;
//  position: absolute;
//  min-height: 10rem;
//  text-align: center;
//  display: flex;
//   flex-direction: column;

// `

// const Container2 = styled.div`
//  min-height: 10rem;
//  text-align: center;
//  display: flex;
//   flex-direction: column;
//   float: right;
//   margin-top: 60px;
//   flex: 1,`
