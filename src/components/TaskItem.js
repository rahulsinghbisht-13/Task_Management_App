import styles from "../styles/TaskItem.module.css";

const TaskItem = ({ task, onEdit, onDelete, onComplete }) => {
  const priorityClass =
    task.priority === "high"
      ? styles.highPriority
      : task.priority === "medium"
      ? styles.mediumPriority
      : styles.lowPriority;

  return (
    <li className={`${styles.taskItem} ${priorityClass}`}>
      <div className={styles.taskDetails}>
        <h3 className={styles.taskTitle}>
          {task.title} {task.completed && "(Completed)"}
        </h3>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
      </div>
      <div>
        <button
          className={`${styles.button} ${styles.complete}`}
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? "Undo" : "Completed"}
        </button>
        <button className={`${styles.button}`} onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          className={`${styles.button} ${styles.delete}`}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
