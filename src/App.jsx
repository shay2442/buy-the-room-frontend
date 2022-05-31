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
import { baseUrl, headers, getToken } from './Globals'
import NavBar from './components/Navigation/NavBar'
import Avatar from 'react-avatar';

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


  function handleSearch(newSearch) {
    setSearch(newSearch);
  }

  const loginUser = user => {
    setUser(user);
    setLoggedIn(true);
  }

  const logoutUser = () => {
    // console.log("logoutUser in App.jsx called")
    setUser({})
    setLoggedIn(false)
    localStorage.removeItem('jwt')
  }

  function addRoom(newRoom) {
    setRooms([newRoom, ...rooms]);
  }

  function navigateToForm() {
    navigate("/rooms/new");
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if(token && !loggedIn) {
      fetch(baseUrl + '/get-current-user', {
        method: "GET",
        headers: {
          ...headers,
          ...getToken() 
          // returns authorization plus localStorage.getItem('jwt') that should send it and we want a response back
        
        }
      })
      .then(r =>r.json())
      .then(user => loginUser(user))

    }

    if(loggedIn) {
      fetch(baseUrl + '/rooms', {
        headers: {
          ...headers,
          ...getToken()
        }
      })
      .then(r => r.json())
      .then(data => setRooms(data))

    }
  },[loggedIn])

  return (
    <div>
      <div className="App">
        <header className="App-header">
          { loggedIn ? <h1>Welcome, {user.username}! <Avatar googleId="118096717852922241760" size="50" round={true} /></h1> : <h1 className="App">Buy the Room</h1> }
        </header>
      </div>
      <Router>
      <NavBar loggedIn={loggedIn} logoutUser={logoutUser} currentUser={ user } />
        <Routes>
          <Route path="/rooms" element={
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
            element={<Signup user={user} setUser={setUser} loginUser={loginUser} loggedIn={loggedIn} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} setLoggedIn={setLoggedIn} loginUser={loginUser} loggedIn={loggedIn} />}
          />
          {/* <Route path="/login" element={user ? <Navigate to="/rooms" replace /> :  <Login />}/> */}
          <Route path="/rooms/:id/comments" element={<RoomComments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
