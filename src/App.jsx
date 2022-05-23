import "./App.css";
import { useState, useEffect } from "react";
import RoomsList from "./components/Rooms/RoomsList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoomDetails from "./components/Rooms/RoomDetails";
import RoomComments from "./components/Rooms/RoomComments";
import RoomForm from "./components/Rooms/RoomForm";
import Signup from "./components/Authentication/Signup"
import Login from "./components/Authentication/Login"
import { useNavigate } from 'react-router-dom'

function App() {
  // const baseUrl = "http://localhost:3001";
  const navigate = useNavigate
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(false)
  const [comments, setComments] = useState([])



  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then((r) => r.json())
      .then((data) => setRooms(data));


      fetch("http://localhost:3001/rooms")
      .then(r => {
        if (r.ok) {
          r.json().then( user => {
            console.log("logged in:", user)
            setUser(user)
          })
        } else {
          console.log("no one logged in")

        }
      })
  }, []);

  function handleSearch(newSearch) {
    setSearch(newSearch)
  }

  function addRoom(newRoom) {
    setRooms([newRoom,...rooms])
  }

  function addComment(newComment) {
    setComments([newComment,...comments])
  }

  function navigateToForm() {
    navigate('/rooms/new')
  }

  return (
    <div>
      <div className="App">
        <header className="App-header">Rooms to Buy<button  onClick={navigateToForm} >Become a Seller</button></header>
      </div>
      <Router>
        {/* <Navigation/> */}
        <Routes>
          <Route path="/rooms" element={<RoomsList rooms={rooms} search={search} handleSearch={handleSearch} user={user} />} />
          <Route path="/rooms/new" element={<RoomForm onAddRoom={addRoom} />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/signup" element={<Signup user={user} />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/rooms/:id/comments" element={<RoomComments onAddComment={addComment}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
