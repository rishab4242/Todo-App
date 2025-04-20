import React, { useEffect, useState } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [updateUI, setUpdateUI] = useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const user = "user1"
  const [popupData, setPopupData] = useState({});

  useEffect(() => {
    axios
      .get(`${baseURL}/get`, {
        params: { user }
      }) // Get all todos
      .then((res) => {
        // console.log("Fetched Todos:", res.data); // Debugging
        setTodos(res.data);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, [updateUI]); // Depend on updateUI to refetch data

  const saveTodo = () => {
    axios
      .post(`${baseURL}/save`, { todo: input, user })
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
    <main className="min-h-screen  flex items-start  justify-center md:p-4">
      <div className="w-full max-w-2xl mx-auto mt-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl text-white font-bold">
            Todo App
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 ">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a Todo..."
            className="w-full sm:w-[250px] max-sm:w-[320px] px-4 py-2 border border-gray-300 rounded-md text-base outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          />
          <button
            onClick={saveTodo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-base transition duration-300 w-full sm:w-auto"
          >
            Add Todo
          </button>
        </div>

        <div className="space-y-4 max-w-sm m-auto">
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
