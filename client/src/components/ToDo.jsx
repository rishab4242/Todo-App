import axios from "axios";
import React, { useState, useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDone } from "react-icons/md";
import { baseURL } from "../utils/constant";

const ToDo = ({
  todo,
  id,
  completed = false,
  setUpdateUI,
  setShowpopup,
  setPopupData,
}) => {
  const [isCompleted, setIsCompleted] = useState(completed); // ✅ Ensure it's never undefined

  // ✅ Sync state when `completed` prop changes
  useEffect(() => {
    setIsCompleted(completed ?? false);
  }, [completed]);

  // ✅ Toggle Task Completion
  const markAsDone = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `${baseURL}/update/${id}`,
        { completed: !isCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsCompleted(!isCompleted);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.error("Error marking task as done:", err));
  };

  // ✅ Delete Task
  const deleteTodo = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`${baseURL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  // ✅ Open Update Popup
  const updateTodo = () => {
    setPopupData({ todo, id });
    setShowpopup(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "3px solid #ddd",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "6px",
        background: isCompleted ? "#d4edda" : "transparent",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      {/* ✅ Checkbox for Marking as Done */}
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={isCompleted || false}
          onChange={markAsDone}
          className="appearance-none w-[15px] h-[15px] cursor-pointer mr-4 border border-white rounded-sm checked:bg-blue-500 checked:border-transparent focus:outline-none transition"
        />
      </label>

      {/* Task Text */}
      <span
        className={`mb-[2px] text-[20px] flex-1  ${
          isCompleted ? "line-through text-gray-400" : "text-white"
        }`}
      >
        {todo}
      </span>

      <div style={{ display: "flex", gap: "10px" }}>
        {/* Edit Task */}
        <CiEdit
          className="icon"
          onClick={updateTodo}
          style={{
            cursor: "pointer",
            height: "25px",
            width: "25px",
            color: "#007bff",
          }}
        />

        {/* Delete Task */}
        <TiDeleteOutline
          className="icon"
          onClick={deleteTodo}
          style={{
            cursor: "pointer",
            height: "25px",
            width: "25px",
            color: "red",
          }}
        />
      </div>
    </div>
  );
};

export default ToDo;
