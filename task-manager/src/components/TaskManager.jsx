import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Button from "./Button";

export default function TaskManager() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState("");

  const filtered = tasks.filter((t) =>
    filter === "All" ? true : filter === "Active" ? !t.completed : t.completed
  );

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggle = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const del = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          className="flex-grow p-2 border rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="New task"
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      <div className="flex space-x-2">
        {["All", "Active", "Completed"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "secondary" : "primary"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <ul className="space-y-2">
        {filtered.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <span
              onClick={() => toggle(t.id)}
              className={`cursor-pointer ${
                t.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {t.text}
            </span>
            <Button variant="danger" onClick={() => del(t.id)}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
