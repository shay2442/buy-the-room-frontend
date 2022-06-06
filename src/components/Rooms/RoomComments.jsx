import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl, headers, getToken } from '../../Globals'

const RoomComments = ({user}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState({});
  const initialState = {
    content: "",
    room_id: id,
  };

  const [commentFormData, setCommentFormData] = useState(initialState);

  function handleCommentChange(e) {
    setCommentFormData({ ...commentFormData, [e.target.name]: e.target.value });
  }

  function handleCommentSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: {
        ...headers,
        ...getToken() 

      
      },
      body: JSON.stringify(commentFormData),
    })
      .then((r) => r.json())
      .then((newComment) => {
        console.log(newComment)
        setCommentFormData(initialState);
        setRoom({ ...room, comments: [...room.comments, newComment] });
      });
  }

  useEffect(() => {
    fetch(`http://localhost:3001/rooms/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          // console.log("comments", data);
          setRoom(data);
        });
      } else {
        setRoom("This room currently has no comments");
      }
    });
  }, [id]);
 

  // console.log(room.comments);
  return (
    <div>
      {/* <img src={ place.image } alt="place picture" height="300" width="350"  /> */}
      <h3>
        {" "}
        Comments:{" "}
        {room?.comments?.map((comment) => {
          return (
            <div className="comment">
              <p>
                {comment.content} From: {comment.user.username}
              </p>
            </div>
          );
        })}
      </h3>
      <form onSubmit={handleCommentSubmit} className="form">
        <label>
          Comment:
          <input
            type="text"
            name="content"
            value={commentFormData.content}
            onChange={handleCommentChange}
          ></input>
        </label>
        <button className="submit-bttn" type="submit">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default RoomComments;
