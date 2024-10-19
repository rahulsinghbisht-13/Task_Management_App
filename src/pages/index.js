import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/Searchbar";

// Server-side rendering (SSR) for initial tasks
export const getServerSideProps = async () => {
  const initialTasks = [
    {
      id: 1,
      title: "Sample Task 1",
      description: "Do the laundry",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Sample Task 2",
      description: "Buy groceries",
      priority: "medium",
      completed: false,
    },
  ];
  return { props: { initialTasks } };
};

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to track the search input

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks)); // Load from localStorage if available
    } else {
      setTasks(initialTasks); // Otherwise use SSR-provided initial tasks
    }
  }, [initialTasks]);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    priority: "low",
    id: null,
  });

  // Separate incomplete and completed tasks
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  // Filter tasks based on search query (case-insensitive)
  const filteredIncompleteTasks = incompleteTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompletedTasks = completedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle add/edit task
  const handleTaskSubmit = (newTask) => {
    if (newTask.id) {
      // Edit existing task
      setTasks((prev) =>
        prev.map((task) => (task.id === newTask.id ? newTask : task))
      );
    } else {
      // Add new task
      setTasks((prev) => [
        { ...newTask, id: Date.now(), completed: false },
        ...prev,
      ]);
    }
  };

  // Handle delete
  const handleDelete = (id) =>
    setTasks((prev) => prev.filter((task) => task.id !== id));

  // Handle complete or undo completion
  const handleComplete = (id) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  // Set task form for editing
  const handleEdit = (task) => setTaskForm(task);

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Task Form */}
      <TaskForm
        taskForm={taskForm}
        setTaskForm={setTaskForm}
        onSubmit={handleTaskSubmit}
      />

      {/* Search Bar Component */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Show fallback message when no tasks are present */}

      {incompleteTasks.length === 0 && completedTasks.length === 0 && (
        <p style={{ textAlign: "center" }}>
          No tasks available. Add a task to get started!
        </p>
      )}

      {/* Conditionally render the headings and task lists based on task presence */}
      {filteredIncompleteTasks.length > 0 && (
        <>
          <h2>Incomplete Tasks</h2>
          <TaskList
            tasks={filteredIncompleteTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        </>
      )}

      {filteredCompletedTasks.length > 0 && (
        <>
          <h2>Completed Tasks</h2>
          <TaskList
            tasks={filteredCompletedTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onComplete={handleComplete}
          />
        </>
      )}

      {/* Message when no tasks are found */}
      {tasks.length > 0 &&
        filteredIncompleteTasks.length === 0 &&
        filteredCompletedTasks.length === 0 && (
          <p style={{ textAlign: "center" }}>
            No tasks match your search query.
          </p>
        )}
    </div>
  );
}
