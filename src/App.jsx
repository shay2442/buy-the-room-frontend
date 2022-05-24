import "./App.css";
import { useState, useEffect } from "react";
import RoomsList from "./components/Rooms/RoomsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomDetails from "./components/Rooms/RoomDetails";
import BuyRoomPage from "./components/Rooms/BuyRoomPage";
import RoomComments from "./components/Rooms/RoomComments";
import RoomForm from "./components/Rooms/RoomForm";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import LogoutButton from "./components/Authentication/LogoutButton";
import { Link, useNavigate } from "react-router-dom";

function App() {
  // const baseUrl = "http://localhost:3001";
  const navigate = useNavigate;
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then((r) => r.json())
      .then((data) => setRooms(data));

  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/me")
      .then((r) => r.json())
      .then((data) => setUser(data));

  }, []);

  function handleSearch(newSearch) {
    setSearch(newSearch);
  }

  function addRoom(newRoom) {
    setRooms([newRoom, ...rooms]);
  }

  function navigateToForm() {
    navigate("/rooms/new");
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">
          Rooms to Buy<button onClick={navigateToForm}>Become a Seller</button>
          {user && <p style={{ color: 'red' }}>Welcome, {user.username}!</p>}
        </header>
      </div>
      <Router>
        {/* <Navigation/> */}
        <Routes>
          <Route
            path="/rooms"
            element={
              <RoomsList
                rooms={rooms}
                search={search}
                handleSearch={handleSearch}
                user={user}
              />
            }
          />
          <Route path="/rooms/new" element={<RoomForm onAddRoom={addRoom} />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/rooms/:id/buy" element={<BuyRoomPage />} />
          <Route
            path="/signup"
            element={<Signup user={user} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} setLoggedIn={setLoggedIn} />}
          />
          {/* <Route path="/login" element={user ? <Navigate to="/rooms" replace /> :  <Login />}/> */}
          <Route path="/rooms/:id/comments" element={<RoomComments />} />
        </Routes>
      </Router>
      {user ? <LogoutButton setUser={setUser} /> : null}
    </div>
  );
}

export default App;
