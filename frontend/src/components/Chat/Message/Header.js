import React from 'react'

function Header({image,name}) {
  return (
    <div className="chat-messages-header">
        <div className="active-user-contact">
          <div className="active-user-profil">
            <img
              src={image}
              alt={name}
            />
          </div>
          <div className="active-user-data">
            <div className="active-username">
              <label>
                <strong>{name}</strong>
              </label>
            </div>
            <div className="active-user-label">
              <label>@{name}</label>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Header