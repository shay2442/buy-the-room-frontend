import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseUrl, headers, getToken } from "../../Globals";
import styled from "styled-components";

function Form({ onAddRoom, updateItem, rooms }) {
  const URL = "http://localhost:3001/rooms";
  const params = useParams();
  const navigate = useNavigate();
  const initialState = {
    image: "",
    category: "",
    city: "",
    state: "",
    description: "",
    items: "",
    price: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialState);
  const [numberOfImageFields, setNumberOfImageFields] = useState(1);

  useEffect(() => {
    if (params.id && rooms.length > 0) {
      //find the room
      const roomWeWantToEdit = rooms.find(
        (room) => room.id === parseInt(params.id)
      );
      //   console.log(roomWeWantToEdit);
      setFormData(roomWeWantToEdit);
    } else {
      setFormData(initialState);
    }
  }, [params, rooms]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function createRoom() {
    fetch(baseUrl + "/rooms", {
      method: "POST",
      headers: {
        ...headers,
        ...getToken(),
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newItem) => {
        console.log(newItem);
        onAddRoom(newItem);
        setFormData(initialState);
      });
    navigate("/rooms");
  }

  function updateRoom(id) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    };
    fetch(baseUrl + `/rooms/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((updatedItem) => {
        console.log(updatedItem);
        updateItem(updatedItem);
        setFormData(initialState);
        navigate("/rooms");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.id) {
      createRoom();
    } else {
      updateRoom(formData.id);
    }
  }

  const ImageField = ({ itemIndex }) => {
    // console.log("itemIndex", itemIndex);
    return (
      <input
        type="text"
        name="images"
        value={formData.images[itemIndex]}
        onChange={(e) => handleImageChange(e, itemIndex)}
      />
    );
  };

  const handleImageChange = (e, itemIndex) => {
    const newImages = [...formData.images];
    newImages[itemIndex] = e.target.value;
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImageField = (e) => {
    e.preventDefault();
    setNumberOfImageFields(numberOfImageFields + 1);
  };

  //   console.log("images", formData.images);

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Image:
        <input
          className="input"
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Type of Room:
        <select
          className="input"
          name="category"
          placeholder="Please select one"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="all">Please select one</option>
          <option value="Living Room">Living Room</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Office">Office</option>
          <option value="Nursery">Nursery</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Dining Room">Dining Room</option>
          <option value="Game Room">Game Room</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <label>
        City:
        <input
          className="input"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        ></input>
      </label>

      <label>
        State:
        <input
          className="input"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Short Description:
        <input
          className="input"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Items Included:
        <input
          className="input"
          type="text"
          name="items"
          placeholder="list items seperated by a comma"
          value={formData.items}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Price:
        <input
          className="input"
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Images:
        <br />
        {Array.from({ length: numberOfImageFields }).map((x, index) => (
          <>
            <ImageField itemIndex={index} />
            <br />
          </>
        ))}
        <button onClick={handleAddImageField}>Add Another Image</button>
      </label>

      <input type="submit" value={formData.id ? "Update" : "Create"} />

      {/* <button className='submit-bttn' type="submit">Add Room</button> */}
    </form>
  );
}

export default Form;

const NewForm = styled.div`
  width: 100%;
`;
