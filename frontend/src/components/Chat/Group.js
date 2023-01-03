import React,{useEffect} from "react";

function Group({ details, select, selected, index }) {
  const { image, name,  createdAt, _id } = details;
  const SELECT =
    selected._id === _id  ? "selected" : "";

  useEffect(() => {
    if(index === 0 && !selected){
      select(details)
    }
  })
  

  return (
    <div
      className={`guest-contact ${SELECT}`}
      onClick={() => {
        select(details);
      }}
    >
      <div className="guest-profil">
        <img 
        src={image}
        height="48px"
        alt={name}  />
      </div>
      <div className="guest-data">
        <div className="guest-name">
          <label>
            <strong>{name}</strong>
          </label>
        </div>
        <div className="bottom-data">
          <div className="chat-label">
            <label>messages please</label>
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
