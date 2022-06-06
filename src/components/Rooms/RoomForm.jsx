import React from 'react'
import {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { baseUrl, headers, getToken } from '../../Globals'

function Form({onAddRoom}) {
    const params = useParams()
    const navigate = useNavigate();
    const initialState={
        image: '',
        category: '',
        city: '',
        state: '',
        description: '',
        price: ''
    }

    const [formData, setFormData] = useState(initialState)

    function handleChange(e) {
    setFormData( {...formData,
        [e.target.name]: e.target.value})
    }

    function handleSubmit(e)  {
        e.preventDefault()

        fetch('http://localhost:3001/rooms', {
            method: "POST",
            headers: {
                ...headers,
                ...getToken() 
              
              },
           body: JSON.stringify(formData),
          })
            .then(r => r.json())
            .then((newItem) => {
                console.log(newItem)
                onAddRoom(newItem)
                setFormData(initialState)})
                navigate('/rooms')
    }

    return(
        <form onSubmit={handleSubmit}className="form">
            <label>
                Image:
                <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}>
                </input>
            </label>
            <label>
                Type of Room:
                <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            >
                <option value='all'>Type of Room</option>
                <option value='Living Room'>Living Room</option>
                <option value='Bedroom'>Bedroom</option>
                <option value='Office'>Office</option>
                <option value='Nursery'>Nursery</option>
                <option value='Bathroom'>Bathroom</option>
                <option value='Kitchen'>Kitchen</option>
                <option value='Dining Room'>Dining Room</option>
                <option value='Game Room'>Game Room</option>
                <option value='Other'>Other</option>
                    </select></label>

            <label>
                City:
                <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                ></input>
            </label>

            <label>
                State:
                <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                ></input>
            </label>
            <label>
                Description:
                <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                ></input>
            </label>
            <label>
                Price:
                <input
                type="float"
                name="price"
                value={formData.price}
                onChange={handleChange}
                ></input>
            </label>

         

            <button className='submit-bttn' type="submit">Add Room</button>
        </form>
    )
}

export default Form;