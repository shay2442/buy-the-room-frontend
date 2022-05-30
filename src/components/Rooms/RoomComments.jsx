import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RoomComments = () => {
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

    fetch("/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentFormData),
    })
      .then((r) => r.json())
      .then((newComment) => {
        setCommentFormData(initialState);
        setRoom({ ...room, comments: [...room.comments, newComment] });
      });
  }

  useEffect(() => {
    //     fetch(`/rooms/${id}`)
    //       .then((r) => r.json())
    //       .then((data) => setRoom(data));
    //   }, [id]);

    fetch(`/rooms/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          console.log("comments", data);
          setRoom(data);
        });
      } else {
        setRoom("This room currently has no comments");
      }
    });
  }, [id]);

  //   console.log("room", room);
  console.log(room.comments);
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
