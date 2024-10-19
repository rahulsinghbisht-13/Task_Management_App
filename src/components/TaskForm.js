import styles from "../styles/TaskForm.module.css";

const TaskForm = ({ taskForm, setTaskForm, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(taskForm);
    setTaskForm({ title: "", description: "", priority: "low", id: null });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Task Title"
        value={taskForm.title}
        onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={taskForm.description}
        onChange={(e) =>
          setTaskForm({ ...taskForm, description: e.target.value })
        }
        required
      />
      <select
        value={taskForm.priority}
        onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">{taskForm.id ? "Edit Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;
