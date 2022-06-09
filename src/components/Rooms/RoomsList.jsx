import React from "react";
import RoomCard from "./RoomCard";
import Search from "../static/Search";

const RoomsList = ({ rooms, handleSearch, search, user, addToCart, handleDelete}) => {

  const roomsToDisplay = rooms.filter((room) => {
    return room.city.toLowerCase().includes(search.toLowerCase())
  })


  const roomCards = roomsToDisplay.map((room) => <
    RoomCard key={room.id} room={room} addToCart={addToCart} handleDelete={handleDelete} />);

    return (
      <div className="orders-page">
     
        <Search onSearch={handleSearch} search={search} />
        <div className="card-container">
          {/* <PlaceForm addItem={addItem}/> */}
          {roomCards}
        </div>

       
      </div>
    );
  };
export default RoomsList;
