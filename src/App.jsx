import "./App.css";
import { useState, useEffect } from "react";
import RoomsList from "./components/Rooms/RoomsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomDetails from "./components/Rooms/RoomDetails";
import RoomComments from "./components/Rooms/RoomComments";

function App() {
  // const baseUrl = "http://localhost:3001";
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('')

  // state = {
  //   title: '',
  //   body: '',
  //   featured_image: null
  // }

  // handleChange = (event) => {
  //   this.setState({ [event.target.name]: event.target.value });
  // }


  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then((r) => r.json())
      .then((data) => setRooms(data));
  }, []);

  function handleSearch(newSearch) {
    setSearch(newSearch)
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">Rooms to Buy</header>
      </div>
      <Router>
        {/* <Navigation/> */}
        <Routes>
          <Route path="/" element={<RoomsList rooms={rooms} search={search} handleSearch={handleSearch} />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/rooms/:id/comments" element={<RoomComments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
