import React, { useEffect, useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/popup";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const [popupData, setPopupData] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`) // Get all todos
      .then((res) => {
        console.log("Fetched Todos:", res.data); // Debugging
        setTodos(res.data);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, [updateUI]); // Depend on updateUI to refetch data

  const saveTodo = () => {
    axios
      .post(`${baseURL}/save`, { todo: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setInput("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 style={{ fontSize: "45px", color: "#fff", fontWeight: "bold" }}>
            Todo App
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a Todo..."
            style={{
              width: "250px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "16px",
              outline: "none",
              transition: "0.3s",
            }}
          />
          <button
            onClick={saveTodo}
            style={{
              background: "#007bff",
              color: "white",
              padding: "10px 15px",
              fontSize: "16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Add Todo
          </button>
        </div>

        <div className="list">
          {todos.map((el) => (
            <ToDo
              {...el}
              key={el._id}
              todo={el.todo}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowpopup={setShowpopup}
              setPopupData={setPopupData}
            />
          ))}
        </div>
      </div>
      {showpopup && (
        <Popup
          setShowpopup={setShowpopup}
          popupData={popupData}
          setUpdateUI={setUpdateUI}
        />
      )}
    </main>
  );
};

export default App;
