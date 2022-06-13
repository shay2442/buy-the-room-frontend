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
import { baseUrl, headers, getToken } from "./Globals";
import NavBar from "./components/Navigation/NavBar";
import Avatar from "react-avatar";
import Cart from "./components/Cart";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/Header";

const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

function App() {
  // const baseUrl = "http://localhost:3001";
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState(cartFromLocalStorage);

  useEffect(() => {
    fetch("http://localhost:3001/rooms")
      .then((r) => r.json())
      .then((data) => setRooms(data));
  }, []);

  function handleSearch(newSearch) {
    setSearch(newSearch);
  }

  const loginUser = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const logoutUser = () => {
    // console.log("logoutUser in App.jsx called")
    setUser({});
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    setCart([]);
  };

  function addRoom(newRoom) {
    setRooms([newRoom, ...rooms]);
  }

  // function navigateToForm() {
  //   navigate("/rooms/new");
  // }

  const addToCart = (room) => {
    setCart([...cart, room]);
    console.log(room);
    navigate("/cart");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && !loggedIn) {
      fetch(baseUrl + "/get-current-user", {
        method: "GET",
        headers: {
          ...headers,
          ...getToken(),
          // returns authorization plus localStorage.getItem('jwt') that should send it and we want a response back
        },
      })
        .then((r) => r.json())
        .then((user) => loginUser(user));
    }

    if (loggedIn) {
      fetch(baseUrl + "/rooms", {
        headers: {
          ...headers,
          ...getToken(),
        },
      })
        .then((r) => r.json())
        .then((data) => setRooms(data));
    }
  }, [loggedIn]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function updateItem(updatedItem) {
    const newRooms = rooms.map((room) => {
      if (updatedItem.id === room.id) {
        return updatedItem;
      } else {
        return room;
      }
    });

    setRooms(newRooms);
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/rooms/${id}`, {
      method: "DELETE",
      headers: {
        ...headers,
        ...getToken(),
      },
    }).then(() => {
      const updatedRooms = rooms.filter((room) => id !== room.id);
      setRooms(updatedRooms);
    });
  }

  const getCartTotal = () => {
    return cart.reduce((sum, { quantity }) => sum + quantity, 0);
  };

  return (
    <div>
     
        <header className="App-header">
          {loggedIn ? (
            <h1>
              Welcome, {user.username}!{" "}
              <Avatar
                googleId="118096717852922241760"
                size="50"
                round={true}
                color="silver"
              />
              <img className="logo-alt" src="/images/logo2.jpg" alt="Buy The Room" />
            </h1>
            
          ) : (
            <img className="logo" src="/images/logo.jpg" alt="Buy The Room" />
          )}
        </header>
   
    
      <NavBar loggedIn={loggedIn} logoutUser={logoutUser} currentUser={user} />
      <Routes>
        <Route
          path="/rooms"
          element={
            <RoomsList
              rooms={rooms}
              search={search}
              handleSearch={handleSearch}
              user={user}
              addToCart={addToCart}
              handleDelete={handleDelete}
              cart={cart}
            />
          }
        />
        <Route
          path="/rooms/new"
          element={
            <RoomForm
              onAddRoom={addRoom}
              updateItem={updateItem}
              rooms={rooms}
            />
          }
        />
        <Route
          exact
          path="/rooms/:id/edit"
          element={
            <RoomForm
              rooms={rooms}
              onAddRoom={addRoom}
              updateItem={updateItem}
            />
          }
        />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/rooms/:id/buy" element={<BuyRoomPage />} />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} getCartTotal={getCartTotal}/>
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              user={user}
              setUser={setUser}
              loginUser={loginUser}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              user={user}
              setUser={setUser}
              setLoggedIn={setLoggedIn}
              loginUser={loginUser}
              loggedIn={loggedIn}
            />
          }
        />
        {/* <Route path="/login" element={user ? <Navigate to="/rooms" replace /> :  <Login />}/> */}
        <Route
          path="/rooms/:id/comments"
          element={<RoomComments user={user} />}
        />
      </Routes>
    </div>
  );
}

export default App;

const theme = {
  font: {
    primary: "'Oswald', sans-serif",
    secondary: "Arial, sans-serif",
  },
  colors: {
    primary: "#f0efe6",
  },
};

//CSS styled component for header
const HeaderContainer = styled.div`
  text-align: center;
  background: ${(props) => props.theme.colors.primary};
  h1 {
    font-family: ${(props) => props.theme.font.primary};
  }

  h3 {
    font-family: ${(props) => props.theme.font.secondary};
    margin: inherit;
  }
  a {
    text-decoration: none;
  }
`;
