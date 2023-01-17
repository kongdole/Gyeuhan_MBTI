import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import "./Chat.css";

const ChatMsg = ({ msg, user1}) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <ul 
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
      ref={scrollRef}
    >
      <div className={msg.from === user1 ? "me" : "friend"}>
        <li className="message">
          {msg.media ? 
          <img src={msg.media} alt={msg.text} /> 
          : null}
          {msg.text}
        </li>
        <li className="message-time">
          <small>
            <Moment format="LT">{msg.createdAt.toDate()}</Moment>
          </small>
        </li>
      </div>

    </ul>
  );
};

export default ChatMsg;