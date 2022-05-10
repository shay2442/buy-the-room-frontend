import "./App.css";
import { useState, useEffect } from "react";
import RoomsList from "./components/Rooms/RoomsList";

function App() {
  const baseUrl = "http://localhost:3001";
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then((r) => r.json())
      .then((data) => setRooms(data));
  }, []);
  return (
    <div className="App">
      <header className="App-header">Rooms to Buy</header>
      
      <RoomsList rooms={rooms} />
    </div>
  );
}

export default App;
