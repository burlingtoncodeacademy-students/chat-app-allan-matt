import { useState, useEffect } from "react";

function Chatroom(props) {
  // variables are assigned to store details once the room details are fetched
  const [info, setinfo] = useState({
    id: "",
    name: "",
    when: "",
    user: "",
    message: "",
  });
  //Room Id is assigned to a variable
  let roomInfo = props.match.params.id;

  useEffect(() => {
    // when the state is empty or doesn't match, a new one will be visited
    if (info.id === "" || info.id !== roomInfo) {
      //fetch the restaurant id from the api points
      fetch(`/rooms/${roomInfo}`)
        .then((res) => res.json())
        //then you store it
        .then((roomDetails) => {
          setinfo(roomDetails);
        });
    }
  });

  return (
    <div id="infocontainer">
      <h1 id="directory">{info.name}</h1>
      <div id="roominfo">
        {/*restaurant details are retrieved through fetch */}
        <h4 className="info">{info.when}</h4>
        <h4 className="info">{info.user}</h4>
        <h4 className="info">{info.message}</h4>
      </div>

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
