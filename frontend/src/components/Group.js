import React from "react";

function Group(props) {
  const { image, name, message, time,createdAt } = props.details;

  return (
    <div className="guest-contact">
      <div className="guest-profil">
        <img src={image} width="48px" height="48px" alt={name} />
      </div>
      <div className="guest-data">
        <div className="guest-name">
          <label>
            <strong>{name}</strong>
          </label>
        </div>
        <div className="bottom-data">
          <div className="chat-label">
            <label>{Math.random()*100}</label>
          </div>
          <div className="msg-date">
            <label>{new Date(createdAt).toLocaleString()}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Group;
