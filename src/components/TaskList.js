import TaskItem from "./TaskItem";
import styles from "../styles/TaskList.module.css";

const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => {
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ul className={styles.taskList}>
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      ))}
    </ul>
  );
};

export default TaskList;
