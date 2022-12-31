import React, { useState } from "react";
import serachImg from "../assets/loop.svg";
function Search() {
  const [search, setSearch] = useState([]);

  return (
    <>
      {[1, 3, 3, 4, 5].map((item, i) => {
        return (
          <div className="menu-item" key={i}>
            <div className="menu-option" id="opt-201876539">
              <div
                className="option-left-icon option-icon-data"
                id="opt-lt-201876539"
              >
                <img src={serachImg} width="14px" height="14px" alt="Profile" />
              </div>
              <div className="option-text" id="opt-txt-201876539">
                <label>hellodelu974</label>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Search;
