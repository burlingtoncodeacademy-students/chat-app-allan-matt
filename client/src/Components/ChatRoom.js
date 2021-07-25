import { useState, useEffect } from "react";

function Chatroom({ room }) {
  // variables are assigned to store details once the room details are fetched
  const [info, setInfo] = useState([]);
  //Room Id is assigned to a variable

  useEffect(() => {
    const poster = () => {
      fetch(`/rooms/${room}`)
        .then((res) => {
          return res.json();
        })
        //then you store it
        .then((res) => {
          setinfo(info);
        });
    };
    poster();
  });
//use messages in state to create a new array and print array to the screen (.map)
  
  return (
    <div id="infocontainer">
      <h1 id="directory">{info.name}</h1>
      <div>{info.message}</div>

      {/*Posts to be added*/}
      <div id="comments">
        <h3>Send that Funky Message You Particular Individual:</h3>
        <div id="review">
          {/*the post form*/}
          <form id="post-review" method="POST" action={`/rooms/${roomInfo}`}>
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
