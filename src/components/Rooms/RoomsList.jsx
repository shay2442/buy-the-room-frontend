import React from "react";
import RoomCard from "./RoomCard";
import Search from "../static/Search";
import { Link } from "react-router-dom";


const RoomsList = ({ rooms, handleSearch, search, user, addToCart, handleDelete, cart}) => {

  const roomsToDisplay = rooms.filter((room) => {
    return room.city.toLowerCase().includes(search.toLowerCase())
  })


  const roomCards = roomsToDisplay.map((room) => <
    RoomCard key={room.id} room={room} addToCart={addToCart} handleDelete={handleDelete} />);

    return (
      <div className="orders-page">
     
        <Search onSearch={handleSearch} search={search} />
        <div>
        <Link to="/cart">
          <h3 className="cart-link">🛒 Cart: {cart.length}</h3>
        </Link>
      </div>
        <div className="card-container">
          {/* <PlaceForm addItem={addItem}/> */}
          {roomCards}
        </div>

       
      </div>
    );
  };
export default RoomsList;
