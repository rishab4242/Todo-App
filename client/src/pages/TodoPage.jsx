import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../utils/constant";
import ToDo from "../components/ToDo";
import Popup from "../components/Popup";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [showpopup, setShowpopup] = useState(false);
  const [popupData, setPopupData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${baseURL}/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Error fetching todos:", err));
  }, [updateUI]);

  const formik = useFormik({
    initialValues: {
      todo: "",
    },
    validationSchema: Yup.object({
      todo: Yup.string()
        .trim()
        .required("Todo is required")
        .min(2, "Must be at least 2 characters"),
    }),
    onSubmit: (values, { resetForm }) => {
      const token = localStorage.getItem("token");
      axios
        .post(
          `${baseURL}/save`,
          { todo: values.todo },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setUpdateUI((prev) => !prev);
          resetForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <main className="min-h-screen flex items-start justify-center md:p-4 bg-[url('https://img.freepik.com/premium-photo/futuristic-digital-clipboards-dark-blue-background-with-neon-accents_996059-703.jpg')] bg-no-repeat bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black bg-opacity-85"></div>

      <div className="w-full max-w-2xl mx-auto md:mt-28 mt-32 relative z-10">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-row items-center justify-center gap-4 mb-6 flex-wrap"
        >
          <input
            name="todo"
            type="text"
            placeholder="Add a Todo..."
            className="w-[40%] max-sm:w-[200px] px-4 py-2 border text-white rounded-md text-lg outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 bg-transparent bg-opacity-95 placeholder-gray-100"
            style={{ border: "3px solid #ddd" }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.todo}
          />
          <button
            type="submit"
            className="w-[120px] bg-transparent hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm transition duration-300 shadow-lg"
            style={{ border: "3px solid #ddd" }}
          >
            Add Todo
          </button>
          {formik.touched.todo && formik.errors.todo && (
            <div className="text-red-400 w-full text-center text-sm mt-2">
              {formik.errors.todo}
            </div>
          )}
        </form>

        <div className="space-y-4 max-w-md max-sm:max-w-[90%] m-auto">
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

export default TodoPage;
