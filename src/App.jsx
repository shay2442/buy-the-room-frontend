import "./App.css";
import { useState, useEffect } from "react";
import RoomsList from "./components/Rooms/RoomsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomDetails from "./components/Rooms/RoomDetails";

function App() {
  const baseUrl = "http://localhost:3001";
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then((r) => r.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <div>
      <div className="App">
        <header className="App-header">Rooms to Buy</header>
      </div>
      <Router>
        {/* <Navigation/> */}
        <Routes>
          <Route path="/" element={<RoomsList rooms={rooms} />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
