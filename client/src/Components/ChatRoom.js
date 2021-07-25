import { useState, useEffect } from "react";

let room = document.location.pathname.split("/").splice(-1)[0];

function Chatroom() {
  // variables are assigned to store details once the room details are fetched
  const [roomInfo, setRoomInfo] = useState([]);
  //Room Id is assigned to a variable

  useEffect(() => {
    const poster = () => {
      fetch(`/rooms/${room}`)
        .then((res) => {
          console.log(res.json());
        })
        //then you store it
        .then((res) => {
          setRoomInfo(roomInfo);
        });
    };
    poster();
  });
  //use messages in state to create a new array and print array to the screen (.map)

  return (
    <div id="roomcontainer">
      <h1 id="directory">Room</h1>
      <div>
        {roomInfo ? (
          roomInfo.map((message, index) => (
            <div id="message" key={index}>
              <p>{message.obj.when.slice(0, 16).replace("T", " - ")}</p>
              <div>
                <h6>{message.obj.user}:</h6>
                <p>{message.obj.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/*Posts to be added*/}
      <div id="comments">
        <h3>Send that Funky Message You Particular Individual:</h3>
        <div id="review">
          {/*the post form*/}
          <form id="post-review" method="POST" action={`/rooms/mains`}>
            <textarea id="textarea" name="user" placeholder="user"></textarea>
            <textarea
              id="textarea"
              name="message"
              placeholder="message"
            ></textarea>
            <input id="submit" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
export default Chatroom;
