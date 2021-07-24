import { useState, useEffect } from "react";

function Chatroom(props) {
  // variables are assigned to store details once the room details are fetched
  const [info, setinfo] = useState({
    id: "",
    name: "",
    user: [],
    when: [],
    body: [],
  });
  //Room Id is assigned to a variable
  let roomInfo = props.match.params.id;

  useEffect(() => {
    // when the state is empty or doesn't match, a new one will be visited
    if (info.id === "" || info.id !== roomInfo) {
      //fetch the restaurant id from the api points
      fetch(`/rooms/data`)
        .then((res) => res.json())
        //then you store it
        .then((info) => {
          setinfo(info);
        });
    }
  });

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
