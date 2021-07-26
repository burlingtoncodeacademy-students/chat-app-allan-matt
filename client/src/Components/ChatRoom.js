//importing components
import { useState, useEffect } from "react";

//getting room we're in
let room = document.location.pathname.split("/").splice(-1)[0];

//the chat room Function
function Chatroom() {
  // variables are assigned to store details once the room details are fetched
  const [roomInfo, setRoomInfo] = useState("");
  //Room Id is assigned to a variable
  useEffect(() => {
    //function for getting info from database and posting it to chat room
    const poster = () => {
      //the fetching to the database based on the room we are in
      fetch(`/rooms/${room}`)
        .then((res) => {
          res.json()
        })
        //then you store it
        .then((res) => {
          setRoomInfo(res);
        });
    };
    //calling the message displaying function
    poster();
  });
  //use messages in state to create a new array and print array to the screen (.map)
  return (
    <div id="roomcontainer">
      <h1 id="directory">Room</h1>
      <div>
        {/* Ternary to check if there's data, if there is post the message. If not it returns loading on the page*/}
        {roomInfo ? (
          // mapping over data returned to display it
          roomInfo.map((message, index) => (
            <div id="message" key={index}>
              {/* formatting Date.now() to be pretty */}
              <p>{message.obj.when.slice(0, 16).replace("T", " - ")}</p>
              <div>
                {/* returning user and message to display */}
                <h6>{message.obj.user}:</h6>
                <p>{message.obj.message}</p>
              </div>
            </div>
          ))
        ) : (
          // displaying loading on the page
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

//export Chatroom function
export default Chatroom;
