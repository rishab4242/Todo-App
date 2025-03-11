import axios from "axios";
import React, { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { baseURL } from "../utils/constant";
import "./Popup.css";

const Popup = ({ setShowpopup, popupData, setUpdateUI }) => {
  const [input, setInput] = useState(popupData?.todo || ""); // Ensure it's never undefined

  const updateTodo = () => {
    axios
      .put(`${baseURL}/update/${popupData.id}`, {
        todo: input,
        completed: popupData.completed || false,
      })
      .then((res) => {
        console.log(res.data.message);
        setUpdateUI((prevState) => !prevState);
        setShowpopup(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="backdrop">
      <div className="popup">
        <h2 className="popup-header">
          Update Todo
          <TiDeleteOutline
            className="close-icon"
            onClick={() => setShowpopup(false)}
          />
        </h2>

        <div className="popup-input-holder">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Update your task..."
            className="popup-input"
          />
          <button className="popup-btn" onClick={updateTodo}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
