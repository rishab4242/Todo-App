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
    setIsCompleted(completed ?? false); // Ensures `false` if `completed` is `undefined`
  }, [completed]);

  // ✅ Toggle Task Completion
  const markAsDone = () => {
    axios
      .put(`${baseURL}/update/${id}`, { completed: !isCompleted }) // Ensure `completed` is sent
      .then(() => {
        console.log("Task updated:", !isCompleted);
        setIsCompleted(!isCompleted);
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => console.error("Error marking task as done:", err));
  };

  // ✅ Delete Task
  const deleteTodo = () => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then(() => {
        console.log("Task deleted!");
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
        border: "1px solid #ddd",
        padding: "12px",
        marginBottom: "12px",
        borderRadius: "6px",
        background: isCompleted ? "#d4edda" : "#fff",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        transition: "0.3s",
      }}
    >
      {/* ✅ Checkbox for Marking as Done */}
      <input
        type="checkbox"
        checked={isCompleted || false} // ✅ Ensure `false` if undefined
        onChange={markAsDone}
        style={{ cursor: "pointer", marginRight: "10px" }}
      />

      {/* Task Text */}
      <span
        style={{
          textDecoration: isCompleted ? "line-through" : "none",
          color: isCompleted ? "gray" : "black",
          fontSize: "16px",
          flex: 1,
        }}
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
            height: "22px",
            width: "22px",
            color: "#007bff",
          }}
        />

        {/* Delete Task */}
        <TiDeleteOutline
          className="icon"
          onClick={deleteTodo}
          style={{
            cursor: "pointer",
            height: "22px",
            width: "22px",
            color: "red",
          }}
        />
      </div>
    </div>
  );
};

export default ToDo;
