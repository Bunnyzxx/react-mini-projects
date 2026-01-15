import { useState } from "react";
import "./App.css";

function App() {
  const [filterType , setFilterType] = useState("all");
  const [todos, setTodos] = useState([]);
  const handleAddTodos = function (newTask) {
    setTodos((prev) => [...prev, newTask]);
  };
  const handleNextBtnClick = function (todo) {
    console.log("works");
    console.log(`Todo: `, todo);
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id && t.category === "todo"
          ? { ...t, category: "in-progress" }
          : t.id === todo.id && t.category === "in-progress"
          ? { ...t, category: "done" }
          : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <Header />
        <AddTask
          todos={todos}
          handleAddTodos={handleAddTodos}
          handleNextBtnClick={handleNextBtnClick}
        />
        <Filters filterType={filterType} setFilterType={setFilterType} todos={todos} />
        <Todos todos={todos}  filterType={filterType} handleNextBtnClick={handleNextBtnClick} />
      </div>
    </div>
  );
}

const Header = function () {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm py-6 flex justify-center items-center">
      <h1 className="text-3xl font-semibold tracking-tight">Task Manager</h1>
    </div>
  );
};

const AddTask = function ({ todos, handleAddTodos }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("todo");
  const [priority, setPriority] = useState("high");
  const addTask = function () {
    const newTask = {
      id: crypto.randomUUID(),
      title: title,
      category: category,
      priority: priority,
    };
    handleAddTodos(newTask);
    console.log("Settodos:", todos);
    console.log(newTask);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-4">
      <h2 className="text-2xl font-semibold mb-2">Add Task</h2>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Priority</label>
          <select
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value={"high"}> High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <button
        onClick={addTask}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-lg font-medium shadow-sm transition"
      >
        Add Task
      </button>
    </div>
  );
};

const Filters = function ({filterType, setFilterType}) {
  
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center gap-4">
      <h3 className="text-lg font-medium">Filters</h3>
      <select value={filterType} onChange={(e)=>setFilterType(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition">
        <option value="all"> All</option>
        <option value="high">High</option>
        <option value="medium" >Moderate</option>
        <option value ="low">Low</option>
      </select>
    </div>
  );
};

const Todos = function ({ todos, handleNextBtnClick , filterType}) {

  const priortyMap = {
    high: <High />,
    low: <Low />,
    medium: <Moderate />,
  };
  let visibleTodos = todos;
  if(filterType !== "all"){
    visibleTodos=  visibleTodos.filter(todo=> todo.priority === filterType)
  }
  const todoList = visibleTodos.filter((todo) => todo.category === "todo");
  const inProgList = visibleTodos.filter((todo) => todo.category === "in-progress");
  const doneList = visibleTodos.filter((todo) => todo.category === "done");
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h3 className="text-lg font-medium mb-2">To Do</h3>
        <ul className="space-y-2">
          {todoList.map((todo) => (
            <li
              className="bg-gray-100 border border-gray-200 rounded-md py-2 px-3 shadow-sm"
              key={todo.id}
            >
              {todo.title}
              {priortyMap[todo.priority]}
              <NextButton handleNextBtnClick={() => handleNextBtnClick(todo)} />
            </li>
          ))}

          {/* <li className="bg-gray-100 border border-gray-200 rounded-md py-2 px-3 shadow-sm">
            Study React {<High />}
          </li> */}
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h3 className="text-lg font-medium mb-2">In Progress</h3>
        <ul className="space-y-2">
          {inProgList.map((todo) => (
            <li
              className="bg-blue-300 border border-gray-200 rounded-md py-2 px-3 shadow-sm"
              key={todo.id}
            >
              {todo.title} {priortyMap[todo.priority]}{" "}
              <NextButton handleNextBtnClick={() => handleNextBtnClick(todo)} />
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h3 className="text-lg font-medium mb-2">Done</h3>
        <ul className="space-y-2">
          {doneList.map((todo) => (
            <li
              className="bg-green-400 border border-gray-200 rounded-md py-2 px-3 shadow-sm"
              key={todo.id}
            >
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const High = function () {
  return (
    <span className="inline-flex items-center ml-3 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-300">
      High
    </span>
  );
};
const Moderate = function () {
  return (
    <span className="inline-flex items-center ml-3 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-300">
      Medium
    </span>
  );
};
const Low = function () {
  return (
    <span className="inline-flex items-center ml-3 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-300">
      Low
    </span>
  );
};
const NextButton = function ({ handleNextBtnClick }) {
  return (
    <button
      onClick={handleNextBtnClick}
      className="inline-flex items-center justify-center ml-3 w-8 h-8 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 shadow"
    >
      →
    </button>
  );
};
export default App;
