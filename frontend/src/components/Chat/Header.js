import React, { useState } from "react";
import logo from "./../../logo.svg";
import Search from "./Search";
import useOutsideClick from "./../../hooks/useClickOutside.js";
import { useNavigate } from "react-router-dom";

function Header() {
  const [isShowSearch, setIsShowSearch] = useState(false);
  const navigate = useNavigate();

  const myRef = useOutsideClick(() => {
    setIsShowSearch(false);
  });

  return (
    <div className="global-header">
      <div className="logo-img" onClick={()=>{
        navigate('/')
      }}>
        <img src={logo} alt="React Chat" />
        <div className="logo-text">
          <label>
            <strong>React Chat</strong>
          </label>
        </div>
      </div>
      <div className="searcher" title="Search something here.">
        <input
          type="text"
          ref={myRef}
          onClick={() => setIsShowSearch(true)}
          placeholder="Search accounts and videos"
        />
        <div
          className="menu-dropdown"
          style={{ display: isShowSearch ? "inline-block" : "none" }}
        >
          <div
            className="menu"
            id="meu-275675874"
          >
            <Search />
          </div>
        </div>

        <div className="clear-icon" title="Clear the given value.">
          <svg viewBox="0 0 512 512" width="18px" height="18px" fill="silver">
            <g>
              <path
                d="M256,33C132.3,33,32,133.3,32,257c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224C480,133.3,
              379.7,33,256,33z M364.3,332.5c1.5,1.5,2.3,3.5,2.3,5.6c0,2.1-0.8,4.2-2.3,5.6l-21.6,21.7c-1.6,1.6-3.6,2.3-5.6,
              2.3c-2,0-4.1-0.8-5.6-2.3L256,289.8 l-75.4,75.7c-1.5,1.6-3.6,2.3-5.6,2.3c-2,
              0-4.1-0.8-5.6-2.3l-21.6-21.7c-1.5-1.5-2.3-3.5-2.3-5.6c0-2.1,0.8-4.2,2.3-5.6l75.7-76 l-75.9-75c-3.1-3.1-3.1-8.2,
              0-11.3l21.6-21.7c1.5-1.5,3.5-2.3,5.6-2.3c2.1,0,4.1,0.8,5.6,2.3l75.7,74.7l75.7-74.7 c1.5-1.5,3.5-2.3,5.6-2.3c2.1,
              0,4.1,0.8,5.6,2.3l21.6,21.7c3.1,3.1,3.1,8.2,0,11.3l-75.9,75L364.3,332.5z"
              />
            </g>
          </svg>
        </div>
        <div className="searcher-icon">
          <svg viewBox="0 0 32 32" width="22px" height="22px" fill="silver">
            <g>
              <path
                d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,
              28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"
              />
            </g>
          </svg>
        </div>
      </div>
      <section className="right-data">
        <div className="upload-btn" title="Send something.">
          <div className="add-icon">
            <svg viewBox="0 0 32 32" width="24px" height="24px" fill="#343434">
              <g>
                <line className="plus" x1={16} x2={16} y1={7} y2={25} />
                <line className="plus" x1={7} x2={25} y1={16} y2={16} />
              </g>
            </svg>
          </div>
          <div className="upload-text">
            <label>
              <strong>Upload</strong>
            </label>
          </div>
        </div>
        <div className="mail-icon">
          <svg viewBox="0 0 24 24" width="32px" height="32px" fill="#343434">
            <g>
              <path
                d="M21.5,11.1l-17.9-9C2.7,1.7,1.7,2.5,2.1,3.4l2.5,6.7L16,12L4.6,13.9l-2.5,6.7c-0.3,0.9,0.6,
              1.7,1.5,1.2l17.9-9 C22.2,12.5,22.2,11.5,21.5,11.1z"
              />
            </g>
          </svg>
        </div>
        <div className="minus-icon">
          <svg viewBox="0 0 15 15" fill="none" height="26px" width="26px">
            <path
              d="M5.5 11.4928L5.91594 11.2154C5.8232 11.0763 5.66712 10.9928 5.5 10.9928V11.4928ZM7.5 14.4909L7.08406 
              14.7683C7.1768 14.9074 7.33288 14.9909 7.5 14.9909C7.66712 14.9909 7.8232 14.9074 7.91594 14.7683L7.5 
              14.4909ZM9.5 11.4928V10.9928C9.33288 10.9928 9.1768 11.0763 9.08406 11.2154L9.5 11.4928ZM5.08406 11.7703L7.08406 
              14.7683L7.91594 14.2134L5.91594 11.2154L5.08406 11.7703ZM7.91594 14.7683L9.91594 11.7703L9.08406 11.2154L7.08406 
              14.2134L7.91594 14.7683ZM9.5 11.9928H13.5V10.9928H9.5V11.9928ZM13.5 11.9928C14.3288 11.9928 15 11.3226 15 
              10.4935H14C14 10.7697 13.7772 10.9928 13.5 10.9928V11.9928ZM15 10.4935V1.49935H14V10.4935H15ZM15 1.49935C15 
              0.670259 14.3288 0 13.5 0V1C13.7772 1 14 1.22316 14 1.49935H15ZM13.5 0H1.5V1H13.5V0ZM1.5 0C0.671165 0 0 0.670259 
              0 1.49935H1C1 1.22316 1.22283 1 1.5 1V0ZM0 1.49935V10.4935H1V1.49935H0ZM0 10.4935C0 11.3226 0.671165 11.9928 1.5 
              11.9928V10.9928C1.22284 10.9928 1 10.7697 1 10.4935H0ZM1.5 11.9928H5.5V10.9928H1.5V11.9928ZM5 7H10V6H5V7Z"
              fill="#343434"
            />
          </svg>
        </div>
        <div className="user-profil" title="My profil.">
          <img
            src="data:image/jpeg;base64,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"
            width="44px"
            height="44px"
            alt="Profile"
          />
        </div>
      </section>
    </div>
  );
}

export default Header;
